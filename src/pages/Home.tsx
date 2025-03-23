import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import OurStory from '../components/home/OurStory';
import ProductCategories from '../components/home/ProductCategories';
import FAQ from '../components/home/FAQ';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <OurStory />
      {/*<ProductCategories />*/}
      <FeaturedProducts />
      <FAQ />
      <ContactSection />
    </div>
  );
}