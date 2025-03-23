/*
  # Add application fields and surface types tables

  1. New Tables
    - `application_fields`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create application_fields table if it doesn't exist
CREATE TABLE IF NOT EXISTS application_fields (
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
    ('Interior', 'For indoor applications'),
    ('Exterior', 'For outdoor applications'),
    ('Industrial', 'For industrial use'),
    ('Marine', 'For marine environments'),
    ('Automotive', 'For vehicles'),
    ('Wood', 'For wooden surfaces'),
    ('Metal', 'For metal surfaces'),
    ('Concrete', 'For concrete surfaces')
ON CONFLICT (name) DO NOTHING;