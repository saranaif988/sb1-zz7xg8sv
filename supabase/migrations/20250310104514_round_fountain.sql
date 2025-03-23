/*
  # Create FAQ Management System

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text, required)
      - `answer` (text, required)
      - `category` (text)
      - `order` (integer) - for controlling display order
      - `is_published` (boolean) - to control visibility
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `faqs` table
    - Add policies for:
      - Public read access to published FAQs
      - Authenticated users can manage FAQs
*/

-- Create FAQ table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  "order" integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view published FAQs" 
  ON faqs
  FOR SELECT 
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage FAQs" 
  ON faqs
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();