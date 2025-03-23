import React from 'react';
import { Link } from 'react-router-dom';
import { Paintbrush, Palette } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your space with our professional painting services and expert color consulting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Painting Services Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <Paintbrush className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Painting Services
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Professional painting services tailored to your needs. Choose your location,
                  paint type, and service package for a perfect finish.
                </p>
                <Link
                  to="/services/painting"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book a Service
                </Link>
              </div>
            </div>

            {/* Color Consulting Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <Palette className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Color Consulting
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Explore our color guide and get expert advice on choosing the perfect
                  colors for your space and style.
                </p>
                <Link
                  to="/services/colors"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Colors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}