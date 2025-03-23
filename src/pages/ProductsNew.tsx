import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, ChevronDown, ArrowRight, X } from 'lucide-react';
import { fetchProducts } from '../lib/productUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase'; 

type Product = Database['public']['Tables']['products']['Row'];
type ApplicationField = Database['public']['Tables']['application_fields']['Row'];
type SurfaceType = Database['public']['Tables']['surface_types']['Row'];

const ITEMS_PER_PAGE = 12;

const glossTypes = [
  { id: 'matte', name: 'Matte' },
  { id: 'silk', name: 'Silk' },
  { id: 'gloss', name: 'Gloss' },
  { id: 'semi-gloss', name: 'Semi-Gloss' },
  { id: 'eggshell', name: 'Eggshell' }
];

const colorOptions = [
  { id: 'white', name: 'White' },
  { id: 'beige', name: 'Beige' },
  { id: 'gray', name: 'Gray' },
  { id: 'blue', name: 'Blue' },
  { id: 'green', name: 'Green' },
  { id: 'yellow', name: 'Yellow' },
  { id: 'red', name: 'Red' }
];

interface FilterCategories {
  applicationFields: ApplicationField[];
  surfaceTypes: SurfaceType[];
  colors: typeof colorOptions;
  gloss: typeof glossTypes;
};

function ProductsNew() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategories, setFilterCategories] = useState<FilterCategories>({
    applicationFields: [],
    surfaceTypes: [],
    colors: colorOptions,
    gloss: glossTypes
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    application_fields: [],
    surface_types: [],
    color: [],
    gloss: []
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    applicationFields: true,
    surfaceTypes: true,
    colors: true,
    gloss: true
  });

  useEffect(() => {
    fetchFilterData();
    fetchProductsData();
  }, [activeFilters, searchQuery, currentPage, language]);

  const fetchFilterData = async () => {
    try {
      const [
        { data: applicationFieldsData },
        { data: surfaceTypesData }
      ] = await Promise.all([
        supabase.from('application_fields').select('*').order('name'),
        supabase.from('surface_types').select('*').order('name')
      ]);

      setFilterCategories(prev => ({
        ...prev,
        applicationFields: applicationFieldsData || [],
        surfaceTypes: surfaceTypesData || []
      }));
    } catch (err) {
      console.error('Error fetching filter data:', err);
    }
  };

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const filterOptions = {
        filters: {
          ...activeFilters,
          search: searchQuery
        },
        limit: ITEMS_PER_PAGE,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        orderBy: { column: 'created_at', ascending: false }
      };

      console.log("Fetching with options:", filterOptions);
      
      const { data, count } = await fetchProducts(language, filterOptions);
      
      setProducts(data || []);
      setTotalProducts(count || 0);
      
      // Log results to debug
      console.log(`Fetched ${data?.length || 0} products out of ${count || 0} total`);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Map UI category names to database column names
  const getCategoryDbColumn = (uiCategory: string): string => {
    switch(uiCategory) {
      case 'applicationFields': return 'application_fields';
      case 'surfaceTypes': return 'surface_types';
      case 'colors': return 'color'; // Map colors UI category to color database column
      default: return uiCategory;
    }
  };

  const toggleFilter = (category: string, value: string) => {
    const dbColumn = getCategoryDbColumn(category);
    setActiveFilters(prev => ({
      ...prev,
      [dbColumn]: prev[dbColumn].includes(value)
        ? prev[dbColumn].filter(v => v !== value)
        : [...prev[dbColumn], value]
    }));
    setCurrentPage(1);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      application_fields: [],
      surface_types: [],
      color: [],
      gloss: []
    });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const FilterSection = ({ title, category, options }: { title: string; category: string; options: { id: string; name: string }[] }) => {
    const dbColumn = getCategoryDbColumn(category);
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleSection(category)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              expandedSections[category] ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections[category] && (
          <div className="mt-2 space-y-1">
            {options.map(option => (
              <label key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeFilters[dbColumn].includes(option.id)}
                  onChange={() => toggleFilter(category, option.id)}
                  className="h-4 w-4 rounded border-gray-300 text-[#233054] focus:ring-[#233054]"
                />
                <span className="ml-2 text-sm text-gray-600">{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="container max-w-7xl border-b mx-auto mt-6 pt-12 px-4 ">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold   text-[#233054]">{t('products.title')}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center px-4 py-2 border border-[#9A8A78] rounded-lg text-[#2C2C2C]"
              >
                <Filter className="h-5 w-5 mr-2" />
                {t('common.filters')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder={t('products.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#233054] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#2C2C2C]">{t('common.filters')}</h2>
                {Object.values(activeFilters).some(arr => arr.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#233054] hover:text-[#cc006f]"
                  >
                    {t('common.clearAll')}
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <FilterSection 
                  title={t('products.filters.applicationFields')} 
                  category="applicationFields" 
                  options={filterCategories.applicationFields} 
                />
                <FilterSection 
                  title={t('products.filters.surfaceTypes')} 
                  category="surfaceTypes" 
                  options={filterCategories.surfaceTypes} 
                />
                <FilterSection 
                  title={t('products.filters.colors')} 
                  category="colors" 
                  options={filterCategories.colors} 
                />
                <FilterSection 
                  title={t('products.filters.gloss')} 
                  category="gloss" 
                  options={filterCategories.gloss} 
                />
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
              <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">
                <div className="p-6 h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#233054]">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  {/* Search Bar in Mobile Menu */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <FilterSection 
                      title="Application Fields" 
                      category="applicationFields" 
                      options={filterCategories.applicationFields} 
                    />
                    <FilterSection 
                      title="Surface Types" 
                      category="surfaceTypes" 
                      options={filterCategories.surfaceTypes} 
                    />
                    <FilterSection 
                      title="Colors" 
                      category="colors" 
                      options={filterCategories.colors} 
                    />
                    <FilterSection 
                      title="Gloss" 
                      category="gloss" 
                      options={filterCategories.gloss} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">
                  <span className="sr-only">{t('common.loading')}</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{t('common.error')}</p>
                <button
                  onClick={fetchProductsData}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  {t('common.tryAgain')}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                    >
                      <div className="relative aspect-square w-full bg-gray-100">
                        <img
                          src={product.image_url || 'https://ueaiiwmblxyqsflvnzir.supabase.co/storage/v1/object/public/image//decore4.jfif'}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 flex flex-col min-h-[200px]">
                        <h3 className="text-xl font-bold text-[#2C2C2C] group-hover:text-[#233054] transition-colors line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {product.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center ">
                          <span className="text-lg font-medium text-[#2C2C2C]">
                            ${product.price.toFixed(2)}
                          </span>
                         < div className="px-4 flex items-center">
                          <span className="text-sm text-[#233054]  font-light  group-hover:translate-x-1 transition-transform">
                            Learn More </span> 
                            <ArrowRight className="h-4 w-4 ml-2" />
                         
                           </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{t('common.noResults')}</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-[#233054] text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsNew;