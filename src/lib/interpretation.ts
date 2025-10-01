import { supabase } from './supabase';

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

interface InterpretationRequest {
  chartData: ChartData;
  name: string;
  birthDate: string;
  birthTime?: string;
  birthPlace: string;
}

export async function generateInterpretation(
  request: InterpretationRequest
): Promise<string> {
  try {
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-interpretation`;

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Interpretation error:', errorData);
      throw new Error(errorData.error || 'Failed to generate interpretation');
    }

    const data = await response.json();
    return data.interpretation;
  } catch (error) {
    console.error('Error generating interpretation:', error);
    throw error;
  }
}

export function parseInterpretation(text: string): {
  sections: Array<{ title: string; content: string }>;
} {
  const sections: Array<{ title: string; content: string }> = [];

  const lines = text.split('\n');
  let currentSection: { title: string; content: string } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.match(/^\d+\.\s+[A-Z\s&]+/)) {
      if (currentSection) {
        sections.push(currentSection);
      }

      const title = trimmed.replace(/^\d+\.\s+/, '');
      currentSection = { title, content: '' };
    } else if (currentSection && trimmed) {
      currentSection.content += (currentSection.content ? '\n\n' : '') + trimmed;
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  if (sections.length === 0) {
    sections.push({
      title: 'Your Birth Chart Interpretation',
      content: text
    });
  }

  return { sections };
}
