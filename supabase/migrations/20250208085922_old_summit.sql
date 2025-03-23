/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `price` (decimal, not null)
      - `image_url` (text)
      - `category` (text, not null)
      - `type` (text, not null)
      - `surface_type` (text[])
      - `color_family` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  image_url text,
  category text NOT NULL,
  type text NOT NULL,
  surface_type text[],
  color_family text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy for SELECT (Read Access)
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Policy for INSERT (Create Access)
CREATE POLICY "Allow insert access"
  ON products
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for UPDATE (Update Access)
CREATE POLICY "Allow update access"
  ON products
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy for DELETE (Delete Access)
CREATE POLICY "Allow delete access"
  ON products
  FOR DELETE
  TO public
  USING (true);

-- Insert sample data
INSERT INTO products (name, description, price, image_url, category, type, surface_type, color_family) VALUES
  ('Premium Interior Matte', 'Superior coverage with a smooth, elegant finish', 45.99, 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f', 'Wall Paint', 'Interior', ARRAY['Drywall', 'Plaster', 'Wood'], 'Neutral'),
  ('Weather Shield Exterior', 'Long-lasting protection against harsh weather', 52.99, 'https://images.unsplash.com/photo-1562259949-e8e7689d7828', 'Wall Paint', 'Exterior', ARRAY['Concrete', 'Brick', 'Stucco'], 'White'),
  ('Eco-Fresh Low VOC', 'Environmentally friendly with minimal odor', 39.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64', 'Ceiling Paint', 'Interior', ARRAY['Drywall', 'Plaster'], 'Green'),
  ('Designer Color Series', 'Curated palette for modern interiors', 48.99, 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8', 'Wall Paint', 'Interior', ARRAY['Drywall', 'Wood'], 'Blue'),
  ('Industrial Floor Paint', 'Heavy-duty protection for high-traffic areas', 65.99, 'https://images.unsplash.com/photo-1581094794329-c8112a89af12', 'Floor Paint', 'Interior', ARRAY['Concrete', 'Metal'], 'Gray'),
  ('Exterior Wood Stain', 'Deep penetrating protection for outdoor wood', 42.99, 'https://images.unsplash.com/photo-1595514535415-dae8580c4b0b', 'Wood Stain', 'Exterior', ARRAY['Wood'], 'Brown');