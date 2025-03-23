/*
  # Add bilingual FAQ entries

  1. Changes
    - Insert FAQ entries with both English and Arabic translations
    - Ensure proper ordering of FAQs
    - Set all FAQs as published by default

  2. Content
    - Common questions about paint products and applications
    - Full Arabic translations for all content
*/

INSERT INTO faqs (question, answer, question_ar, answer_ar, category, "order", is_published) 
VALUES 
  (
    'When do I need to apply a primer?',
    'A primer should be used on new surfaces, porous surfaces, or when making significant color changes. Primers improve paint adhesion and provide better coverage.',
    'متى أحتاج إلى استخدام البرايمر (الأساس)؟',
    'يجب استخدام البرايمر على الأسطح الجديدة أو المسامية أو عند تغيير نوع الدهان بشكل كبير. البرايمر يحسن التصاق الدهان ويوفر تغطية أفضل.',
    'Application',
    1,
    true
  ),
  (
    'What paint is suitable for masonry surfaces?',
    'For masonry surfaces, use exterior-grade acrylic paints. These paints provide good weather resistance while allowing the surface to breathe.',
    'ما هو الدهان المناسب للأسطح الإسمنتية؟',
    'للجدران الإسمنتية، يُنصح باستخدام دهانات الأكريليك المائية المخصصة للأسطح الخارجية. هذه الدهانات مقاومة للعوامل الجوية وتسمح للجدران بالتنفس.',
    'Products',
    2,
    true
  ),
  (
    'How do I fix cracks in walls before painting?',
    'Widen the crack slightly, clean out any debris, fill with appropriate filler, allow to dry completely, and sand smooth before painting.',
    'كيف يمكنني إصلاح الشقوق في الجدران قبل الدهان؟',
    'قم بتوسيع الشقوق قليلاً، ثم نظفها من الغبار والأوساخ. املأ الشقوق باستخدام معجون مناسب، واتركه يجف تماماً. قم بصنفرة السطح للحصول على نتيجة ناعمة قبل الدهان.',
    'Surface Preparation',
    3,
    true
  ),
  (
    'Can I apply paint over existing paint?',
    'Yes, you can paint over existing paint, but first ensure the surface is clean, dry, and free from peeling. Light sanding may be needed for proper adhesion.',
    'هل يمكنني وضع دهان فوق دهان موجود مسبقاً؟',
    'نعم، يمكنك الدهان فوق طبقة دهان موجودة، لكن يجب أولاً التأكد من أن السطح نظيف وجاف وخالٍ من التقشر. قد تحتاج إلى صنفرة خفيفة للحصول على سطح مناسب.',
    'Application',
    4,
    true
  ),
  (
    'What''s the difference between oil-based and water-based paints?',
    'Oil-based paints are more durable and water-resistant but take longer to dry and have strong odors. Water-based paints dry faster, have low odor, and are easier to clean up but may be less durable.',
    'ما هو الفرق بين الدهانات الزيتية والمائية؟',
    'الدهانات الزيتية أكثر متانة ومقاومة للماء، لكنها تحتاج وقتاً أطول للجفاف وتصدر روائح قوية. الدهانات المائية سريعة الجفاف، قليلة الرائحة، وسهلة التنظيف، لكنها قد تكون أقل متانة.',
    'Products',
    5,
    true
  );