/*
  # Fix brands table structure

  1. Changes
    - Add contact_email column
    - Add contact_phone column
    - Add description column
    - Add website column
*/

DO $$ 
BEGIN
  -- Add contact_email if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brands' AND column_name = 'contact_email') THEN
    ALTER TABLE brands ADD COLUMN contact_email text;
  END IF;

  -- Add contact_phone if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brands' AND column_name = 'contact_phone') THEN
    ALTER TABLE brands ADD COLUMN contact_phone text;
  END IF;

  -- Add description if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brands' AND column_name = 'description') THEN
    ALTER TABLE brands ADD COLUMN description text;
  END IF;

  -- Add website if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brands' AND column_name = 'website') THEN
    ALTER TABLE brands ADD COLUMN website text;
  END IF;
END $$;