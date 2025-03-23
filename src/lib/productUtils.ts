import { supabase } from './supabase';
import { getLocalizedField, createLocalizedSelect } from './supabase';
import type { Database } from '../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

interface UpdateResult {
  success: boolean;
  message: string;
  data?: Product;
  error?: any;
}

export const validateProduct = (product: ProductUpdate): string | null => {
  if (!product.name?.trim()) {
    return 'Product name is required';
  }
  if (product.price !== undefined && (isNaN(product.price) || product.price < 0)) {
    return 'Price must be a valid positive number';
  }
  if (!product.brand_id) {
    return 'Brand is required';
  }
  return null;
};

export const fetchProducts = async (language: 'en' | 'ar', options: {
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
  orderBy?: { column: string; ascending: boolean };
}) => {
  try {
    let query = supabase
      .from('products')
      .select('*');

    // Apply filters if provided
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (key === 'search' && typeof value === 'string' && value.trim()) {
          // Handle search differently - search in name and description
          query = query.or(`name.ilike.%${value}%,description.ilike.%${value}%`);
        } else if (Array.isArray(value) && value.length > 0) {
          // For array values, use the "in" operator
          if (key === 'application_fields' || key === 'surface_types' || key === 'color' || key === 'gloss') {
            // Only apply filter if array has items
            query = query.ilike(key, `%${value.join('%')}%`);
          }
        }
      });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending
      });
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      throw error;
    }

    console.log("Fetched products:", data?.length || 0);
    
    return { data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  packages: string[],
  productData: ProductUpdate & { packages?: string[] },
  onSuccess?: () => void,
  onError?: () => void
): Promise<UpdateResult> => {
  try {
    // Input validation
    const validationError = validateProduct(productData);
    if (validationError) {
      return {
        success: false,
        message: validationError
      };
    }

    // First check if the product exists
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('id', id);

    if (countError) {
      throw new Error('Failed to verify product existence');
    }

    if (count === 0) {
      return {
        success: false,
        message: 'Product no longer exists'
      };
    }

    // Get current product data for rollback
    const { data: currentProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error('Failed to fetch current product data');
    }

    // Update product
    const { packages: packageIds, ...updateData } = productData;
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      // Handle specific error cases
      if (updateError.code === '23505') {
        return {
          success: false,
          message: 'A product with this name already exists'
        };
      }
      throw updateError;
    }

    // Update product packages if provided
    if (packageIds) {
      // First delete existing packages
      await supabase
        .from('product_packages')
        .delete()
        .eq('product_id', id);

      // Then insert new ones
      if (packageIds.length > 0) {
        const { error: packagesError } = await supabase
          .from('product_packages')
          .insert(
            packageIds.map(packageId => ({
              product_id: id,
              package_id: packageId
            }))
          );

        if (packagesError) throw packagesError;
      }
    }

    // Call success callback if provided
    onSuccess?.();

    return {
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    };

  } catch (error: any) {
    // Call error callback if provided
    onError?.();

    // Log error for debugging
    console.error('Product update error:', error);

    return {
      success: false,
      message: error.message || 'Failed to update product',
      error
    };
  }
};