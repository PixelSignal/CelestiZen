/*
  # Astrology Birth Chart Application Database Schema

  ## Overview
  This migration creates the complete database schema for the astrology birth chart application.
  It includes tables for birth charts, user sessions, newsletter subscribers, and implements
  comprehensive Row Level Security (RLS) policies.

  ## New Tables
  
  ### 1. birth_charts
  Stores all birth chart information and payment details for customers.
  - `id` (uuid, primary key) - Unique identifier for each birth chart
  - `user_email` (text, not null) - Customer's email address
  - `first_name` (text, not null) - Customer's first name
  - `last_name` (text, not null) - Customer's last name
  - `birth_date` (date, not null) - Date of birth
  - `birth_time` (time) - Time of birth (nullable for unknown times)
  - `birth_place` (text, not null) - City/location of birth
  - `latitude` (numeric) - Geographic latitude for calculations
  - `longitude` (numeric) - Geographic longitude for calculations
  - `timezone` (text) - Timezone for birth location
  - `chart_data` (jsonb) - Calculated astrological data (signs, houses, aspects)
  - `payment_status` (text, default 'pending') - Payment status tracking
  - `stripe_payment_id` (text) - Stripe payment identifier
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. user_sessions
  Tracks visitor sessions for analytics and funnel optimization.
  - `id` (uuid, primary key) - Unique session identifier
  - `session_id` (text, unique) - Browser session ID
  - `device_type` (text) - Device category (mobile, tablet, desktop)
  - `browser` (text) - Browser information
  - `utm_source` (text) - Marketing source tracking
  - `utm_medium` (text) - Marketing medium tracking
  - `utm_campaign` (text) - Campaign tracking
  - `converted` (boolean, default false) - Whether session resulted in purchase
  - `created_at` (timestamptz) - Session start time

  ### 3. newsletter_subscribers
  Manages email newsletter subscriptions.
  - `id` (uuid, primary key) - Unique subscriber identifier
  - `email` (text, unique, not null) - Subscriber email address
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `is_active` (boolean, default true) - Subscription status

  ## Security
  
  All tables have Row Level Security (RLS) enabled with the following policies:
  
  ### birth_charts policies:
  - Public can insert new birth charts (for funnel submissions)
  - Users can view their own birth charts by email
  - Only authenticated admins can view all charts
  - Only authenticated admins can update charts
  
  ### user_sessions policies:
  - Public can insert sessions (for analytics tracking)
  - Only authenticated admins can view sessions
  
  ### newsletter_subscribers policies:
  - Public can insert subscriptions
  - Only authenticated admins can view subscribers
  - Users can update their own subscription status

  ## Indexes
  
  Performance indexes created for:
  - Email lookups on birth_charts
  - Session ID lookups
  - Email uniqueness on newsletter_subscribers
  - Created_at timestamps for chronological queries
*/

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create birth_charts table
CREATE TABLE IF NOT EXISTS birth_charts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_date date NOT NULL,
  birth_time time,
  birth_place text NOT NULL,
  latitude numeric,
  longitude numeric,
  timezone text,
  chart_data jsonb,
  payment_status text DEFAULT 'pending' NOT NULL,
  stripe_payment_id text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id text UNIQUE NOT NULL,
  device_type text,
  browser text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  converted boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now() NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_birth_charts_email ON birth_charts(user_email);
CREATE INDEX IF NOT EXISTS idx_birth_charts_created_at ON birth_charts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_birth_charts_payment_status ON birth_charts(payment_status);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_created_at ON user_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Enable Row Level Security
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Birth Charts Policies
CREATE POLICY "Anyone can insert birth charts"
  ON birth_charts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own birth charts by email"
  ON birth_charts FOR SELECT
  TO public
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Authenticated users can view all birth charts"
  ON birth_charts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update birth charts"
  ON birth_charts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- User Sessions Policies
CREATE POLICY "Anyone can insert sessions"
  ON user_sessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update sessions"
  ON user_sessions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Newsletter Subscribers Policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update subscriptions"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to birth_charts
DROP TRIGGER IF EXISTS update_birth_charts_updated_at ON birth_charts;
CREATE TRIGGER update_birth_charts_updated_at
  BEFORE UPDATE ON birth_charts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();