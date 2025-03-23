/*
  # Add Arabic translations for application notes and drying times

  1. Changes
    - Add Arabic translations for application notes
    - Add Arabic translations for drying time information
    - Add Arabic translations for storage conditions
    - Ensure consistent translation format
*/

-- Update application_note_ar for common application notes
UPDATE products
SET application_note_ar = CASE 
    WHEN application_note LIKE '%When recoating a special attention should%' 
    THEN 'عند إعادة الطلاء، يجب إيلاء اهتمام خاص لتجنب التعرض المباشر لأشعة الشمس'
    WHEN application_note LIKE '%When applying an additional coat%'
    THEN 'عند تطبيق طبقة إضافية، يجب مراعاة وقت الجفاف المناسب'
    WHEN application_note LIKE '%when coating the other side%'
    THEN 'عند طلاء الجانب الآخر، يجب الانتظار حتى يجف الطلاء تماماً'
    ELSE application_note_ar
END
WHERE application_note IS NOT NULL;

-- Update note_ar for drying time information
UPDATE products
SET note_ar = CASE
    WHEN note LIKE '%Drying times can be affected by many factors%'
    THEN 'يمكن أن تتأثر أوقات الجفاف بعوامل عديدة مثل درجة الحرارة والرطوبة وحركة الهواء وسماكة الطبقة'
    WHEN note LIKE '%Drying time is affected by several factors%'
    THEN 'يتأثر وقت الجفاف بعدة عوامل مثل درجة الحرارة والرطوبة النسبية وسماكة الطبقة'
    ELSE note_ar
END
WHERE note IS NOT NULL;

-- Update storing_conditions_ar for storage instructions
UPDATE products
SET storing_conditions_ar = CASE
    WHEN storing_conditions LIKE '%should not be exposed to direct sunlight%'
    THEN 'يجب تخزين المنتج في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة'
    WHEN storing_conditions LIKE '%must not be allowed to be stored%'
    THEN 'يجب عدم تخزين المنتج في المعادن غير المعالجة التي قد تتآكل. يجب إغلاق العبوات بإحكام'
    WHEN storing_conditions LIKE '%Store between 10 to 40°C%'
    THEN 'يجب التخزين في درجة حرارة بين 10 إلى 40 درجة مئوية'
    ELSE storing_conditions_ar
END
WHERE storing_conditions IS NOT NULL;

-- Update surface_preparation_ar for surface preparation instructions
UPDATE products
SET surface_preparation_ar = CASE
    WHEN surface_preparation LIKE '%Coating performance is, in general, proportional%'
    THEN 'يعتمد أداء الطلاء بشكل عام على درجة تحضير السطح. يجب أن يكون السطح نظيفاً وجافاً وخالياً من أي ملوثات'
    WHEN surface_preparation LIKE '%Surface must be clean and dry%'
    THEN 'يجب أن يكون السطح نظيفاً وجافاً وخالياً من الأتربة والزيوت والشحوم'
    ELSE surface_preparation_ar
END
WHERE surface_preparation IS NOT NULL;