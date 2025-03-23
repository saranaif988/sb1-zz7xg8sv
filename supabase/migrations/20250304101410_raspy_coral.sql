/*
  # Fix column names in products table

  1. Changes
    - Rename columns to use consistent naming convention
    - Drop old columns with incorrect casing
    - Add new columns with correct casing
*/

DO $$ 
BEGIN
  -- Drop old columns if they exist
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'Complete_Setting') THEN
    ALTER TABLE products DROP COLUMN "Complete_Setting";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'Dry_to_Topcoat') THEN
    ALTER TABLE products DROP COLUMN "Dry_to_Topcoat";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'Note') THEN
    ALTER TABLE products DROP COLUMN "Note";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'Washability') THEN
    ALTER TABLE products DROP COLUMN "Washability";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'Abrasian_Resistance') THEN
    ALTER TABLE products DROP COLUMN "Abrasian_Resistance";
  END IF;

  -- Add new columns with correct casing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'complete_setting') THEN
    ALTER TABLE products ADD COLUMN complete_setting text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'dry_to_topcoat') THEN
    ALTER TABLE products ADD COLUMN dry_to_topcoat text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'note') THEN
    ALTER TABLE products ADD COLUMN note text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'washability') THEN
    ALTER TABLE products ADD COLUMN washability text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'abrasian_resistance') THEN
    ALTER TABLE products ADD COLUMN abrasian_resistance text;
  END IF;
END $$;