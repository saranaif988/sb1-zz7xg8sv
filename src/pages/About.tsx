import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Leaf, HeartHandshake, Lightbulb, Award, Users, Palette, Recycle } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const coreValues = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise on the quality of our products, ensuring the best results for every project.'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Our commitment to environmental responsibility drives us to develop sustainable paint solutions.'
    },
    {
      icon: HeartHandshake,
      title: 'Customer Focus',
      description: 'We put our customers at the heart of everything we do, providing exceptional service and support.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuous research and development to bring you the latest in paint technology.'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Our paints are formulated with the finest ingredients to ensure superior coverage and durability.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our team of color consultants and technical experts is always ready to assist you.'
    },
    {
      icon: Palette,
      title: 'Color Excellence',
      description: 'Extensive color range with perfect color matching capabilities.'
    },
    {
      icon: Recycle,
      title: 'Sustainable Practice',
      description: 'Environmentally conscious manufacturing processes and eco-friendly products.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[672px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://ueaiiwmblxyqsflvnzir.supabase.co/storage/v1/object/public/image//decor2.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="md:text-5xl text-4xl font-bold text-white tracking-wide mb-4">
              {t('about.title')}
            </h1>
            <p className="text-normal text-white opacity-90">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-wide text-[#233054] mb-6">{t('about.story.title')}</h2>
            <p className="font-normal text-gray-600 mb-6">
              {t('about.story.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8  shadow-lg">
              <h3 className="text-2xl font-bold text-[#233054] tracking-wide mb-4">{t('about.vision.title')}</h3>
              <p className="font-normal text-gray-600">
                {t('about.vision.content')}
              </p>
            </div>
            <div className="bg-white p-8  shadow-lg">
              <h3 className="text-2xl font-bold text-[#233054] tracking-wide mb-4">{t('about.mission.title')}</h3>
              <p className="font-normal text-gray-600">
                {t('about.mission.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2b4796] tracking-wide text-center mb-12">
            {t('about.whyChooseUs.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300 group hover:bg-[#233054]">
              <Award className="h-12 w-12 text-[#2b4796] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
              <h3 className="text-xl font-bold text-[#233054] tracking-wide mb-2 transition-colors duration-300 group-hover:text-white">
                {t('about.whyChooseUs.items.quality.title')}
              </h3>
              <p className="font-light text-gray-600 transition-colors duration-300 group-hover:text-white/90">
                {t('about.whyChooseUs.items.quality.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300 group hover:bg-[#233054]">
              <Users className="h-12 w-12 text-[#2b4796] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
              <h3 className="text-xl font-bold text-[#233054] tracking-wide mb-2 transition-colors duration-300 group-hover:text-white">
                {t('about.whyChooseUs.items.support.title')}
              </h3>
              <p className="font-light text-gray-600 transition-colors duration-300 group-hover:text-white/90">
                {t('about.whyChooseUs.items.support.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300 group hover:bg-[#233054]">
              <Palette className="h-12 w-12 text-[#2b4796] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
              <h3 className="text-xl font-bold text-[#233054] tracking-wide mb-2 transition-colors duration-300 group-hover:text-white">
                {t('about.whyChooseUs.items.colors.title')}
              </h3>
              <p className="font-light text-gray-600 transition-colors duration-300 group-hover:text-white/90">
                {t('about.whyChooseUs.items.colors.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300 group hover:bg-[#233054]">
              <Recycle className="h-12 w-12 text-[#2b4796] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
              <h3 className="text-xl font-bold text-[#233054] tracking-wide mb-2 transition-colors duration-300 group-hover:text-white">
                {t('about.whyChooseUs.items.sustainable.title')}
              </h3>
              <p className="font-light text-gray-600 transition-colors duration-300 group-hover:text-white/90">
                {t('about.whyChooseUs.items.sustainable.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}