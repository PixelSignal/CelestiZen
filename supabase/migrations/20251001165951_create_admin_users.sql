/*
  # Create admin users table for authentication

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated admins to read their own data
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Insert a default admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@cosmichart.com', '$2a$10$rXQVEZQZQZQZQZQZQZQZQuZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZ')
ON CONFLICT (email) DO NOTHING;