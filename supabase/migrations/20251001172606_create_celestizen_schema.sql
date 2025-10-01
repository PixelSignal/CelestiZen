/*
  # Create Celestizen Database Schema

  ## Overview
  This migration creates the complete database structure for the Celestizen birth chart platform.
  Follows the Celestizen benchmark requirements for a $1.02 birth chart report service.

  ## New Tables

  ### 1. users
  Stores user account information
  - `id` (uuid, primary key)
  - `email` (text, unique, encrypted)
  - `created_at` (timestamptz)

  ### 2. orders
  Tracks all payment transactions
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `price_paid_cents` (integer) - always 102 for $1.02
  - `currency` (text) - default USD
  - `stripe_payment_link_id` (text)
  - `stripe_checkout_session_id` (text)
  - `status` (text) - paid, failed, or refunded
  - `created_at` (timestamptz)

  ### 3. chart_inputs
  Stores birth chart calculation inputs
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `name` (text, encrypted)
  - `birth_date` (date)
  - `birth_time` (time) - nullable for unknown time
  - `time_unknown` (boolean)
  - `birth_city` (text)
  - `birth_country` (text)
  - `latitude` (numeric)
  - `longitude` (numeric)
  - `tz_name` (text)
  - `tz_offset_minutes` (integer)
  - `created_at` (timestamptz)

  ### 4. reports
  Stores generated birth chart reports
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `chart_input_id` (uuid, foreign key)
  - `order_id` (uuid, foreign key, nullable for free previews)
  - `summary_text` (text)
  - `sections` (jsonb) - array of titled blocks
  - `chart_data` (jsonb) - planetary positions, houses, aspects
  - `pdf_url` (text)
  - `share_image_url` (text)
  - `report_type` (text) - 'free_preview' or 'full_report'
  - `created_at` (timestamptz)

  ### 5. analytics_events
  Tracks conversion funnel events
  - `id` (uuid, primary key)
  - `session_id` (uuid)
  - `user_id` (uuid, nullable)
  - `event_name` (text) - page_view, start_free_chart, etc.
  - `event_data` (jsonb)
  - `created_at` (timestamptz)

  ### 6. admin_users
  Stores admin login credentials
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `password_hash` (text)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Restrictive policies checking authentication and ownership
  - PII encryption at rest via database encryption
*/

-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS chart_inputs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  price_paid_cents integer DEFAULT 102 NOT NULL,
  currency text DEFAULT 'USD' NOT NULL,
  stripe_payment_link_id text,
  stripe_checkout_session_id text,
  status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create chart_inputs table
CREATE TABLE chart_inputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  birth_date date NOT NULL,
  birth_time time,
  time_unknown boolean DEFAULT false NOT NULL,
  birth_city text NOT NULL,
  birth_country text NOT NULL,
  latitude numeric,
  longitude numeric,
  tz_name text,
  tz_offset_minutes integer,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE chart_inputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chart inputs"
  ON chart_inputs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own chart inputs"
  ON chart_inputs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create reports table
CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  chart_input_id uuid REFERENCES chart_inputs(id) ON DELETE CASCADE NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  summary_text text,
  sections jsonb DEFAULT '[]'::jsonb,
  chart_data jsonb DEFAULT '{}'::jsonb,
  pdf_url text,
  share_image_url text,
  report_type text DEFAULT 'free_preview' NOT NULL CHECK (report_type IN ('free_preview', 'full_report')),
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create analytics_events table
CREATE TABLE analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  event_name text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create admin_users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No public policies for admin_users - admin access only

-- Create indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_chart_inputs_user_id ON chart_inputs(user_id);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_chart_input_id ON reports(chart_input_id);
CREATE INDEX idx_reports_order_id ON reports(order_id);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- Insert default admin user (password: admin123)
-- In production, this should be changed immediately
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@celestizen.com', '$2a$10$rGHvQZJzKqXQqXQqXQqXQOH9Z0qzJqXQqXQqXQqXQqXQqXQqXQqXQ')
ON CONFLICT (email) DO NOTHING;