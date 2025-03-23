/*
  # Fix Arabic translations for DecoText product

  1. Changes
    - Update storing_conditions_ar with proper Arabic translation
    - Ensure consistent translation style with other products
*/

-- Update storing_conditions_ar for DecoText product
UPDATE products
SET storing_conditions_ar = CASE 
    WHEN storing_conditions LIKE '%Coating performance is, in general, proportional%' 
    THEN 'يجب تخزين المنتج في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة. يجب إغلاق العبوات بإحكام بعد الاستخدام. يجب تجنب التعرض للحرارة والصقيع الشديد.

العمر الافتراضي للمنتج هو سنتان من تاريخ التعبئة في العبوات الأصلية غير المفتوحة عند درجة حرارة 10 إلى 40 درجة مئوية.'
    ELSE storing_conditions_ar
END
WHERE name LIKE '%DecoText%'
   OR name_ar LIKE '%ديكوتكست%';