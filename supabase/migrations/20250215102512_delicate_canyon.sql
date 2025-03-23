/*
  # Add reference data tables

  1. New Tables
    - `product_categories`: Stores product category options
    - `product_types`: Stores product type options
    - `surface_types`: Stores surface type options

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage reference data
*/

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create product_types table
CREATE TABLE IF NOT EXISTS product_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create surface_types table
CREATE TABLE IF NOT EXISTS surface_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE surface_types ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read categories"
  ON product_categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage categories"
  ON product_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read types"
  ON product_types
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage types"
  ON product_types
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read surface types"
  ON surface_types
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage surface types"
  ON surface_types
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data
INSERT INTO product_categories (name, description) VALUES
  ('Wall Paint', 'Paint specifically formulated for walls'),
  ('Ceiling Paint', 'Paint designed for ceiling application'),
  ('Floor Paint', 'Durable paint for floor surfaces'),
  ('Wood Stain', 'Protective and decorative finishes for wood')
ON CONFLICT (name) DO NOTHING;

INSERT INTO product_types (name, description) VALUES
  ('Interior', 'Products for indoor use'),
  ('Exterior', 'Products for outdoor use')
ON CONFLICT (name) DO NOTHING;

INSERT INTO surface_types (name, description) VALUES
  ('Drywall', 'Standard interior wall surface'),
  ('Plaster', 'Traditional wall finishing material'),
  ('Wood', 'Natural wood surfaces'),
  ('Concrete', 'Cement-based surfaces'),
  ('Brick', 'Clay-based building material'),
  ('Stucco', 'Exterior wall coating'),
  ('Metal', 'Various metal surfaces')
ON CONFLICT (name) DO NOTHING;