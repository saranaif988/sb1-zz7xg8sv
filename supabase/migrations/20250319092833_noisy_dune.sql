/*
  # Fix Arabic translations for Passepartout product

  1. Changes
    - Update method_of_application_ar with proper Arabic translation
    - Update mixing_ar with proper Arabic translation
    - Update storing_conditions_ar with proper Arabic translation
    - Update thinner_ar with proper Arabic translation
    - Ensure consistent translations across all fields
*/

-- Update translations for Passepartout product
UPDATE products
SET
  -- Application method translation
  method_of_application_ar = CASE 
    WHEN method_of_application LIKE '%With a wide paddle%'
    THEN 'يتم التطبيق باستخدام مجرفة عريضة'
    WHEN method_of_application LIKE '%Brush or conventional spray%'
    THEN 'يمكن التطبيق بالفرشاة أو الرش التقليدي'
    ELSE method_of_application_ar
  END,

  -- Mixing instructions translation
  mixing_ar = CASE
    WHEN mixing LIKE '%Thinning is generally not required%'
    THEN 'التخفيف غير مطلوب عادة؛ المنتج جاهز للاستخدام'
    WHEN mixing LIKE '%The container should be stirred%'
    THEN 'يجب تقليب المحتويات جيداً قبل الاستخدام'
    WHEN mixing LIKE '%The container should be shaken%'
    THEN 'يجب رج العبوة جيداً قبل الاستخدام'
    ELSE mixing_ar
  END,

  -- Storage conditions translation
  storing_conditions_ar = CASE
    WHEN storing_conditions LIKE '%Passepartout should not be exposed%'
    THEN 'يجب تخزين باسبارتو في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة. يجب إغلاق العبوات بإحكام بعد الاستخدام'
    ELSE storing_conditions_ar
  END,

  -- Thinner information translation
  thinner_ar = CASE
    WHEN thinner LIKE '%Water is used for cleaning%'
    THEN 'يستخدم الماء للتنظيف'
    WHEN thinner LIKE '%Thinning is generally not required%'
    THEN 'التخفيف غير مطلوب عادة؛ المنتج جاهز للاستخدام'
    ELSE thinner_ar
  END,

  -- Application note translation
  application_note_ar = CASE
    WHEN application_note LIKE '%When applying an additional coat%'
    THEN 'عند تطبيق طبقة إضافية، يجب مراعاة وقت الجفاف المناسب بين الطبقات'
    ELSE application_note_ar
  END

WHERE name LIKE '%Passepartout%'
   OR name_ar LIKE '%باسبارتو%';