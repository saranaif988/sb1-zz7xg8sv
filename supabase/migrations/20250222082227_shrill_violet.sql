/*
  # Add application fields and update relationships

  1. New Tables
    - `application_fields`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `parent_id` (uuid, self-referential foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on application_fields table
    - Add policies for authenticated users
*/

-- Create application_fields table
CREATE TABLE IF NOT EXISTS application_fields (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    parent_id uuid REFERENCES application_fields(id),
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