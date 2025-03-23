/*
  # Add Technical Information Fields

  1. New Columns
    - `gloss_level` (text) - Stores the gloss finish type (e.g., "Matt", "Semi-gloss")
    - `volume_solids` (text) - Percentage of solids in the paint
    - `voc_content` (text) - VOC content with units
    - `flexibility` (text) - Flexibility rating
    - `adhesion` (text) - Adhesion rating
    - `film_thickness` (text) - Recommended film thickness
    - `spreading_rate` (text) - Coverage rate per unit
    - `specific_gravity` (text) - Density measurement
    - `number_of_coats` (integer) - Recommended number of coats
    - `mixing_instructions` (text) - Instructions for mixing
    - `thinner_info` (text) - Thinner/cleaner information
    - `application_temp` (text) - Recommended application temperature
    - `surface_prep` (text[]) - Surface preparation instructions
    - `storage_conditions` (text[]) - Storage requirements
    - `shelf_life` (text) - Product shelf life
    - `packaging_options` (text[]) - Available packaging sizes
    - `touch_dry_time` (text) - Time to touch dry
    - `handle_dry_time` (text) - Time to handle dry
    - `recoat_time` (text) - Time between coats

  2. Changes
    - Adds new columns to store detailed technical information
    - All fields are nullable to maintain compatibility with existing data
*/

DO $$ 
BEGIN
  -- Technical Specifications
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'gloss_level') THEN
    ALTER TABLE products ADD COLUMN gloss_level text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'volume_solids') THEN
    ALTER TABLE products ADD COLUMN volume_solids text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'voc_content') THEN
    ALTER TABLE products ADD COLUMN voc_content text;
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

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'number_of_coats') THEN
    ALTER TABLE products ADD COLUMN number_of_coats integer;
  END IF;

  -- Application Details
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'mixing_instructions') THEN
    ALTER TABLE products ADD COLUMN mixing_instructions text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'thinner_info') THEN
    ALTER TABLE products ADD COLUMN thinner_info text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'application_temp') THEN
    ALTER TABLE products ADD COLUMN application_temp text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'surface_prep') THEN
    ALTER TABLE products ADD COLUMN surface_prep text[];
  END IF;

  -- Storage and Packaging
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'storage_conditions') THEN
    ALTER TABLE products ADD COLUMN storage_conditions text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'shelf_life') THEN
    ALTER TABLE products ADD COLUMN shelf_life text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'packaging_options') THEN
    ALTER TABLE products ADD COLUMN packaging_options text[];
  END IF;

  -- Drying Times
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'touch_dry_time') THEN
    ALTER TABLE products ADD COLUMN touch_dry_time text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'handle_dry_time') THEN
    ALTER TABLE products ADD COLUMN handle_dry_time text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'recoat_time') THEN
    ALTER TABLE products ADD COLUMN recoat_time text;
  END IF;
END $$;