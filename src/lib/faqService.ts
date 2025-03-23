import { supabase } from './supabase';
import type { Database } from '../types/supabase';

type FAQ = Database['public']['Tables']['faqs']['Row'];
type FAQInsert = Database['public']['Tables']['faqs']['Insert'];
type FAQUpdate = Database['public']['Tables']['faqs']['Update'];

export const faqService = {
  // Get all published FAQs
  getPublishedFAQs: async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get all FAQs (admin)
  getAllFAQs: async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get FAQ by ID
  getFAQById: async (id: string) => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new FAQ
  createFAQ: async (faq: FAQInsert) => {
    const { data, error } = await supabase
      .from('faqs')
      .insert([faq])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update FAQ
  updateFAQ: async (id: string, faq: FAQUpdate) => {
    const { data, error } = await supabase
      .from('faqs')
      .update(faq)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete FAQ
  deleteFAQ: async (id: string) => {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Update FAQ order
  updateFAQOrder: async (id: string, newOrder: number) => {
    const { data, error } = await supabase
      .from('faqs')
      .update({ order: newOrder })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Toggle FAQ published status
  togglePublished: async (id: string, isPublished: boolean) => {
    const { data, error } = await supabase
      .from('faqs')
      .update({ is_published: isPublished })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};