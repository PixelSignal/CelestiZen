export interface ApiStatus {
  name: string;
  description: string;
  status: 'operational' | 'degraded' | 'down';
  health: number;
  lastCheck: Date;
  responseTime?: number;
  endpoint?: string;
}

export interface ApiIntegration {
  name: string;
  provider: string;
  description: string;
  tier: string;
  usage: {
    current: number;
    limit: number;
    resetDate?: string;
  };
  cost: string;
  status: ApiStatus;
}

async function checkOpenAIHealth(): Promise<ApiStatus> {
  const startTime = Date.now();

  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-interpretation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chartData: {
          sunSign: 'Aries',
          moonSign: 'Taurus',
          risingSign: 'Gemini',
          planets: [],
          houses: [],
          aspects: [],
          elementalBalance: { fire: 0, earth: 0, air: 0, water: 0 },
          modalityDistribution: { cardinal: 0, fixed: 0, mutable: 0 }
        },
        name: 'Health Check',
        birthDate: '2000-01-01',
        birthPlace: 'Test'
      }),
    });

    const responseTime = Date.now() - startTime;
    const isHealthy = response.ok || response.status === 401;

    return {
      name: 'OpenAI API',
      description: 'AI-powered chart interpretations',
      status: isHealthy ? 'operational' : 'degraded',
      health: isHealthy ? 100 : 60,
      lastCheck: new Date(),
      responseTime,
      endpoint: 'generate-interpretation'
    };
  } catch (error) {
    return {
      name: 'OpenAI API',
      description: 'AI-powered chart interpretations',
      status: 'down',
      health: 0,
      lastCheck: new Date(),
      endpoint: 'generate-interpretation'
    };
  }
}

async function checkNominatimHealth(): Promise<ApiStatus> {
  const startTime = Date.now();

  try {
    const response = await fetch('https://nominatim.openstreetmap.org/search?q=London&format=json&limit=1', {
      headers: {
        'User-Agent': 'CelestiZen/1.0'
      }
    });

    const responseTime = Date.now() - startTime;
    const isHealthy = response.ok;

    return {
      name: 'Nominatim API',
      description: 'Geocoding & location services',
      status: isHealthy ? 'operational' : 'degraded',
      health: isHealthy ? 100 : 50,
      lastCheck: new Date(),
      responseTime,
      endpoint: 'nominatim.openstreetmap.org'
    };
  } catch (error) {
    return {
      name: 'Nominatim API',
      description: 'Geocoding & location services',
      status: 'down',
      health: 0,
      lastCheck: new Date(),
      endpoint: 'nominatim.openstreetmap.org'
    };
  }
}

async function checkSupabaseHealth(): Promise<ApiStatus> {
  const startTime = Date.now();

  try {
    const { error } = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      }
    });

    const responseTime = Date.now() - startTime;
    const isHealthy = !error;

    return {
      name: 'Supabase',
      description: 'Database & backend services',
      status: isHealthy ? 'operational' : 'degraded',
      health: isHealthy ? 100 : 40,
      lastCheck: new Date(),
      responseTime,
      endpoint: 'Database & Auth'
    };
  } catch (error) {
    return {
      name: 'Supabase',
      description: 'Database & backend services',
      status: 'down',
      health: 0,
      lastCheck: new Date(),
      endpoint: 'Database & Auth'
    };
  }
}

function getAstronomiaHealth(): ApiStatus {
  try {
    return {
      name: 'Astronomia Library',
      description: 'Astronomical calculations',
      status: 'operational',
      health: 100,
      lastCheck: new Date(),
      responseTime: 0,
      endpoint: 'Local computation'
    };
  } catch (error) {
    return {
      name: 'Astronomia Library',
      description: 'Astronomical calculations',
      status: 'down',
      health: 0,
      lastCheck: new Date(),
      endpoint: 'Local computation'
    };
  }
}

export async function checkAllApiHealth(): Promise<ApiStatus[]> {
  const [openai, nominatim, supabase, astronomia] = await Promise.all([
    checkOpenAIHealth(),
    checkNominatimHealth(),
    checkSupabaseHealth(),
    Promise.resolve(getAstronomiaHealth())
  ]);

  return [openai, nominatim, supabase, astronomia];
}

export function getApiIntegrations(healthStatuses: ApiStatus[]): ApiIntegration[] {
  const openaiStatus = healthStatuses.find(s => s.name === 'OpenAI API');
  const nominatimStatus = healthStatuses.find(s => s.name === 'Nominatim API');
  const supabaseStatus = healthStatuses.find(s => s.name === 'Supabase');
  const astronomiaStatus = healthStatuses.find(s => s.name === 'Astronomia Library');

  return [
    {
      name: 'OpenAI GPT-4o-mini',
      provider: 'OpenAI',
      description: 'Powers AI-generated astrological interpretations with advanced language models',
      tier: 'Paid API',
      usage: {
        current: 0,
        limit: 1000000,
        resetDate: 'Monthly'
      },
      cost: '$0.15 per 1M tokens (input)',
      status: openaiStatus || {
        name: 'OpenAI API',
        description: 'AI-powered interpretations',
        status: 'down',
        health: 0,
        lastCheck: new Date()
      }
    },
    {
      name: 'Nominatim (OpenStreetMap)',
      provider: 'OpenStreetMap Foundation',
      description: 'Free geocoding service for converting location names to coordinates',
      tier: 'Free',
      usage: {
        current: 0,
        limit: 999999,
        resetDate: 'Unlimited (fair use)'
      },
      cost: 'Free',
      status: nominatimStatus || {
        name: 'Nominatim API',
        description: 'Geocoding services',
        status: 'down',
        health: 0,
        lastCheck: new Date()
      }
    },
    {
      name: 'Supabase',
      provider: 'Supabase',
      description: 'Database, authentication, and edge functions backend infrastructure',
      tier: 'Free Tier',
      usage: {
        current: 0,
        limit: 500,
        resetDate: 'Monthly (500MB)'
      },
      cost: 'Free up to 500MB',
      status: supabaseStatus || {
        name: 'Supabase',
        description: 'Backend services',
        status: 'down',
        health: 0,
        lastCheck: new Date()
      }
    },
    {
      name: 'Astronomia (NPM)',
      provider: 'Open Source',
      description: 'High-precision astronomical calculations library with NASA data',
      tier: 'Open Source',
      usage: {
        current: 0,
        limit: 999999,
        resetDate: 'Unlimited'
      },
      cost: 'Free',
      status: astronomiaStatus || {
        name: 'Astronomia Library',
        description: 'Astronomical calculations',
        status: 'operational',
        health: 100,
        lastCheck: new Date()
      }
    }
  ];
}

export function calculateOverallHealth(statuses: ApiStatus[]): number {
  if (statuses.length === 0) return 0;

  const weights = {
    'OpenAI API': 0.35,
    'Nominatim API': 0.15,
    'Supabase': 0.35,
    'Astronomia Library': 0.15
  };

  const weightedHealth = statuses.reduce((total, status) => {
    const weight = weights[status.name as keyof typeof weights] || 0.25;
    return total + (status.health * weight);
  }, 0);

  return Math.round(weightedHealth);
}
