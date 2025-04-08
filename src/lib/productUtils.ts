import { supabase } from "./supabase";
import type { Database } from "../types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface FilterOptions {
  filters?: {
    application_fields?: string[];
    surface_types?: string[];
    color?: string[];
    gloss?: string[];
    search?: string;
  };
  limit?: number;
  offset?: number;
  orderBy?: {
    column: string;
    ascending: boolean;
  };
}

// Function to fetch products with filtering, pagination, and ordering
export async function fetchProducts(
  language: string,
  options: FilterOptions = {},
) {
  // Set a longer timeout to prevent premature request failures
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), 30000);
  });

  try {
    let query = supabase.from("products").select("*", { count: "exact" });

    // Apply filters if provided
    if (options.filters) {
      const { application_fields, surface_types, color, gloss, search } =
        options.filters;

      // Filter by application fields
      if (application_fields && application_fields.length > 0) {
        // Create an OR condition for each application field
        const appFieldConditions = application_fields.map(
          (field) => `application_fields.eq.${field}`,
        );
        query = query.or(appFieldConditions.join(","));
      }

      // Filter by surface types
      if (surface_types && surface_types.length > 0) {
        // Create an OR condition for each surface type
        const surfaceTypeConditions = surface_types.map(
          (type) => `surface_types.eq.${type}`,
        );
        query = query.or(surfaceTypeConditions.join(","));
      }

      // Filter by color
      if (color && color.length > 0) {
        // Use ilike for case-insensitive partial matching for each color
        const colorConditions = color.map((c) => `color.ilike.%${c}%`);
        query = query.or(colorConditions.join(","));
      }

      // Filter by gloss
      if (gloss && gloss.length > 0) {
        // Use ilike for case-insensitive partial matching for each gloss type
        const glossConditions = gloss.map((g) => `gloss.ilike.%${g}%`);
        query = query.or(glossConditions.join(","));
      }

      // Search in name and description based on language
      if (search && search.trim() !== "") {
        const searchTerm = `%${search.trim().toLowerCase()}%`;
        if (language === "ar") {
          query = query.or(
            `name_ar.ilike.${searchTerm},description_ar.ilike.${searchTerm},name.ilike.${searchTerm},description.ilike.${searchTerm}`,
          );
        } else {
          query = query.or(
            `name.ilike.${searchTerm},description.ilike.${searchTerm}`,
          );
        }
      }
    }

    // Apply ordering
    if (options.orderBy) {
      const { column, ascending } = options.orderBy;
      query = query.order(column, { ascending });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1,
      );
    }

    // Execute query with timeout
    const result = (await Promise.race([query, timeoutPromise])) as any;

    return {
      data: result.data as Product[],
      count: result.count as number,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Function to update a product in the database
export async function updateProduct(id: string, productData: Partial<Product>) {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return { data: data[0] as Product, error: null };
  } catch (error) {
    console.error("Error updating product:", error);
    return { data: null, error };
  }
}

// Function to fetch unique values for a specific column from products table
export async function fetchUniqueProductValues(
  column: string,
): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(column)
      .not(column, "is", null);

    if (error) throw error;

    // Extract unique values
    const uniqueValues = new Set<string>();
    data.forEach((item) => {
      const value = item[column as keyof typeof item];
      if (typeof value === "string" && value.trim() !== "") {
        uniqueValues.add(value);
      }
    });

    return Array.from(uniqueValues);
  } catch (error) {
    console.error(`Error fetching unique ${column} values:`, error);
    return [];
  }
}
