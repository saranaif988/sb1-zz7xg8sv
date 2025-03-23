/*
  # Complete schema update for paint products

  1. New Tables
    - `brands`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo` (text)
      - `url` (text)
    
    - `packages`
      - `id` (uuid, primary key)
      - `size_name` (text)
    
    - `product_packages`
      - `product_id` (uuid, foreign key)
      - `package_id` (uuid, foreign key)

  2. Changes
    - Recreate products table with new structure
    - Add foreign key relationships
    - Enable RLS on all tables
    - Add policies for data access

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS product_packages CASCADE;

-- Create brands table
CREATE TABLE brands (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    logo text,
    url text,
    created_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE packages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    size_name text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price decimal(10,2) NOT NULL,
    image_url text,
    brand_id uuid REFERENCES brands(id),
    application_field jsonb,
    recommended_uses text,
    features text,
    
    -- Application Instructions
    method_of_application text,
    mixing text,
    thinner text,
    application_temperatures text,
    application_note text,
    
    -- Technical Information
    color text,
    gloss text,
    volume_solids text,
    voc text,
    number_of_coats integer,
    flexibility text,
    adhesion text,
    recommended_film_thickness text,
    theoretical_spreading_rate decimal(10,2),
    specific_gravity text,
    water_resistance text,
    surface_preparation text,
    
    -- Drying Time
    dry_to_touch text,
    dry_to_handle text,
    storing_conditions text,
    notice text,
    
    created_at timestamptz DEFAULT now()
);

-- Create product_packages junction table
CREATE TABLE product_packages (
    product_id uuid REFERENCES products(id) ON DELETE CASCADE,
    package_id uuid REFERENCES packages(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (product_id, package_id)
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_packages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on brands"
    ON brands FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow public read access on packages"
    ON packages FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow public read access on products"
    ON products FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow public read access on product_packages"
    ON product_packages FOR SELECT TO public
    USING (true);

-- Create policies for authenticated users to manage data
CREATE POLICY "Allow authenticated users to manage brands"
    ON brands FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage packages"
    ON packages FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage products"
    ON products FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage product_packages"
    ON product_packages FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert some initial data
INSERT INTO brands (name, logo, url) VALUES
    ('Premium Paint Co.', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f', 'https://premiumpaint.com'),
    ('Eco Paints', 'https://images.unsplash.com/photo-1562259949-e8e7689d7828', 'https://ecopaints.com');

INSERT INTO packages (size_name) VALUES
    ('1 Gallon'),
    ('5 Gallons'),
    ('1 Quart'),
    ('1 Pint');

-- Insert sample products
INSERT INTO products (
    name,
    description,
    price,
    image_url,
    brand_id,
    recommended_uses,
    color,
    gloss,
    volume_solids,
    voc
) 
SELECT 
    'Premium Interior Matte',
    'Superior coverage with a smooth, elegant finish',
    45.99,
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
    brands.id,
    'Interior walls and ceilings',
    'White',
    'Matte',
    '41%',
    '<50 g/L'
FROM brands 
WHERE name = 'Premium Paint Co.'
LIMIT 1;