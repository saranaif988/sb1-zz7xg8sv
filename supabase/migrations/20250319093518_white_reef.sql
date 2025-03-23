/*
  # Fix Arabic product descriptions

  1. Changes
    - Update description_ar field with proper Arabic translations
    - Remove English text from Arabic descriptions
    - Maintain consistent translation style
*/

UPDATE products
SET description_ar = CASE 
    WHEN description LIKE '%High quality, air drying topcoat%'
    THEN 'طلاء نهائي عالي الجودة يجف بالهواء، مثالي للاستخدام الداخلي والخارجي. يوفر حماية ممتازة وتشطيباً جمالياً متميزاً.'
    
    WHEN description LIKE '%SilkCoat is a water acrylic emulsion%'
    THEN 'سيلك كوت هو مستحلب أكريليك مائي يمنح تشطيباً حريرياً أنيقاً. مثالي للجدران الداخلية ويوفر تغطية ممتازة مع مقاومة للغسيل.'
    
    WHEN description LIKE '%Highly flexible water based acrylic%'
    THEN 'طلاء أكريليك مائي عالي المرونة، يوفر حماية متميزة ضد العوامل الجوية. مثالي للأسطح الخارجية ويتميز بمقاومة ممتازة للماء.'
    
    WHEN description LIKE '%Water based acrylic (latex) floor%'
    THEN 'طلاء أرضيات أكريليك (لاتكس) مائي، يوفر تشطيباً متيناً ومقاوماً للاحتكاك. مثالي للأرضيات الداخلية والخارجية.'
    
    WHEN description LIKE '%Passepartout is a water-base putty%'
    THEN 'باسبارتو معجون مائي عالي الجودة، سهل التطبيق ويوفر سطحاً ناعماً مثالياً. مناسب للاستخدام الداخلي والخارجي.'
    
    WHEN description LIKE '%EcoBase is a water-based acrylic%'
    THEN 'إيكوبيس أساس أكريليك مائي صديق للبيئة، يوفر قاعدة ممتازة للطبقات النهائية. يتميز بقوة التصاق عالية وتغطية جيدة.'
    
    WHEN description LIKE '%Slow drying water-base decorative%'
    THEN 'طلاء ديكوري مائي بطيء الجفاف، يمنح تأثيرات زخرفية فريدة. مثالي للتشطيبات الديكورية الداخلية المميزة.'
    
    WHEN description LIKE '%Semi-Gloss Finish is a water emulsion%'
    THEN 'تشطيب نصف لامع هو مستحلب مائي يوفر لمعاناً معتدلاً وجمالياً. مثالي للجدران الداخلية ويتميز بسهولة التنظيف.'
    
    WHEN description LIKE '%Water based acrylic (latex) texture%'
    THEN 'طلاء أكريليك (لاتكس) مائي ذو ملمس خاص، يوفر تشطيباً فريداً ومميزاً. مثالي للجدران الداخلية والخارجية.'
    
    ELSE description_ar
END
WHERE description IS NOT NULL;