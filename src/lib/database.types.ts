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
      menu_categories: {
        Row: {
          id: number
          name: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          image_url: string | null
          category_id: number
          is_vegetarian: boolean
          is_spicy: boolean
          is_featured: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          category_id: number
          is_vegetarian?: boolean
          is_spicy?: boolean
          is_featured?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          category_id?: number
          is_vegetarian?: boolean
          is_spicy?: boolean
          is_featured?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          status: string
          total_amount: number
          created_at: string
          address: string | null
          phone_number: string | null
          payment_method: string
        }
        Insert: {
          id?: number
          user_id: string
          status?: string
          total_amount: number
          created_at?: string
          address?: string | null
          phone_number?: string | null
          payment_method?: string
        }
        Update: {
          id?: number
          user_id?: string
          status?: string
          total_amount?: number
          created_at?: string
          address?: string | null
          phone_number?: string | null
          payment_method?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          menu_item_id: number
          quantity: number
          price: number
          created_at: string
          special_instructions: string | null
        }
        Insert: {
          id?: number
          order_id: number
          menu_item_id: number
          quantity: number
          price: number
          created_at?: string
          special_instructions?: string | null
        }
        Update: {
          id?: number
          order_id?: number
          menu_item_id?: number
          quantity?: number
          price?: number
          created_at?: string
          special_instructions?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          phone_number: string | null
          default_address: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          phone_number?: string | null
          default_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          phone_number?: string | null
          default_address?: string | null
          created_at?: string
        }
      }
    }
  }
}