import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { HeroSlide, MediaSlide } from '../../types';

export default function HeroSlider() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: MediaSlide[] = [
    {
      type: 'video',
      url: 'https://videos.pexels.com/video-files/6474258/6474258-uhd_2560_1440_25fps.mp4',
      title: t('hero.slides.first.title'),
      description: t('hero.slides.first.description'),
      ctaText: t('hero.slides.first.ctaText'),
      ctaLink: '/products'
    },
    {
      type: 'image',
      image: 'https://ueaiiwmblxyqsflvnzir.supabase.co/storage/v1/object/public/image//decor1.jpg',
      title: t('hero.slides.second.title'),
      description: t('hero.slides.second.description'),
      ctaText: t('hero.slides.second.ctaText'),
      ctaLink: '/about'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen min-h-[672px] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0">
            {slide.type === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover scale-[1.02]"
              >
                <source src={slide.url} type="video/mp4" />
              </video>
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4 pt-16">
  <div className="max-w-3xl">
    {/* العناوين */}
    <h1 className="text-3xl  text-white font-bold mb-6 transition-opacity duration-1000">
      {slide.title}
    </h1>
    <p className="text-2xl  text-white font-light tracking-wide mb-10 transition-opacity duration-1000">
      {slide.description}
    </p>
    
    <Link
      to={slide.ctaLink}
      className="inline-flex items-center bg-[#233054] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#2b4796] transition-all duration-300 hover:scale-105 group opacity-100"
    >
      <span>{slide.ctaText}</span>
      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
</div>
          </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all  z-10"
      >
        <ChevronLeft className="h-6 w-6 z-10 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all  z-10"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}