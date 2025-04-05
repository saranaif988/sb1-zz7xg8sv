-- Create color_types table
CREATE TABLE IF NOT EXISTS color_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  description TEXT,
  description_ar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gloss_types table
CREATE TABLE IF NOT EXISTS gloss_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  description TEXT,
  description_ar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for both tables
alter publication supabase_realtime add table color_types;
alter publication supabase_realtime add table gloss_types;

-- Insert some initial data for colors
INSERT INTO color_types (name, name_ar, description) VALUES
('White', 'أبيض', 'Pure white color'),
('Beige', 'بيج', 'Warm beige color'),
('Gray', 'رمادي', 'Neutral gray color'),
('Blue', 'أزرق', 'Classic blue color'),
('Green', 'أخضر', 'Fresh green color'),
('Yellow', 'أصفر', 'Bright yellow color'),
('Red', 'أحمر', 'Vibrant red color'),
('Black', 'أسود', 'Deep black color'),
('Brown', 'بني', 'Warm brown color'),
('Orange', 'برتقالي', 'Energetic orange color'),
('Purple', 'أرجواني', 'Rich purple color'),
('Pink', 'وردي', 'Soft pink color')
ON CONFLICT (id) DO NOTHING;

-- Insert some initial data for gloss types
INSERT INTO gloss_types (name, name_ar, description) VALUES
('Matte', 'مطفي', 'Non-reflective finish'),
('Silk', 'حريري', 'Subtle sheen finish'),
('Gloss', 'لامع', 'Shiny reflective finish'),
('Semi-Gloss', 'شبه لامع', 'Moderately shiny finish'),
('Eggshell', 'قشرة البيض', 'Low-sheen finish'),
('Satin', 'ساتان', 'Pearl-like finish'),
('Flat', 'مسطح', 'No-shine finish'),
('High-Gloss', 'لامع جداً', 'Mirror-like finish')
ON CONFLICT (id) DO NOTHING;