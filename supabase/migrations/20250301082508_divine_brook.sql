-- Backup existing data
CREATE TEMP TABLE brands_backup AS SELECT * FROM brands;

-- Drop existing table and its dependencies
DROP TABLE IF EXISTS brands CASCADE;

-- Recreate brands table with all columns
CREATE TABLE brands (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    logo text,
    description text,
    contact_email text,
    contact_phone text,
    website text,
    created_at timestamptz DEFAULT now()
);

-- Restore data from backup
INSERT INTO brands (id, name, logo, description, contact_email, contact_phone, website, created_at)
SELECT 
    id,
    name,
    logo,
    description,
    contact_email,
    contact_phone,
    website,
    created_at
FROM brands_backup;

-- Drop temporary backup table
DROP TABLE brands_backup;

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Allow public read access on brands"
    ON brands FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow authenticated users to manage brands"
    ON brands FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);