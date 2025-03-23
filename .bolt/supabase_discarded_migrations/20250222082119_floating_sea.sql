/*
  # Create reference data tables

  1. New Tables
    - `surface_types`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `application_fields`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `parent_id` (uuid, self-referential foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create surface_types table
CREATE TABLE IF NOT EXISTS surface_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz DEFAULT now()
);

-- Create application_fields table with hierarchical structure
CREATE TABLE IF NOT EXISTS application_fields (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    parent_id uuid REFERENCES application_fields(id),
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE surface_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated read surface_types"
    ON surface_types FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated manage surface_types"
    ON surface_types FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read application_fields"
    ON application_fields FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated manage application_fields"
    ON application_fields FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert initial data
INSERT INTO surface_types (name, description) VALUES
    ('Concrete', 'Cement-based surfaces including floors, walls, and structural elements'),
    ('Wood', 'Natural and engineered wood surfaces'),
    ('Metal', 'Various metal surfaces including steel, aluminum, and galvanized surfaces'),
    ('Plastic', 'Various plastic and synthetic surfaces'),
    ('Drywall', 'Interior wall and ceiling surfaces'),
    ('Masonry', 'Brick, block, and stone surfaces')
ON CONFLICT (name) DO NOTHING;

INSERT INTO application_fields (name, description) VALUES
    ('Interior', 'Applications for indoor use'),
    ('Exterior', 'Applications for outdoor use'),
    ('Industrial', 'Applications for industrial settings'),
    ('Marine', 'Applications for marine environments'),
    ('Automotive', 'Applications for vehicles and automotive use'),
    ('Architectural', 'Applications for architectural features')
ON CONFLICT (name) DO NOTHING;