export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          question_ar: string 
          answer_ar: string

          category: string | null
          order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          question_ar: string 
          answer_ar: string

          category?: string | null
          order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          question_ar: string 
          answer_ar: string

          category?: string | null
          order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          logo: string | null
          url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          logo?: string | null
          url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          logo?: string | null
          url?: string | null
          created_at?: string | null
        }
      }
      packages: {
        Row: {
          id: string
          size_name: string
          created_at: string | null
        }
        Insert: {
          id?: string
          size_name: string
          created_at?: string | null
        }
        Update: {
          id?: string
          size_name?: string
          created_at?: string | null
        }
      }
      product_packages: {
        Row: {
          product_id: string
          package_id: string
          created_at: string | null
        }
        Insert: {
          product_id: string
          package_id: string
          created_at?: string | null
        }
        Update: {
          product_id?: string
          package_id?: string
          created_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          brand_id: string | null
          application_fields: string | null
          recommended_uses: string | null
          features: string | null
          method_of_application: string | null
          mixing: string | null
          thinner: string | null
          application_temperatures: string | null
          application_note: string | null
          color: string | null
          gloss: string | null
          volume_solids: string | null
          voc: string | null
          number_of_coats: string | null
          washability: string | null
          abrasian_resistance: string | null
          flexibility: string | null
          adhesion: string | null
          recommended_film_thickness: string | null
          theoretical_spreading_rate: number | null
          specific_gravity: string | null
          water_resistance: string | null
          surface_preparation: string | null
          dry_to_touch: string | null
          dry_to_handle: string | null
          complete_setting: string | null
          dry_to_topcoat: string | null
          note: string | null
          storing_conditions: string | null
          notice: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          brand_id: string | null
          application_fields?: string | null
          recommended_uses?: string | null
          features?: string | null
          method_of_application?: string | null
          mixing?: string | null
          thinner?: string | null
          application_temperatures?: string | null
          application_note?: string | null
          color?: string | null
          gloss?: string | null
          volume_solids?: string | null
          voc?: string | null
          number_of_coats?:string | null
          flexibility?: string | null
          adhesion?: string | null
          washability?: string | null
          abrasian_resistance?: string | null
          recommended_film_thickness?: string | null
          theoretical_spreading_rate?: number | null
          specific_gravity?: string | null
          water_resistance?: string | null
          surface_preparation?: string | null
          dry_to_touch?: string | null
          dry_to_handle?: string | null
          complete_setting?: string | null
          dry_to_topcoat?: string | null
          note?: string | null
          storing_conditions?: string | null
          notice?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          brand_id: string | null
          application_fields?: string | null
          recommended_uses?: string | null
          features?: string | null
          method_of_application?: string | null
          mixing?: string | null
          thinner?: string | null
          application_temperatures?: string | null
          application_note?: string | null
          color?: string | null
          gloss?: string | null
          volume_solids?: string | null
          voc?: string | null
          number_of_coats? string | null
          washability?: string | null
          abrasian_resistance?: string | null
          flexibility?: string | null
          adhesion?: string | null
          recommended_film_thickness?: string | null
          theoretical_spreading_rate?: number | null
          specific_gravity?: string | null
          water_resistance?: string | null
          surface_preparation?: string | null
          dry_to_touch?: string | null
          dry_to_handle?: string | null
          complete_setting?: string | null
          dry_to_topcoat?: string | null
          note?: string | null
          storing_conditions?: string | null
          notice?: string | null
          created_at?: string | null
        }
      }
    }
  }
}