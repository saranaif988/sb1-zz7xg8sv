/*
  # Remove drying time and application method information
  
  1. Changes
    - Sets drying time fields to null
    - Sets application method fields to null
    - Removes application methods array
  
  2. Affected Fields
    - dry_to_touch
    - dry_to_handle
    - drying_note
    - drying_time
    - application_method
    - application_methods
*/

UPDATE products
SET 
  dry_to_touch = NULL,
  dry_to_handle = NULL,
  drying_note = NULL,
  drying_time = NULL,
  application_method = NULL,
  application_methods = NULL
WHERE name = 'Suba-Basic';