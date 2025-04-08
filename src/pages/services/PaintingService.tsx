import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Brush, CheckCircle, Clock, Users, Phone } from "lucide-react";

export default function PaintingService() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold text-white tracking-wide mb-4">
              Professional Painting Services
            </h1>
            <p className="text-xl text-white opacity-90">
              Expert painting solutions for residential and commercial spaces
            </p>
          </div>
        </div>
      </div>

      {/* Service Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-wide text-[#233054] mb-6">
              Premium Painting Services by Decor
            </h2>
            <p className="text-gray-600">
              Our team of skilled professionals delivers exceptional painting
              services for both interior and exterior projects. We combine
              quality products with expert craftsmanship to transform your
              spaces.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Brush className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Interior Painting
              </h3>
              <p className="text-gray-600">
                Transform your indoor spaces with our premium interior painting
                services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Brush className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Exterior Painting
              </h3>
              <p className="text-gray-600">
                Enhance your property's curb appeal with our durable exterior
                painting solutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Brush className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Commercial Painting
              </h3>
              <p className="text-gray-600">
                Professional painting services for offices, retail spaces, and
                commercial buildings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Brush className="h-12 w-12 text-[#2b4796] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#233054] mb-3">
                Specialty Finishes
              </h3>
              <p className="text-gray-600">
                Custom decorative finishes, textures, and specialty coatings for
                unique spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#233054] text-center mb-12">
            Why Choose Our Painting Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[#2b4796] mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-2">
                  Premium Quality Products
                </h3>
                <p className="text-gray-600">
                  We use only the highest quality Decor paints and materials for
                  superior results and longevity.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Users className="h-6 w-6 text-[#2b4796] mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-2">
                  Experienced Professionals
                </h3>
                <p className="text-gray-600">
                  Our team consists of skilled painters with years of experience
                  in residential and commercial projects.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-6 w-6 text-[#2b4796] mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-2">
                  Timely Completion
                </h3>
                <p className="text-gray-600">
                  We value your time and ensure that projects are completed
                  efficiently without compromising quality.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[#2b4796] mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-2">
                  Meticulous Preparation
                </h3>
                <p className="text-gray-600">
                  We take the time to properly prepare surfaces, ensuring a
                  flawless finish and long-lasting results.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[#2b4796] mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-2">
                  Clean and Tidy Work
                </h3>
                <p className="text-gray-600">
                  Our team takes great care to protect your property and clean
                  up thoroughly after project completion.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[#2b4796] mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-2">
                  Satisfaction Guaranteed
                </h3>
                <p className="text-gray-600">
                  We stand behind our work with a satisfaction guarantee,
                  ensuring you're completely happy with the results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#233054] text-center mb-12">
            Our Painting Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start mb-12">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Consultation & Assessment
                </h3>
                <p className="text-gray-600">
                  We begin with a thorough consultation to understand your
                  needs, preferences, and project requirements.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start mb-12">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Surface Preparation
                </h3>
                <p className="text-gray-600">
                  We carefully prepare all surfaces, including cleaning,
                  sanding, patching, and priming to ensure optimal paint
                  adhesion.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start mb-12">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Professional Application
                </h3>
                <p className="text-gray-600">
                  Our skilled painters apply premium Decor paints using
                  professional techniques to achieve a flawless finish.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-[#2b4796] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 md:mr-6 mx-auto md:mx-0 mb-4 md:mb-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#233054] mb-3 text-center md:text-left">
                  Final Inspection & Cleanup
                </h3>
                <p className="text-gray-600">
                  We conduct a thorough inspection to ensure quality standards
                  are met, followed by a complete cleanup of the work area.
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
            Contact us today to schedule a consultation and get a free estimate
            for your painting project.
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
