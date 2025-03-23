/*
  # Add Foreign Key Relationships

  1. Changes
    - Add foreign key relationship between products and brands
    - Add foreign key relationship between products and application_fields
    - Add foreign key relationship between products and surface_types

  2. Security
    - Maintain existing RLS policies
*/

-- Add foreign key constraints
ALTER TABLE products
ADD CONSTRAINT fk_products_brand
FOREIGN KEY (brand_id) REFERENCES brands(id)
ON DELETE SET NULL;

ALTER TABLE products
ADD CONSTRAINT fk_products_application_fields
FOREIGN KEY (application_fields) REFERENCES application_fields(id)
ON DELETE SET NULL;

ALTER TABLE products
ADD CONSTRAINT fk_products_surface_types
FOREIGN KEY (surface_types) REFERENCES surface_types(id)
ON DELETE SET NULL;