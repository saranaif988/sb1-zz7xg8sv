/*
  # Add foreign key relationship between products and brands

  1. Changes
    - Add foreign key constraint to products.brand_id referencing brands.id
    - Enable RLS on brands table
    - Add RLS policies for brands table

  2. Security
    - Enable RLS on brands table
    - Add policies for authenticated users to manage brands
    - Add policy for public read access
*/

-- Add foreign key constraint if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'products_brand_id_fkey'
  ) THEN
    ALTER TABLE products
    ADD CONSTRAINT products_brand_id_fkey
    FOREIGN KEY (brand_id) REFERENCES brands(id)
    ON DELETE SET NULL;
  END IF;
END $$;

-- Enable RLS on brands table
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DO $$ BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow authenticated users to manage brands" ON brands;
  DROP POLICY IF EXISTS "Allow public read access on brands" ON brands;
  
  -- Create new policies
  CREATE POLICY "Allow authenticated users to manage brands"
  ON brands
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

  CREATE POLICY "Allow public read access on brands"
  ON brands
  FOR SELECT
  TO public
  USING (true);
END $$;