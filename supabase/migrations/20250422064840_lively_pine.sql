/*
  # Initial schema for food ordering application

  1. New Tables
    - `menu_categories` - Categories for menu items
    - `menu_items` - Food items available for ordering
    - `orders` - Customer orders
    - `order_items` - Items within an order
    - `user_profiles` - Extended user information
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category_id INTEGER REFERENCES menu_categories(id),
  is_vegetarian BOOLEAN DEFAULT false,
  is_spicy BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  email TEXT NOT NULL,
  phone_number TEXT,
  default_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  address TEXT,
  phone_number TEXT,
  payment_method TEXT NOT NULL DEFAULT 'cash',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  menu_item_id INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy for menu_categories - public read access
CREATE POLICY "Anyone can view menu categories"
  ON menu_categories
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Policy for menu_items - public read access
CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Policy for user_profiles - users can only view and edit their own profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policy for orders - users can view and manage their own orders
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for order_items - users can view their own order items
CREATE POLICY "Users can view their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING ((SELECT user_id FROM orders WHERE orders.id = order_items.order_id) = auth.uid());

CREATE POLICY "Users can insert their own order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT user_id FROM orders WHERE orders.id = order_items.order_id) = auth.uid());