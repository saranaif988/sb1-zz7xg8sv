import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ColorScheme {
  name: string;
  colors: {
    hex: string;
    name: string;
  }[];
  description: string;
  recommendations: string[];
}

const colorSchemes: ColorScheme[] = [
  {
    name: 'Warm Neutrals',
    colors: [
      { hex: '#F5E6D3', name: 'Soft Cream' },
      { hex: '#E6D5C3', name: 'Warm Beige' },
      { hex: '#D4C4B7', name: 'Light Taupe' },
      { hex: '#C4B5A6', name: 'Warm Gray' },
    ],
    description: 'Create a cozy and inviting atmosphere with these warm neutral tones.',
    recommendations: [
      'Perfect for living rooms and bedrooms',
      'Pairs well with natural wood furniture',
      'Creates a welcoming entrance hall',
      'Ideal for open-plan living spaces',
    ],
  },
  {
    name: 'Cool Neutrals',
    colors: [
      { hex: '#E8E9EB', name: 'Pure Gray' },
      { hex: '#D9DCDF', name: 'Cool Gray' },
      { hex: '#C9CCD0', name: 'Stone Gray' },
      { hex: '#B8BCC1', name: 'Slate Gray' },
    ],
    description: 'Modern and sophisticated cool neutrals for a contemporary look.',
    recommendations: [
      'Excellent for home offices',
      'Creates a clean bathroom aesthetic',
      'Perfect for modern kitchens',
      'Works well in minimalist spaces',
    ],
  },
  {
    name: 'Coastal Blues',
    colors: [
      { hex: '#E6F3F7', name: 'Sea Foam' },
      { hex: '#C5E1E8', name: 'Ocean Mist' },
      { hex: '#A3CFD9', name: 'Coastal Blue' },
      { hex: '#82BDC9', name: 'Deep Sea' },
    ],
    description: 'Bring the calming essence of the ocean into your space.',
    recommendations: [
      'Perfect for bathrooms and spa-like spaces',
      'Creates a serene bedroom environment',
      'Great for coastal-themed rooms',
      'Pairs well with white trim',
    ],
  },
  {
    name: 'Natural Greens',
    colors: [
      { hex: '#E8F0E3', name: 'Soft Sage' },
      { hex: '#D5E3CC', name: 'Gentle Moss' },
      { hex: '#C2D6B6', name: 'Garden Green' },
      { hex: '#AFC99F', name: 'Fresh Leaf' },
    ],
    description: 'Bring the outdoors in with these refreshing green tones.',
    recommendations: [
      'Perfect for kitchens and dining areas',
      'Creates a refreshing bathroom atmosphere',
      'Ideal for rooms with plants',
      'Works well in sunrooms and conservatories',
    ],
  },
];

export default function ColorConsulting() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme | null>(null);

  const filteredSchemes = colorSchemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.colors.some(color => color.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Color Consulting
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for colors or schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Color Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Color Preview */}
                <div className="h-24 grid grid-cols-4">
                  {scheme.colors.map((color) => (
                    <div
                      key={color.hex}
                      className="h-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {scheme.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {scheme.description}
                  </p>

                  {/* Color Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {scheme.colors.map((color) => (
                      <div
                        key={color.hex}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className="w-6 h-6 rounded border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm text-gray-700">{color.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Perfect For:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {scheme.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}