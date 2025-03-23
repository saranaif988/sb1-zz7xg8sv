/*
  # Add Arabic translations for application temperatures and related fields

  1. Changes
    - Add Arabic translations for application temperatures
    - Ensure consistent temperature format in Arabic
    - Update related application notes
*/

-- Update application_temperatures_ar for temperature ranges
UPDATE products
SET application_temperatures_ar = CASE 
    WHEN application_temperatures LIKE '%10-40°C%' OR application_temperatures LIKE '%10-40 C%'
    THEN 'يفضل التطبيق عند درجة حرارة بين 10 إلى 40 درجة مئوية'
    WHEN application_temperatures LIKE '%10-30 C%' OR application_temperatures LIKE '%10-30°C%'
    THEN 'يفضل التطبيق عند درجة حرارة بين 10 إلى 30 درجة مئوية'
    WHEN application_temperatures LIKE '%10-35°C%' OR application_temperatures LIKE '%10-35 C%'
    THEN 'يفضل التطبيق عند درجة حرارة بين 10 إلى 35 درجة مئوية'
    ELSE application_temperatures_ar
END
WHERE application_temperatures IS NOT NULL;

-- Update application_note_ar for temperature-related notes
UPDATE products
SET application_note_ar = CASE
    WHEN application_note LIKE '%When applying another coat%'
    THEN 'عند تطبيق طبقة إضافية، يجب مراعاة وقت الجفاف المناسب'
    WHEN application_note LIKE '%When recoating, a special attention%'
    THEN 'عند إعادة الطلاء، يجب إيلاء اهتمام خاص لتجنب التعرض المباشر لأشعة الشمس'
    WHEN application_note LIKE '%coating the other side%'
    THEN 'عند طلاء الجانب الآخر، يجب الانتظار حتى يجف الطلاء تماماً'
    ELSE application_note_ar
END
WHERE application_note IS NOT NULL;

-- Update storing_conditions_ar for temperature-related storage conditions
UPDATE products
SET storing_conditions_ar = CASE
    WHEN storing_conditions LIKE '%Silk Coat should not be exposed%'
    THEN 'يجب عدم تعريض سيلك كوت لأشعة الشمس المباشرة'
    WHEN storing_conditions LIKE '%Semi-gloss finish should not be exposed%'
    THEN 'يجب عدم تعريض الطلاء نصف اللامع لأشعة الشمس المباشرة'
    WHEN storing_conditions LIKE '%Passepartout should not be exposed%'
    THEN 'يجب عدم تعريض باسبارتو لأشعة الشمس المباشرة'
    WHEN storing_conditions LIKE '%EcoBase coating should not come into contact%'
    THEN 'يجب عدم تعريض طلاء إيكوبيس للتلامس المباشر مع الماء قبل الجفاف التام'
    ELSE storing_conditions_ar
END
WHERE storing_conditions IS NOT NULL;

-- Update notice_ar for temperature-related warnings
UPDATE products
SET notice_ar = CASE
    WHEN notice LIKE '%temperature and humidity%'
    THEN 'يتأثر وقت الجفاف بدرجة الحرارة والرطوبة وحركة الهواء'
    WHEN notice LIKE '%ambient conditions%'
    THEN 'تعتمد أوقات الجفاف على الظروف المحيطة مثل درجة الحرارة والرطوبة'
    ELSE notice_ar
END
WHERE notice IS NOT NULL;