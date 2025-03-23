import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative order-2 md:order-1">
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src="https://ueaiiwmblxyqsflvnzir.supabase.co/storage/v1/object/public/image//decore3.jpg"
                alt={t('story.title')}
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>

          <div className="space-y-8 order-1 md:order-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#2b4796] mb-4">{t('story.subtitle')}</p>
              <h2 className="text-4xl font-bold text-[#233054] tracking-wide">{t('story.title')}</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-[#4A4A4A] leading-relaxed font-light">
                {t('story.description')}
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed font-light">
                {t('story.journey')}
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center text-[#2C2C2C] group mt-8"
            >
              <span className="text-lg tracking-wide border-b-2 border-[#2b4796]  pb-1 transition-all group-hover:border-[#233054]">
                {t('story.heritage')}
              </span>
              <ArrowUpRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}