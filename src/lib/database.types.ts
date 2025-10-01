export interface Database {
  public: {
    Tables: {
      birth_charts: {
        Row: {
          id: string;
          user_email: string;
          first_name: string;
          last_name: string;
          birth_date: string;
          birth_time: string | null;
          birth_place: string;
          latitude: number | null;
          longitude: number | null;
          timezone: string | null;
          chart_data: ChartData | null;
          payment_status: string;
          stripe_payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_email: string;
          first_name: string;
          last_name: string;
          birth_date: string;
          birth_time?: string | null;
          birth_place: string;
          latitude?: number | null;
          longitude?: number | null;
          timezone?: string | null;
          chart_data?: ChartData | null;
          payment_status?: string;
          stripe_payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_email?: string;
          first_name?: string;
          last_name?: string;
          birth_date?: string;
          birth_time?: string | null;
          birth_place?: string;
          latitude?: number | null;
          longitude?: number | null;
          timezone?: string | null;
          chart_data?: ChartData | null;
          payment_status?: string;
          stripe_payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_sessions: {
        Row: {
          id: string;
          session_id: string;
          device_type: string | null;
          browser: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          converted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          device_type?: string | null;
          browser?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          converted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          device_type?: string | null;
          browser?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          converted?: boolean;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          is_active?: boolean;
        };
      };
    };
  };
}

export interface ChartData {
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  planets?: PlanetPosition[];
  houses?: House[];
  aspects?: Aspect[];
  elementalBalance?: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  modalityDistribution?: {
    cardinal: number;
    fixed: number;
    mutable: number;
  };
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
}

export interface House {
  number: number;
  sign: string;
  degree: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
}
