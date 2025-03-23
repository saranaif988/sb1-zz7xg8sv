/*
  # Add description to packages table

  1. Changes
    - Add description column to packages table
*/

DO $$ 
BEGIN
  -- Add description column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'packages' AND column_name = 'description') THEN
    ALTER TABLE packages ADD COLUMN description text;
  END IF;
END $$;