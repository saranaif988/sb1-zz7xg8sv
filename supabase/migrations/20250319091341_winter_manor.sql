/*
  # Add Arabic translations for product fields

  1. Changes
    - Add Arabic translations for method_of_application
    - Add Arabic translations for mixing instructions
    - Add Arabic translations for thinner information
    - Add Arabic translations for features
    - Ensure consistent translation format
*/

-- Update method_of_application_ar for common application methods
UPDATE products
SET method_of_application_ar = CASE 
    WHEN method_of_application LIKE '%Brush or roller%' 
    THEN 'يمكن التطبيق باستخدام الفرشاة أو الرول'
    WHEN method_of_application LIKE '%Airless spray%'
    THEN 'يمكن التطبيق بالرش اللاهوائي أو الرول'
    WHEN method_of_application LIKE '%conventional spray%'
    THEN 'يمكن التطبيق بالفرشاة أو الرش التقليدي'
    WHEN method_of_application LIKE '%special spray instrument%'
    THEN 'يمكن التطبيق بالرول أو باستخدام أداة رش خاصة'
    ELSE method_of_application_ar
END
WHERE method_of_application IS NOT NULL;

-- Update mixing_ar for mixing instructions
UPDATE products
SET mixing_ar = CASE
    WHEN mixing LIKE '%container should be stirred%'
    THEN 'يجب تقليب المحتويات جيداً قبل الاستخدام'
    WHEN mixing LIKE '%container should be shaken%'
    THEN 'يجب رج العبوة جيداً قبل الاستخدام'
    WHEN mixing LIKE '%Good flow%'
    THEN 'تدفق جيد. يشكل طبقة ناعمة. يغطي بشكل جيد'
    ELSE mixing_ar
END
WHERE mixing IS NOT NULL;

-- Update thinner_ar for thinner information
UPDATE products
SET thinner_ar = CASE
    WHEN thinner LIKE '%Water is used for cleaning%'
    THEN 'يستخدم الماء للتنظيف'
    WHEN thinner LIKE '%S101 is used for thinning%'
    THEN 'يستخدم S101 للتخفيف والتنظيف'
    WHEN thinner LIKE '%Thinning is generally not required%'
    THEN 'التخفيف غير مطلوب عادة؛ جاهز للاستخدام'
    ELSE thinner_ar
END
WHERE thinner IS NOT NULL;

-- Update features_ar for common features
UPDATE products
SET features_ar = CASE
    WHEN features LIKE '%Good flow%'
    THEN '• تدفق جيد
• يشكل طبقة ناعمة
• تغطية جيدة'
    WHEN features LIKE '%Excellent coverage%'
    THEN '• تغطية ممتازة
• مقاومة عالية
• سهل التطبيق'
    ELSE features_ar
END
WHERE features IS NOT NULL;