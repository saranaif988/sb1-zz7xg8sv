import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import ProductDetailsNew from './pages/ProductDetailsNew';
import ProductsNew from './pages/ProductsNew';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Login from './pages/Login';
import ReferenceData from './pages/admin/ReferenceData';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ProductForm from './pages/admin/ProductForm';
import FAQsAdmin from './pages/admin/FAQsAdmin';
import { supabase } from './lib/supabase';
import PaintingService from './pages/services/PaintingService';
import ColorConsulting from './pages/services/ColorConsulting';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.refreshSession();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    initAuth();
  }, []);

  return (
    <LanguageProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id/edit" element={<ProductForm />} />
                <Route path="faqs" element={<FAQsAdmin />} />
                <Route path="reference-data" element={<ReferenceData />} />
              </Routes>
            </AdminLayout>
          } />

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="products" element={<ProductsNew />} />
                  <Route path="products/:id" element={<ProductDetailsNew />} />
                  <Route path="about" element={<About />} />
                  <Route path="login" element={<Login />} />
                  <Route path="services/painting" element={<PaintingService />} />
                  <Route path="services/colors" element={<ColorConsulting />} />
                </Routes>
                <Footer />
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App