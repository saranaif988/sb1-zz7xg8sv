/*
  # Fix application fields table

  1. Changes
    - Drop and recreate application_fields table with correct structure
    - Add proper RLS policies
    - Insert initial data

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS application_fields CASCADE;

-- Create application_fields table
CREATE TABLE application_fields (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE application_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated read application_fields"
    ON application_fields FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated manage application_fields"
    ON application_fields FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert initial data
INSERT INTO application_fields (name, description) VALUES
    ('Interior', 'Applications for indoor use'),
    ('Exterior', 'Applications for outdoor use'),
    ('Industrial', 'Applications for industrial settings'),
    ('Marine', 'Applications for marine environments'),
    ('Automotive', 'Applications for vehicles and automotive use'),
    ('Architectural', 'Applications for architectural features')
ON CONFLICT (name) DO NOTHING;