/*
  # Create surface types table

  1. New Tables
    - `surface_types`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on surface_types table
    - Add policies for authenticated users
*/

-- Create surface_types table if it doesn't exist
CREATE TABLE IF NOT EXISTS surface_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE surface_types ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated read surface_types"
    ON surface_types FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated manage surface_types"
    ON surface_types FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert initial data
INSERT INTO surface_types (name, description) VALUES
    ('Drywall', 'Standard interior wall surface'),
    ('Plaster', 'Traditional wall finishing material'),
    ('Wood', 'Natural wood surfaces'),
    ('Concrete', 'Cement-based surfaces'),
    ('Brick', 'Clay-based building material'),
    ('Stucco', 'Exterior wall coating'),
    ('Metal', 'Various metal surfaces')
ON CONFLICT (name) DO NOTHING;