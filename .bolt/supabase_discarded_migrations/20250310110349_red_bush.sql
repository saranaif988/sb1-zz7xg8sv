/*
  # Create FAQs table and setup RLS

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text, required)
      - `answer` (text, required)
      - `category` (text, optional)
      - `order` (integer, default 0)
      - `is_published` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `faqs` table
    - Add policy for public to read published FAQs
    - Add policy for authenticated users to manage FAQs

  3. Triggers
    - Add trigger to automatically update `updated_at` column
*/

-- Create the trigger function if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    CREATE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  END IF;
END $$;

-- Create FAQs table
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

-- Enable Row Level Security
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies with unique names
CREATE POLICY "faq_public_read_published"
  ON faqs
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "faq_authenticated_full_access"
  ON faqs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Drop existing trigger if it exists and create new one
DO $$ 
BEGIN
  DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
  
  CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON faqs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
END $$;