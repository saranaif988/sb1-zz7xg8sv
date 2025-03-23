/*
  # Add additional product detail fields
  
  1. New Fields
    - `coverage_area` - Coverage area in sq ft/gallon
    - `drying_time` - Drying time specifications
    - `sizes` - Available sizes array
    - `colors` - Available colors array
    - `application_methods` - Application methods array
    - `technical_specs` - Technical specifications array
    - `safety_info` - Safety information array
    - `rating` - Product rating
    - `reviews_count` - Number of reviews
*/

-- Add new columns to products table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'coverage_area') THEN
    ALTER TABLE products ADD COLUMN coverage_area text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'drying_time') THEN
    ALTER TABLE products ADD COLUMN drying_time text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sizes') THEN
    ALTER TABLE products ADD COLUMN sizes text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'colors') THEN
    ALTER TABLE products ADD COLUMN colors text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'application_methods') THEN
    ALTER TABLE products ADD COLUMN application_methods text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'technical_specs') THEN
    ALTER TABLE products ADD COLUMN technical_specs text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'safety_info') THEN
    ALTER TABLE products ADD COLUMN safety_info text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating') THEN
    ALTER TABLE products ADD COLUMN rating numeric(3,2);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'reviews_count') THEN
    ALTER TABLE products ADD COLUMN reviews_count integer DEFAULT 0;
  END IF;
END $$;