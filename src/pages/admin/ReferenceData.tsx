import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ReferenceItem {
  id: string;
  name: string;
  name_ar: string; // New field for Arabic name
  description: string | null;
  description_ar: string | null; // New field for Arabic description
  logo?: string | null;
  parent_id?: string | null;
  size_info?: string | null;
}

type TableName = 'surface_types' | 'application_fields' | 'brands' | 'packages';

interface EditingItem extends ReferenceItem {
  isNew?: boolean;
  size_name?: string;
  size_name_ar?: string; // New field for Arabic size name
}

interface EntityConfig {
  name: string;
  icon: keyof typeof Icons;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
    required?: boolean;
    options?: { value: string; label: string }[];
  }[];
}

const entityConfigs: Record<TableName, EntityConfig> = {
  surface_types: {
    name: 'Surface Types',
    icon: 'Layers',
    fields: [
      { name: 'name', label: 'Name (English)', type: 'text', required: true },
      
      { name: 'description', label: 'Description (English)', type: 'textarea' },
      { name: 'name_ar', label: 'Name (Arabic)', type: 'text', required: true }, // Arabic name
      { name: 'description_ar', label: 'Description (Arabic)', type: 'textarea' } // Arabic description
    ]
  },
  application_fields: {
    name: 'Application Fields',
    icon: 'Brush',
    fields: [
      { name: 'name', label: 'Name (English)', type: 'text', required: true },
      
      { name: 'description', label: 'Description (English)', type: 'textarea' },
      { name: 'name_ar', label: 'Name (Arabic)', type: 'text', required: true }, // Arabic name
      { name: 'description_ar', label: 'Description (Arabic)', type: 'textarea' } // Arabic description
    ]
  },
  brands: {
    name: 'Brands',
    icon: 'Building2',
    fields: [
      { name: 'name', label: 'Brand Name (English)', type: 'text', required: true },
     
      { name: 'logo', label: 'Logo URL', type: 'url' },
      { name: 'description', label: 'Description (English)', type: 'textarea' },
      { name: 'name_ar', label: 'الاسم', type: 'text', required: true }, // Arabic name
      { name: 'description_ar', label: 'الوصف', type: 'textarea' } // Arabic description
    ]
  },
  packages: {
    name: 'Packages',
    icon: 'Package',
    fields: [
      { name: 'size_name', label: 'Size Name (English)', type: 'text', required: true },
     
      { name: 'description', label: 'Description (English)', type: 'textarea' },
      { name: 'size_name_ar', label: 'Size Name (Arabic)', type: 'text', required: true }, // Arabic size name
      { name: 'description_ar', label: 'Description (Arabic)', type: 'textarea' } // Arabic description
    ]
  }
};

export default function ReferenceData() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TableName>('surface_types');
  const [items, setItems] = useState<ReferenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  useEffect(() => {
    checkAuth();
    fetchItems();
  }, [activeTab]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      let query = supabase.from(activeTab);
      // Add specific ordering based on table
      switch (activeTab) {
        case 'packages':
          query = query.select('*').order('size_name');
          break;
        case 'application_fields':
          query = query.select('*').order('name');
          break;
        default:
          query = query.select('*').order('name');
      }
      const { data, error } = await query;
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      console.error(`Error fetching ${activeTab}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    try {
      setLoading(true);
      setError(null);

      // Prepare data for saving
      const saveData: any = {};
      if (activeTab === 'packages') {
        saveData.size_name = editingItem.size_name || '';
        saveData.size_name_ar = editingItem.size_name_ar || ''; // Arabic size name
        if (editingItem.description) saveData.description = editingItem.description;
        if (editingItem.description_ar) saveData.description_ar = editingItem.description_ar; // Arabic description
      } else {
        saveData.name = editingItem.name || '';
        saveData.name_ar = editingItem.name_ar || ''; // Arabic name
        if (editingItem.description) saveData.description = editingItem.description;
        if (editingItem.description_ar) saveData.description_ar = editingItem.description_ar; // Arabic description

        // Add additional fields for brands
        if (activeTab === 'brands') {
          ['logo', 'contact_email', 'contact_phone', 'website'].forEach(field => {
            if (editingItem[field as keyof EditingItem]) {
              saveData[field] = editingItem[field as keyof EditingItem];
            }
          });
        }
      }

      if (editingItem.isNew) {
        const { error } = await supabase.from(activeTab).insert([saveData]);
        if (error) throw error;
        setSuccess('Item added successfully');
      } else {
        const { error } = await supabase
          .from(activeTab)
          .update(saveData)
          .eq('id', editingItem.id);
        if (error) throw error;
        setSuccess('Item updated successfully');
      }

      setEditingItem(null);
      fetchItems();
    } catch (err: any) {
      console.error('Error saving item:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from(activeTab)
        .delete()
        .eq('id', id);
      if (error) throw error;
      setSuccess('Item deleted successfully');
      fetchItems();
    } catch (err: any) {
      console.error('Error deleting item:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Reference Data Management</h1>
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {(Object.entries(entityConfigs)).map(([key, config]) => {
              const Icon = Icons[config.icon];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as TableName)}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span>{config.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-red-50 p-4 rounded-md flex items-center text-red-700 shadow-sm"
            >
              <Icons.AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-green-50 p-4 rounded-md flex items-center text-green-700 shadow-sm"
            >
              <Icons.CheckCircle2 className="h-5 w-5 mr-2" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {entityConfigs[activeTab].name}
              </h2>
              <button
                onClick={() => setEditingItem({ size_name: '', size_name_ar: '', isNew: true })}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Icons.Plus className="h-5 w-5 mr-2" />
                Add New
              </button>
            </div>
            {loading && !editingItem ? (
              <div className="flex justify-center py-8">
                <Icons.Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {activeTab === 'packages'
                          ? `${item.size_name} (${item.size_name_ar})`
                          : `${item.name} (${item.name_ar})`}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description || item.description_ar}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-gray-600 hover:text-blue-600"
                      >
                        <Icons.Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-600 hover:text-red-600"
                      >
                        <Icons.Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingItem.isNew ? 'Add New Item' : 'Edit Item'}
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icons.X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                {entityConfigs[activeTab].fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={
                          field.name === 'size_name'
                            ? editingItem.size_name || ''
                            : editingItem[field.name as keyof EditingItem] || ''
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          setEditingItem(prev => ({
                            ...prev,
                            [field.name]: value,
                            ...(field.name === 'name' && activeTab === 'packages'
                              ? { size_name: value }
                              : {})
                          }));
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={
                          field.name === 'size_name'
                            ? editingItem.size_name || ''
                            : editingItem[field.name as keyof EditingItem] || ''
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          setEditingItem(prev => ({
                            ...prev,
                            [field.name]: value,
                            ...(field.name === 'name' && activeTab === 'packages'
                              ? { size_name: value }
                              : {})
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {loading ? (
                      <Icons.Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Icons.Save className="h-5 w-5 mr-2" />
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