/*
  # Fix remaining Arabic translations

  1. Changes
    - Add Arabic translations for Acrylic Sealer and remaining products
    - Ensure consistent translation style
    - Fix any missing translations
*/

-- Update descriptions for remaining products
UPDATE products
SET description_ar = CASE 
    WHEN name LIKE '%Acrylic Sealer%'
    THEN 'سيلر أكريليك عالي الجودة يوفر طبقة حماية شفافة ومتينة. يعزز مقاومة السطح للماء والعوامل الجوية مع الحفاظ على المظهر الطبيعي.'
    
    WHEN name LIKE '%DecoOil%'
    THEN 'زيت خشب طبيعي يحمي ويجمل الأسطح الخشبية. يغذي الخشب ويبرز جماله الطبيعي مع توفير حماية طويلة الأمد.'
    
    ELSE description_ar
END
WHERE (name LIKE '%Acrylic Sealer%' OR name LIKE '%DecoOil%')
  AND (description_ar IS NULL OR description_ar LIKE '%Water based%' OR description_ar = description);

-- Update features for these products
UPDATE products
SET features_ar = CASE 
    WHEN name LIKE '%Acrylic Sealer%'
    THEN '• حماية فائقة ضد الماء والرطوبة
• شفافية عالية تحافظ على المظهر الطبيعي
• سهل التطبيق وسريع الجفاف
• مقاومة ممتازة للأشعة فوق البنفسجية
• يعزز متانة السطح'
    
    WHEN name LIKE '%DecoOil%'
    THEN '• يغذي ويحمي الخشب
• يبرز الجمال الطبيعي للخشب
• مقاوم للماء والرطوبة
• سهل التطبيق والصيانة
• حماية طويلة الأمد'
    
    ELSE features_ar
END
WHERE (name LIKE '%Acrylic Sealer%' OR name LIKE '%DecoOil%')
  AND (features_ar IS NULL OR features_ar = features);

-- Update application instructions
UPDATE products
SET 
    method_of_application_ar = CASE 
        WHEN name LIKE '%Acrylic Sealer%'
        THEN 'يمكن التطبيق بالفرشاة أو الرول أو الرش. يجب التطبيق بشكل متساوٍ مع تجنب التراكم الزائد.'
        WHEN name LIKE '%DecoOil%'
        THEN 'يطبق بالفرشاة أو قطعة قماش ناعمة. يمسح الزائد بعد 5-10 دقائق للحصول على أفضل النتائج.'
        ELSE method_of_application_ar
    END,
    mixing_ar = CASE 
        WHEN name LIKE '%Acrylic Sealer%'
        THEN 'يجب تقليب المنتج جيداً قبل الاستخدام. لا يحتاج إلى تخفيف في معظم التطبيقات.'
        WHEN name LIKE '%DecoOil%'
        THEN 'جاهز للاستخدام. يجب التقليب جيداً قبل وأثناء الاستخدام.'
        ELSE mixing_ar
    END,
    surface_preparation_ar = CASE 
        WHEN name LIKE '%Acrylic Sealer%'
        THEN 'يجب أن يكون السطح نظيفاً وجافاً وخالياً من الأتربة والزيوت والشحوم. يجب إزالة أي طلاء قديم أو متقشر.'
        WHEN name LIKE '%DecoOil%'
        THEN 'يجب أن يكون الخشب نظيفاً وجافاً وخالياً من الأتربة والزيوت. يفضل الصنفرة الخفيفة قبل التطبيق.'
        ELSE surface_preparation_ar
    END
WHERE name LIKE '%Acrylic Sealer%' OR name LIKE '%DecoOil%';