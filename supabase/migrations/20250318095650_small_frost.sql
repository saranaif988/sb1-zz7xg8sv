/*
  # Add Arabic language support to database tables

  1. Changes
    - Add Arabic language fields to products table
    - Add Arabic language fields to application_fields table
    - Add Arabic language fields to surface_types table
    - Add Arabic language fields to brands table
    - Add Arabic language fields to faqs table

  2. Security
    - Maintain existing RLS policies
*/

-- Add Arabic language fields to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS name_ar text,
ADD COLUMN IF NOT EXISTS description_ar text,
ADD COLUMN IF NOT EXISTS features_ar text,
ADD COLUMN IF NOT EXISTS method_of_application_ar text,
ADD COLUMN IF NOT EXISTS mixing_ar text,
ADD COLUMN IF NOT EXISTS thinner_ar text,
ADD COLUMN IF NOT EXISTS application_temperatures_ar text,
ADD COLUMN IF NOT EXISTS application_note_ar text,
ADD COLUMN IF NOT EXISTS surface_preparation_ar text,
ADD COLUMN IF NOT EXISTS storing_conditions_ar text,
ADD COLUMN IF NOT EXISTS notice_ar text,
ADD COLUMN IF NOT EXISTS note_ar text;

-- Add Arabic language fields to application_fields table
ALTER TABLE application_fields
ADD COLUMN IF NOT EXISTS name_ar text,
ADD COLUMN IF NOT EXISTS description_ar text;

-- Add Arabic language fields to surface_types table
ALTER TABLE surface_types
ADD COLUMN IF NOT EXISTS name_ar text,
ADD COLUMN IF NOT EXISTS description_ar text;

-- Add Arabic language fields to brands table
ALTER TABLE brands
ADD COLUMN IF NOT EXISTS name_ar text,
ADD COLUMN IF NOT EXISTS description_ar text;

-- Add Arabic language fields to faqs table
ALTER TABLE faqs
ADD COLUMN IF NOT EXISTS question_ar text,
ADD COLUMN IF NOT EXISTS answer_ar text;