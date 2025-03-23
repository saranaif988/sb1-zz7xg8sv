/*
  # Add drying time fields to products table

  1. New Fields
    - `dry_to_touch` (text) - Time until paint is dry to touch
    - `dry_to_handle` (text) - Time until paint can be handled
    - `drying_note` (text) - Additional notes about drying time

  2. Changes
    - Adds three new columns to the products table for tracking drying time details
*/

DO $$ 
BEGIN
  -- Add dry_to_touch column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_touch') THEN
    ALTER TABLE products ADD COLUMN dry_to_touch text;
  END IF;

  -- Add dry_to_handle column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_handle') THEN
    ALTER TABLE products ADD COLUMN dry_to_handle text;
  END IF;

  -- Add drying_note column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'drying_note') THEN
    ALTER TABLE products ADD COLUMN drying_note text;
  END IF;
END $$;