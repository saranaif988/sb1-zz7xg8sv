/*/import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, Shield } from 'lucide-react';

const categories = [
  {
    id: 'interior',
    name: 'Interior Paint',
    description: 'Premium paints for beautiful interior spaces',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070',
    link: '/products?category=interior'
  },
  {
    id: 'exterior',
    name: 'Exterior Paint',
    description: 'Durable solutions for lasting protection',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1560170412-0f7df0eb0fb1?q=80&w=2070',
    link: '/products?category=exterior'
  },
  {
    id: 'insulation',
    name: 'Insulation Products',
    description: 'Advanced thermal and moisture protection',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070',
    link: '/products?category=insulation'
  }
];

export default function ProductCategories() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mx-16 mb-16">
            <p className="text-sm uppercase tracking-widest  text-blue-600  mb-4">EXPLORE OUR COLLECTION</p>
            <h2 className="text-4xl mb-6">Our Products</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Discover our comprehensive range of high-quality paint solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-6 w-6" />
                        <h3 className="text-xl tracking-wide">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-6">{category.description}</p>
                    <Link
                      to={category.link}
                      className="inline-flex items-center text-primary border-b-2 border-secondary pb-1 transition-all group-hover:border-primary"
                    >
                      View Products
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}*/}