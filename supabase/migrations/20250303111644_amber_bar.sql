/*
  # Update number_of_coats column type

  1. Changes
    - Change number_of_coats column type from integer to text to allow descriptive values
*/

ALTER TABLE products 
  ALTER COLUMN number_of_coats TYPE text USING number_of_coats::text;