/*
  # Fix FAQ Arabic translations

  1. Changes
    - Update question_ar and answer_ar fields with proper Arabic translations
    - Remove "نسخة عربية" prefixes
    - Ensure consistent translation style
*/

UPDATE faqs
SET
  question_ar = CASE 
    WHEN question LIKE '%When do I need to apply a primer%'
    THEN 'متى أحتاج إلى استخدام البرايمر (الأساس)؟'
    
    WHEN question LIKE '%What paint is suitable for masonry%'
    THEN 'ما هو الدهان المناسب للجدران الإسمنتية؟'
    
    WHEN question LIKE '%How do I fix cracks in walls%'
    THEN 'كيف يمكنني إصلاح الشقوق في الجدران قبل الدهان؟'
    
    WHEN question LIKE '%What paint is suitable for masonry surfaces%'
    THEN 'ما هو الدهان المناسب للأسطح الإسمنتية؟'
    
    WHEN question LIKE '%Can I apply paint over existing paint%'
    THEN 'هل يمكنني وضع دهان فوق دهان موجود مسبقاً؟'
    
    WHEN question LIKE '%What''s the difference between oil%'
    THEN 'ما هو الفرق بين الدهانات الزيتية والمائية؟'
    
    ELSE question_ar
  END,
  
  answer_ar = CASE 
    WHEN question LIKE '%When do I need to apply a primer%'
    THEN 'يجب استخدام البرايمر على الأسطح الجديدة أو المسامية أو عند تغيير نوع الدهان بشكل كبير. البرايمر يحسن التصاق الدهان ويوفر تغطية أفضل.'
    
    WHEN question LIKE '%What paint is suitable for masonry%'
    THEN 'للجدران الإسمنتية، يُنصح باستخدام دهانات الأكريليك المائية المخصصة للأسطح الخارجية. هذه الدهانات مقاومة للعوامل الجوية وتسمح للجدران بالتنفس.'
    
    WHEN question LIKE '%How do I fix cracks in walls%'
    THEN 'قم بتوسيع الشقوق قليلاً، ثم نظفها من الغبار والأوساخ. املأ الشقوق باستخدام معجون مناسب، واتركه يجف تماماً. قم بصنفرة السطح للحصول على نتيجة ناعمة قبل الدهان.'
    
    WHEN question LIKE '%What paint is suitable for masonry surfaces%'
    THEN 'استخدم دهانات الأكريليك المائية المخصصة للأسطح الخارجية. هذه الدهانات توفر حماية جيدة ضد العوامل الجوية مع السماح للسطح بالتنفس.'
    
    WHEN question LIKE '%Can I apply paint over existing paint%'
    THEN 'نعم، يمكنك الدهان فوق طبقة دهان موجودة، لكن يجب أولاً التأكد من أن السطح نظيف وجاف وخالٍ من التقشر. قد تحتاج إلى صنفرة خفيفة للحصول على سطح مناسب.'
    
    WHEN question LIKE '%What''s the difference between oil%'
    THEN 'الدهانات الزيتية أكثر متانة ومقاومة للماء، لكنها تحتاج وقتاً أطول للجفاف وتصدر روائح قوية. الدهانات المائية سريعة الجفاف، قليلة الرائحة، وسهلة التنظيف، لكنها قد تكون أقل متانة.'
    
    ELSE answer_ar
  END
WHERE question_ar LIKE '%نسخة عربية%' OR answer_ar LIKE '%نسخة عربية%';