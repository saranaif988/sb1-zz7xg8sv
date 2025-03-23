/*
  # Add missing columns to products table

  1. New Columns
    - Complet_Setting (text)
    - Dry_to_Topcoat (text)
    - Note (text)
    - Washability (text)
    - Abrasian_Resistance (text)

  2. Changes
    - Adds new columns for product specifications
    - All columns are nullable
*/

DO $$ 
BEGIN
  -- Add Complet_Setting if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'complet_setting') THEN
    ALTER TABLE products ADD COLUMN complet_setting text;
  END IF;

  -- Add Dry_to_Topcoat if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'dry_to_topcoat') THEN
    ALTER TABLE products ADD COLUMN dry_to_topcoat text;
  END IF;

  -- Add Note if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'note') THEN
    ALTER TABLE products ADD COLUMN note text;
  END IF;

  -- Add Washability if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'washability') THEN
    ALTER TABLE products ADD COLUMN washability text;
  END IF;

  -- Add Abrasian_Resistance if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'abrasian_resistance') THEN
    ALTER TABLE products ADD COLUMN abrasian_resistance text;
  END IF;
END $$;