import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Palette, Droplet, Lightbulb, Phone } from "lucide-react";

export default function ColorConsulting() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold text-white tracking-wide mb-4">
              Color Consulting Services
            </h1>
            <p className="text-xl text-white opacity-90">
              Expert guidance to help you choose the perfect colors for your
              space
            </p>
          </div>
        </div>
      </div>

      {/* Service Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-wide text-[#233054] mb-6">
              Transform Your Space with Professional Color Consulting
            </h2>
            <p className="text-gray-600">
              Our color consulting service helps you select the perfect color
              palette for your home or business, ensuring harmony, balance, and
              the right mood for each space.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Palette className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Expert Color Selection
              </h3>
              <p className="text-gray-600">
                Our color consultants have extensive knowledge of color theory
                and current trends to help you make the perfect choice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Droplet className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Personalized Palettes
              </h3>
              <p className="text-gray-600">
                We create custom color schemes tailored to your space, lighting
                conditions, and personal preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Lightbulb className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Visualization Tools
              </h3>
              <p className="text-gray-600">
                See how different colors will look in your space before making a
                final decision with our digital visualization tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#233054] text-center mb-12">
            Our Color Consulting Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start mb-12">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Initial Consultation
                </h3>
                <p className="text-gray-600">
                  We begin with a thorough discussion about your preferences,
                  the function of each space, existing furnishings, and your
                  overall vision. This can be done in-person or virtually.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start mb-12">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Color Assessment
                </h3>
                <p className="text-gray-600">
                  Our consultants evaluate your space's lighting, architecture,
                  and existing elements to determine which colors will work best
                  in your environment.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start mb-12">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Palette Development
                </h3>
                <p className="text-gray-600">
                  We create a customized color palette that harmonizes with your
                  space and meets your aesthetic goals, including primary colors
                  and accent recommendations.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Implementation Support
                </h3>
                <p className="text-gray-600">
                  We provide detailed recommendations for specific Decor Paint
                  products, finishes, and application techniques to achieve your
                  desired look.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#233054] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a color consultation with our experts and discover the
            perfect palette for your home or business.
          </p>
          <div className="flex items-center justify-center">
            <Phone className="h-6 w-6 mr-2" />
            <span className="text-xl font-medium">Call us at: 0930429893</span>
          </div>
        </div>
      </section>
    </div>
  );
}
