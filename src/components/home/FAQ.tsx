import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqService } from '../../lib/faqService';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Database } from '../../types/supabase'; 

type FAQ = Database['public']['Tables']['faqs']['Row'];

export default function FAQ() {
  const { t, language } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get localized content based on current language
  const getLocalizedContent = (faq: FAQ, field: 'question' | 'answer') => {
    if (language === 'ar' && faq[`${field}_ar`]) {
      return faq[`${field}_ar`];
    }
    return faq[field];
  };

  useEffect(() => {
    fetchFAQs();
  }, [language]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await faqService.getPublishedFAQs();
      setFaqs(data);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#2b4796] mb-4">{t('faq.helpfulInfo')}</p>
            <h2 className="text-4xl font-bold text-[#233054] mb-6">
              {t('faq.title')}
            </h2>
            <p className="text-lg">
              {t('faq.subtitle')}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#233054]" />
              <span className="sr-only">{t('faq.loadingFaqs')}</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              {t('faq.errorLoading')}
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t('faq.noFaqs')}
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span className="text-lg font-bold">
                      {getLocalizedContent(faq, 'question')}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-secondary transition-transform ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      >
                        <div className="px-6 pb-4 font-light">
                          {getLocalizedContent(faq, 'answer')}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}