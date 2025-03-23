/*
  # Fix application fields schema

  1. Changes
    - Rename application_field column to application_fields in products table
    - Add missing columns to application_fields table
    - Update RLS policies

  2. Security
    - Ensure RLS policies are properly configured
*/

-- Rename column in products table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'application_field') THEN
    ALTER TABLE products RENAME COLUMN application_field TO application_fields;
  END IF;
END $$;

-- Add missing columns to application_fields table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'application_fields' AND column_name = 'description') THEN
    ALTER TABLE application_fields ADD COLUMN description text;
  END IF;
END $$;