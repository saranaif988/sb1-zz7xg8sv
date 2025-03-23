/*
  # Fix untranslated FAQ entry

  1. Changes
    - Update the last FAQ entry to include proper Arabic translations
    - Ensure consistent formatting with other FAQ entries
*/

UPDATE faqs
SET
  question_ar = 'ما هو الفرق بين الدهانات الزيتية والمائية؟',
  answer_ar = 'الدهانات الزيتية أكثر متانة ومقاومة للماء، لكنها تحتاج وقتاً أطول للجفاف وتصدر روائح قوية. الدهانات المائية سريعة الجفاف، قليلة الرائحة، وسهلة التنظيف، لكنها قد تكون أقل متانة.'
WHERE 
  question LIKE '%What''s the difference between oil%'
  AND (
    question_ar LIKE '%نسخة عربية%'
    OR question_ar LIKE '%What''s the difference%'
    OR answer_ar LIKE '%Oil based paints%'
  );