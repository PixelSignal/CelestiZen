import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

interface ChartData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: Array<{
    planet: string;
    sign: string;
    degree: number;
    house: number;
  }>;
  houses: Array<{
    number: number;
    sign: string;
    degree: number;
  }>;
  aspects: Array<{
    planet1: string;
    planet2: string;
    type: string;
    angle: number;
    orb: number;
  }>;
  elementalBalance: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  modalityDistribution: {
    cardinal: number;
    fixed: number;
    mutable: number;
  };
}

interface RequestBody {
  chartData: ChartData;
  name: string;
  birthDate: string;
  birthTime?: string;
  birthPlace: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const { chartData, name, birthDate, birthTime, birthPlace }: RequestBody = await req.json();

    const prompt = `You are an expert astrologer. Create a detailed, personalized birth chart interpretation.

Birth Information:
- Name: ${name}
- Birth Date: ${birthDate}
- Birth Time: ${birthTime || 'Unknown'}
- Birth Place: ${birthPlace}

Chart Data:
- Sun Sign: ${chartData.sunSign}
- Moon Sign: ${chartData.moonSign}
- Rising Sign: ${chartData.risingSign}

Planetary Positions:
${chartData.planets.map(p => `- ${p.planet} in ${p.sign} at ${p.degree.toFixed(2)}° (House ${p.house})`).join('\n')}

Aspects:
${chartData.aspects.map(a => `- ${a.planet1} ${a.type} ${a.planet2} (${a.orb.toFixed(2)}° orb)`).join('\n')}

Elemental Balance:
- Fire: ${chartData.elementalBalance.fire.toFixed(1)}%
- Earth: ${chartData.elementalBalance.earth.toFixed(1)}%
- Air: ${chartData.elementalBalance.air.toFixed(1)}%
- Water: ${chartData.elementalBalance.water.toFixed(1)}%

Modality Distribution:
- Cardinal: ${chartData.modalityDistribution.cardinal.toFixed(1)}%
- Fixed: ${chartData.modalityDistribution.fixed.toFixed(1)}%
- Mutable: ${chartData.modalityDistribution.mutable.toFixed(1)}%

Please provide a comprehensive interpretation with the following sections:

1. CORE PERSONALITY (Sun Sign Analysis) - 150-200 words
2. EMOTIONAL NATURE (Moon Sign Analysis) - 150-200 words
3. OUTER PERSONA (Rising Sign Analysis) - 150-200 words
4. PLANETARY INFLUENCES - Analyze each planet's placement in signs and houses - 200-250 words
5. MAJOR ASPECTS - Interpret the significant aspects between planets - 150-200 words
6. ELEMENTAL & MODAL BALANCE - Analysis of strengths and challenges - 150-200 words
7. LIFE PATH & PURPOSE - Overall synthesis and guidance - 200-250 words

Write in a warm, insightful, and professional tone. Be specific and personal. Avoid generic statements.`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert astrologer who provides detailed, personalized birth chart interpretations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 3000,
      })
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const interpretation = openaiData.choices[0].message.content;

    return new Response(
      JSON.stringify({ interpretation }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
