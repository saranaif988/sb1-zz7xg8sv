import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { faqService } from '../../lib/faqService';
import type { Database } from '../../types/supabase';

type FAQ = Database['public']['Tables']['faqs']['Row'];

export default function FAQsAdmin() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await faqService.getAllFAQs();
      setFaqs(data);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingFaq) return;

    try {
      setLoading(true);
      setError(null);

      if (editingFaq.id) {
        await faqService.updateFAQ(editingFaq.id, editingFaq);
        setSuccess('FAQ updated successfully');
      } else {
        await faqService.createFAQ(editingFaq as Database['public']['Tables']['faqs']['Insert']);
        setSuccess('FAQ created successfully');
      }

      setEditingFaq(null);
      fetchFAQs();
    } catch (err) {
      console.error('Error saving FAQ:', err);
      setError('Failed to save FAQ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      setLoading(true);
      setError(null);
      await faqService.deleteFAQ(id);
      setSuccess('FAQ deleted successfully');
      fetchFAQs();
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      setError('Failed to delete FAQ');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    try {
      const faq = faqs[index];
      const prevFaq = faqs[index - 1];
      await Promise.all([
        faqService.updateFAQOrder(faq.id, prevFaq.order),
        faqService.updateFAQOrder(prevFaq.id, faq.order)
      ]);
      fetchFAQs();
    } catch (err) {
      console.error('Error reordering FAQ:', err);
      setError('Failed to reorder FAQ');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === faqs.length - 1) return;
    try {
      const faq = faqs[index];
      const nextFaq = faqs[index + 1];
      await Promise.all([
        faqService.updateFAQOrder(faq.id, nextFaq.order),
        faqService.updateFAQOrder(nextFaq.id, faq.order)
      ]);
      fetchFAQs();
    } catch (err) {
      console.error('Error reordering FAQ:', err);
      setError('Failed to reorder FAQ');
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await faqService.togglePublished(id, !currentStatus);
      setSuccess(`FAQ ${currentStatus ? 'unpublished' : 'published'} successfully`);
      fetchFAQs();
    } catch (err) {
      console.error('Error toggling FAQ status:', err);
      setError('Failed to update FAQ status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <button
            onClick={() => setEditingFaq({ question: '', answer: '', category: '', order: faqs.length })}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add FAQ
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-red-50 p-4 rounded-lg flex items-center text-red-700"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-green-50 p-4 rounded-lg flex items-center text-green-700"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {loading && !editingFaq ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="p-6 flex items-start justify-between hover:bg-gray-50"
                >
                  <div className="flex-1 mr-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                    {faq.category && (
                      <span className="mt-2 inline-block px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTogglePublished(faq.id, faq.is_published)}
                      className={`p-2 rounded-lg ${
                        faq.is_published
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {faq.is_published ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <MoveUp className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === faqs.length - 1}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <MoveDown className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditingFaq(faq)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingFaq && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingFaq.id ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
                <button
                  onClick={() => setEditingFaq(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={editingFaq.question || ''}
                    onChange={(e) =>
                      setEditingFaq((prev) => ({ ...prev, question: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={editingFaq.answer || ''}
                    onChange={(e) =>
                      setEditingFaq((prev) => ({ ...prev, answer: e.target.value }))
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingFaq.category || ''}
                    onChange={(e) =>
                      setEditingFaq((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setEditingFaq(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Save
                      </>
                    )}
                  </button>
                  
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
      </div>
    </div>
  );
}
