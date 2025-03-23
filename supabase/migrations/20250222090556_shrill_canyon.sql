/*
  # Fix application fields and surface types tables

  1. Changes
    - Drop and recreate application_fields table with correct structure
    - Drop and recreate surface_types table with correct structure
    - Add proper RLS policies
    - Insert initial data

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS application_fields CASCADE;
DROP TABLE IF EXISTS surface_types CASCADE;

-- Create application_fields table
CREATE TABLE application_fields (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz DEFAULT now()
);

-- Create surface_types table
CREATE TABLE surface_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE application_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE surface_types ENABLE ROW LEVEL SECURITY;

-- Create policies for application_fields
CREATE POLICY "Allow public read access on application_fields"
    ON application_fields FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow authenticated manage application_fields"
    ON application_fields FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policies for surface_types
CREATE POLICY "Allow public read access on surface_types"
    ON surface_types FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow authenticated manage surface_types"
    ON surface_types FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert initial data for application_fields
INSERT INTO application_fields (name, description) VALUES
    ('Interior', 'Applications for indoor use'),
    ('Exterior', 'Applications for outdoor use'),
    ('Industrial', 'Applications for industrial settings'),
    ('Marine', 'Applications for marine environments'),
    ('Automotive', 'Applications for vehicles and automotive use'),
    ('Architectural', 'Applications for architectural features')
ON CONFLICT (name) DO NOTHING;

-- Insert initial data for surface_types
INSERT INTO surface_types (name, description) VALUES
    ('Concrete', 'Cement-based surfaces including walls, floors, and structures'),
    ('Wood', 'Natural and engineered wood surfaces'),
    ('Metal', 'Various metal surfaces including steel, aluminum, and galvanized metals'),
    ('Drywall', 'Interior wall surfaces made of gypsum board'),
    ('Plaster', 'Traditional plaster and modern render surfaces'),
    ('Brick', 'Clay brick and masonry surfaces'),
    ('Stucco', 'Exterior plaster finishes')
ON CONFLICT (name) DO NOTHING;