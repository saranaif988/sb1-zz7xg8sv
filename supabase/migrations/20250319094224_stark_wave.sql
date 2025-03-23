/*
  # Fix Arabic product descriptions

  1. Changes
    - Remove "نسخة عربية" prefix from description_ar field
    - Update descriptions with proper Arabic translations
    - Maintain consistent translation style
*/

UPDATE products
SET description_ar = CASE 
    WHEN description_ar LIKE '%High quality, air dryingtopcoat%' 
    OR description_ar LIKE '%نسخة عربية High quality%'
    THEN 'طلاء نهائي عالي الجودة يجف بالهواء، مثالي للاستخدام الداخلي والخارجي. يوفر حماية ممتازة وتشطيباً جمالياً متميزاً.'
    
    WHEN description_ar LIKE '%SilkCoat%' 
    OR description_ar LIKE '%نسخة عربية SilkCoat%'
    THEN 'سيلك كوت هو مستحلب أكريليك مائي يمنح تشطيباً حريرياً أنيقاً. مثالي للجدران الداخلية ويوفر تغطية ممتازة مع مقاومة للغسيل.'
    
    WHEN description_ar LIKE '%Highly flexible%' 
    OR description_ar LIKE '%نسخة عربية Highly flexible%'
    THEN 'طلاء أكريليك مائي عالي المرونة، يوفر حماية متميزة ضد العوامل الجوية. مثالي للأسطح الخارجية ويتميز بمقاومة ممتازة للماء.'
    
    WHEN description_ar LIKE '%Water based acrylic (latex) floor%' 
    OR description_ar LIKE '%نسخة عربية Water based%'
    THEN 'طلاء أرضيات أكريليك (لاتكس) مائي، يوفر تشطيباً متيناً ومقاوماً للاحتكاك. مثالي للأرضيات الداخلية والخارجية.'
    
    WHEN description_ar LIKE '%Passepartout%' 
    OR description_ar LIKE '%نسخة عربية Passepartout%'
    THEN 'باسبارتو معجون مائي عالي الجودة، سهل التطبيق ويوفر سطحاً ناعماً مثالياً. مناسب للاستخدام الداخلي والخارجي.'
    
    WHEN description_ar LIKE '%EcoBase%' 
    OR description_ar LIKE '%نسخة عربية EcoBase%'
    THEN 'إيكوبيس أساس أكريليك مائي صديق للبيئة، يوفر قاعدة ممتازة للطبقات النهائية. يتميز بقوة التصاق عالية وتغطية جيدة.'
    
    WHEN description_ar LIKE '%Slow drying%' 
    OR description_ar LIKE '%نسخة عربية Slow drying%'
    THEN 'طلاء ديكوري مائي بطيء الجفاف، يمنح تأثيرات زخرفية فريدة. مثالي للتشطيبات الديكورية الداخلية المميزة.'
    
    WHEN description_ar LIKE '%Semi-Gloss%' 
    OR description_ar LIKE '%نسخة عربية Semi-Gloss%'
    THEN 'تشطيب نصف لامع هو مستحلب مائي يوفر لمعاناً معتدلاً وجمالياً. مثالي للجدران الداخلية ويتميز بسهولة التنظيف.'
    
    WHEN description_ar LIKE '%Water based acrylic (latex) texture%' 
    OR description_ar LIKE '%نسخة عربية Water based acrylic%'
    THEN 'طلاء أكريليك (لاتكس) مائي ذو ملمس خاص، يوفر تشطيباً فريداً ومميزاً. مثالي للجدران الداخلية والخارجية.'
    
    ELSE description_ar
END
WHERE description_ar LIKE '%نسخة عربية%' OR description_ar LIKE '%High quality%' OR description_ar LIKE '%Water based%';