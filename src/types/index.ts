export interface Brand {
  id: string
  name: string;
  logo: string | null;
  url: string | null;
  created_at: string | null;
}

export interface Statistic {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

interface BaseSlide {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface VideoSlide extends BaseSlide {
  type: 'video';
  url: string;
}

interface ImageSlide extends BaseSlide {
  type: 'image';
  image: string;
}

export type MediaSlide = VideoSlide | ImageSlide;