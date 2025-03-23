/*
  # Add Arabic translations for storage conditions and notices

  1. Changes
    - Add Arabic translations for storage conditions and notices
    - Update existing products with Arabic translations
*/

-- Update existing products with Arabic translations
UPDATE products
SET
  storing_conditions_ar = CASE 
    WHEN storing_conditions LIKE '%DecoSeal must not be allowed%' 
    THEN 'يجب عدم تخزين ديكوسيل في المعادن غير المعالجة التي قد تتآكل. يجب إغلاق العبوات بإحكام. يجب تجنب التعرض للحرارة والصقيع الشديد.

العمر الافتراضي للمنتج هو سنتان من تاريخ التعبئة في العبوات الأصلية غير المفتوحة عند درجة حرارة 10 إلى 40 درجة مئوية. يجب إغلاق العبوات بإحكام.'
    ELSE storing_conditions_ar
  END,
  notice_ar = CASE 
    WHEN notice LIKE '%information in this data sheet%' 
    THEN 'المعلومات الواردة في صحيفة البيانات هذه وفي جميع صحائف البيانات لدينا مقدمة على أساس أفضل معرفتنا بناءً على الاختبارات المخبرية والخبرة العملية. تعتمد النتائج النهائية على اتباع التعليمات ومهارة المستهلك. تقتصر مسؤوليتنا على توفير منتجات تتوافق مع العينات والمواصفات المتفق عليها.'
    ELSE notice_ar
  END
WHERE storing_conditions IS NOT NULL OR notice IS NOT NULL;