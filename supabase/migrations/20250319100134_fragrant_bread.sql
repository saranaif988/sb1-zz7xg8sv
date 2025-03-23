/*
  # Add Arabic translations for technical specifications

  1. Changes
    - Add translations for technical specifications fields
    - Handle numeric fields properly
    - Include standard measurements and units in Arabic
    - Maintain technical accuracy while using proper Arabic terminology
*/

-- Update technical specifications with Arabic translations
UPDATE products
SET
  -- Color and Gloss translations
  color = CASE 
    WHEN color = 'White' THEN 'أبيض | White'
    WHEN color = 'Clear' THEN 'شفاف | Clear'
    WHEN color = 'Custom' THEN 'حسب الطلب | Custom'
    ELSE color
  END,
  
  gloss = CASE 
    WHEN gloss = 'Matte' THEN 'مطفي | Matte'
    WHEN gloss = 'Semi-Gloss' THEN 'نصف لامع | Semi-Gloss'
    WHEN gloss = 'Gloss' THEN 'لامع | Gloss'
    WHEN gloss = 'Eggshell' THEN 'قشرة البيض | Eggshell'
    ELSE gloss
  END,

  -- Volume Solids and VOC translations
  volume_solids = CASE
    WHEN volume_solids LIKE '%ASTM-D2697%' 
    THEN REPLACE(volume_solids, 'ASTM-D2697', 'المواد الصلبة بالحجم (ASTM-D2697)')
    ELSE volume_solids
  END,

  voc = CASE
    WHEN voc LIKE '%ASTM-D3960%'
    THEN REPLACE(voc, 'ASTM-D3960', 'المركبات العضوية المتطايرة (ASTM-D3960)')
    ELSE voc
  END,

  -- Flexibility and Adhesion translations
  flexibility = CASE
    WHEN flexibility = 'Excellent' THEN 'ممتاز | Excellent'
    WHEN flexibility = 'Good' THEN 'جيد | Good'
    WHEN flexibility = 'Fair' THEN 'مقبول | Fair'
    ELSE flexibility
  END,

  adhesion = CASE
    WHEN adhesion = 'Excellent' THEN 'ممتاز | Excellent'
    WHEN adhesion = 'Good' THEN 'جيد | Good'
    WHEN adhesion = 'Fair' THEN 'مقبول | Fair'
    ELSE adhesion
  END,

  -- Washability and Abrasion Resistance translations
  washability = CASE
    WHEN washability = 'Excellent' THEN 'ممتاز | Excellent'
    WHEN washability = 'Good' THEN 'جيد | Good'
    WHEN washability LIKE '%cycles%' THEN REPLACE(washability, 'cycles', 'دورة')
    ELSE washability
  END,

  abrasion_resistance = CASE
    WHEN abrasion_resistance = 'Excellent' THEN 'ممتاز | Excellent'
    WHEN abrasion_resistance = 'Good' THEN 'جيد | Good'
    WHEN abrasion_resistance LIKE '%cycles%' THEN REPLACE(abrasion_resistance, 'cycles', 'دورة')
    ELSE abrasion_resistance
  END,

  -- Film Thickness and Spreading Rate translations
  recommended_film_thickness = CASE
    WHEN recommended_film_thickness LIKE '%microns%'
    THEN REPLACE(recommended_film_thickness, 'microns', 'ميكرون')
    WHEN recommended_film_thickness LIKE '%dry%'
    THEN REPLACE(recommended_film_thickness, 'dry', 'جاف')
    ELSE recommended_film_thickness
  END,

  -- Water Resistance translation
  water_resistance = CASE
    WHEN water_resistance = 'Excellent' THEN 'ممتاز | Excellent'
    WHEN water_resistance = 'Good' THEN 'جيد | Good'
    WHEN water_resistance = 'Fair' THEN 'مقبول | Fair'
    ELSE water_resistance
  END,

  -- Specific Gravity translation
  specific_gravity = CASE
    WHEN specific_gravity LIKE '%ASTM-D1475%'
    THEN REPLACE(specific_gravity, 'ASTM-D1475', 'الكثافة النوعية (ASTM-D1475)')
    ELSE specific_gravity
  END,

  -- Number of Coats translation
  number_of_coats = CASE
    WHEN number_of_coats LIKE '%depends on surface porosity%'
    THEN '1-2 طبقة "يعتمد على مسامية السطح" | 1-2 "depends on surface porosity"'
    WHEN number_of_coats LIKE '%or more%'
    THEN REPLACE(number_of_coats, 'or more', 'أو أكثر')
    ELSE number_of_coats
  END;

-- Handle theoretical spreading rate separately since it's a numeric field
UPDATE products
SET theoretical_spreading_rate = theoretical_spreading_rate
WHERE theoretical_spreading_rate IS NOT NULL;