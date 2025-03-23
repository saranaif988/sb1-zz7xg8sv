/*
  # Add Arabic translations for technical specifications

  1. Changes
    - Add Arabic translations for color, gloss, and other technical fields
    - Update existing products with proper Arabic translations
    - Ensure consistent bilingual format for measurements and units

  2. Fields Updated
    - color_ar
    - gloss_ar
    - volume_solids_ar
    - voc_ar
    - flexibility_ar
    - adhesion_ar
    - washability_ar
    - abrasion_resistance_ar
    - recommended_film_thickness_ar
    - water_resistance_ar
    - specific_gravity_ar
    - number_of_coats_ar
*/

-- Update technical specifications with Arabic translations
UPDATE products
SET
  -- Color and Gloss translations
  color_ar = CASE 
    WHEN color = 'White' THEN 'أبيض'
    WHEN color = 'Clear' THEN 'شفاف'
    WHEN color = 'Custom' THEN 'حسب الطلب'
    ELSE color_ar
  END,
  
  gloss_ar = CASE 
    WHEN gloss = 'Matte' THEN 'مطفي'
    WHEN gloss = 'Semi-Gloss' THEN 'نصف لامع'
    WHEN gloss = 'Gloss' THEN 'لامع'
    WHEN gloss = 'Eggshell' THEN 'قشرة البيض'
    ELSE gloss_ar
  END,

  -- Volume Solids and VOC translations
  volume_solids_ar = CASE
    WHEN volume_solids LIKE '%41%' THEN '41٪ (المواد الصلبة بالحجم)'
    WHEN volume_solids LIKE '%45%' THEN '45٪ (المواد الصلبة بالحجم)'
    WHEN volume_solids LIKE '%50%' THEN '50٪ (المواد الصلبة بالحجم)'
    ELSE volume_solids_ar
  END,

  voc_ar = CASE
    WHEN voc LIKE '%<50%' THEN 'أقل من 50 جرام/لتر'
    WHEN voc LIKE '%<30%' THEN 'أقل من 30 جرام/لتر'
    WHEN voc LIKE '%<100%' THEN 'أقل من 100 جرام/لتر'
    ELSE voc_ar
  END,

  -- Performance characteristics translations
  flexibility_ar = CASE
    WHEN flexibility = 'Excellent' THEN 'ممتاز'
    WHEN flexibility = 'Good' THEN 'جيد'
    WHEN flexibility = 'Fair' THEN 'مقبول'
    ELSE flexibility_ar
  END,

  adhesion_ar = CASE
    WHEN adhesion = 'Excellent' THEN 'ممتاز'
    WHEN adhesion = 'Good' THEN 'جيد'
    WHEN adhesion = 'Fair' THEN 'مقبول'
    ELSE adhesion_ar
  END,

  washability_ar = CASE
    WHEN washability = 'Excellent' THEN 'ممتاز'
    WHEN washability = 'Good' THEN 'جيد'
    WHEN washability LIKE '%cycles%' THEN REPLACE(washability, 'cycles', 'دورة')
    ELSE washability_ar
  END,

  abrasion_resistance_ar = CASE
    WHEN abrasion_resistance = 'Excellent' THEN 'ممتاز'
    WHEN abrasion_resistance = 'Good' THEN 'جيد'
    WHEN abrasion_resistance LIKE '%cycles%' THEN REPLACE(abrasion_resistance, 'cycles', 'دورة')
    ELSE abrasion_resistance_ar
  END,

  -- Physical properties translations
  recommended_film_thickness_ar = CASE
    WHEN recommended_film_thickness LIKE '%microns%'
    THEN REPLACE(REPLACE(recommended_film_thickness, 'microns', 'ميكرون'), 'dry', 'جاف')
    ELSE recommended_film_thickness_ar
  END,

  water_resistance_ar = CASE
    WHEN water_resistance = 'Excellent' THEN 'ممتاز'
    WHEN water_resistance = 'Good' THEN 'جيد'
    WHEN water_resistance = 'Fair' THEN 'مقبول'
    ELSE water_resistance_ar
  END,

  specific_gravity_ar = CASE
    WHEN specific_gravity LIKE '%1.3%' THEN '1.3 كجم/لتر'
    WHEN specific_gravity LIKE '%1.4%' THEN '1.4 كجم/لتر'
    WHEN specific_gravity LIKE '%1.5%' THEN '1.5 كجم/لتر'
    ELSE specific_gravity_ar
  END,

  number_of_coats_ar = CASE
    WHEN number_of_coats = '1-2' THEN '1-2 طبقة'
    WHEN number_of_coats LIKE '%or more%' THEN REPLACE(number_of_coats, 'or more', 'أو أكثر')
    ELSE number_of_coats_ar
  END;

-- Update specific products with their unique technical specifications
UPDATE products
SET
  volume_solids_ar = '41٪ (المواد الصلبة بالحجم)',
  voc_ar = 'أقل من 50 جرام/لتر',
  flexibility_ar = 'ممتاز',
  adhesion_ar = 'ممتاز',
  washability_ar = 'ممتاز - 20000 دورة',
  abrasion_resistance_ar = 'ممتاز - مقاوم للخدش والتآكل',
  water_resistance_ar = 'ممتاز - مقاوم للماء والرطوبة'
WHERE name LIKE '%Premium%';

UPDATE products
SET
  volume_solids_ar = '45٪ (المواد الصلبة بالحجم)',
  voc_ar = 'أقل من 30 جرام/لتر',
  flexibility_ar = 'ممتاز',
  adhesion_ar = 'ممتاز',
  washability_ar = 'ممتاز - 15000 دورة',
  abrasion_resistance_ar = 'جيد جداً - مقاوم للخدش',
  water_resistance_ar = 'ممتاز - مقاوم للماء'
WHERE name LIKE '%SilkCoat%';

UPDATE products
SET
  volume_solids_ar = '50٪ (المواد الصلبة بالحجم)',
  voc_ar = 'أقل من 100 جرام/لتر',
  flexibility_ar = 'ممتاز - مرونة عالية',
  adhesion_ar = 'ممتاز - التصاق قوي',
  washability_ar = 'ممتاز - 25000 دورة',
  abrasion_resistance_ar = 'ممتاز - مقاومة عالية للتآكل',
  water_resistance_ar = 'ممتاز - مقاومة عالية للماء والرطوبة'
WHERE name LIKE '%Weather Shield%';