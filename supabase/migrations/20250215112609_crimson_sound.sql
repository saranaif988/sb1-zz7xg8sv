/*
  # Add detailed product information fields
  
  1. New Fields
    - Recommended uses
    - Features list
    - Application instructions
    - Technical information
    - Surface preparation
    - Drying time details
    - Storage conditions
*/

DO $$ 
BEGIN
  -- Recommended Uses and Features
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'recommended_uses') THEN
    ALTER TABLE products ADD COLUMN recommended_uses text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'features') THEN
    ALTER TABLE products ADD COLUMN features text[];
  END IF;

  -- Application Instructions
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'application_method') THEN
    ALTER TABLE products ADD COLUMN application_method text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'mixing_instructions') THEN
    ALTER TABLE products ADD COLUMN mixing_instructions text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'thinner_info') THEN
    ALTER TABLE products ADD COLUMN thinner_info text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'application_temp') THEN
    ALTER TABLE products ADD COLUMN application_temp text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'application_note') THEN
    ALTER TABLE products ADD COLUMN application_note text;
  END IF;

  -- Technical Information
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'color') THEN
    ALTER TABLE products ADD COLUMN color text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'gloss') THEN
    ALTER TABLE products ADD COLUMN gloss text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'volume_solids') THEN
    ALTER TABLE products ADD COLUMN volume_solids text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'voc') THEN
    ALTER TABLE products ADD COLUMN voc text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'flexibility') THEN
    ALTER TABLE products ADD COLUMN flexibility text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'adhesion') THEN
    ALTER TABLE products ADD COLUMN adhesion text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'film_thickness') THEN
    ALTER TABLE products ADD COLUMN film_thickness text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'spreading_rate') THEN
    ALTER TABLE products ADD COLUMN spreading_rate text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'specific_gravity') THEN
    ALTER TABLE products ADD COLUMN specific_gravity text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'water_resistance') THEN
    ALTER TABLE products ADD COLUMN water_resistance text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'number_of_coats') THEN
    ALTER TABLE products ADD COLUMN number_of_coats integer;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'packaging') THEN
    ALTER TABLE products ADD COLUMN packaging text;
  END IF;

  -- Surface Preparation
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'surface_preparation') THEN
    ALTER TABLE products ADD COLUMN surface_preparation text;
  END IF;

  -- Drying Time
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_touch') THEN
    ALTER TABLE products ADD COLUMN dry_to_touch text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_handle') THEN
    ALTER TABLE products ADD COLUMN dry_to_handle text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'drying_note') THEN
    ALTER TABLE products ADD COLUMN drying_note text;
  END IF;

  -- Storage Conditions
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'shelf_life') THEN
    ALTER TABLE products ADD COLUMN shelf_life text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'storage_conditions') THEN
    ALTER TABLE products ADD COLUMN storage_conditions text;
  END IF;
END $$;