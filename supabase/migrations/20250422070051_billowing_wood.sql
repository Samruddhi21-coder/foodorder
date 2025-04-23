/*
  # Restaurant Database Schema

  1. New Tables
    - `menu_categories`
      - `id` (integer, primary key)
      - `name` (text)
      - `description` (text, optional)
      - `image_url` (text, optional)
      - `created_at` (timestamp)
    
    - `menu_items`
      - `id` (integer, primary key)
      - `name` (text)
      - `description` (text, optional)
      - `price` (numeric)
      - `image_url` (text, optional)
      - `category_id` (integer, foreign key)
      - `is_vegetarian` (boolean)
      - `is_spicy` (boolean)
      - `is_featured` (boolean)
      - `created_at` (timestamp)
    
    - `user_profiles`
      - `id` (uuid, primary key)
      - `full_name` (text, optional)
      - `email` (text)
      - `phone_number` (text, optional)
      - `default_address` (text, optional)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (integer, primary key)
      - `user_id` (uuid, foreign key)
      - `status` (text)
      - `total_amount` (numeric)
      - `address` (text, optional)
      - `phone_number` (text, optional)
      - `payment_method` (text)
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (integer, primary key)
      - `order_id` (integer, foreign key)
      - `menu_item_id` (integer, foreign key)
      - `quantity` (integer)
      - `price` (numeric)
      - `special_instructions` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu categories"
  ON menu_categories
  FOR SELECT
  TO public
  USING (true);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  image_url text,
  category_id integer REFERENCES menu_categories(id),
  is_vegetarian boolean DEFAULT false,
  is_spicy boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  TO public
  USING (true);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  email text NOT NULL,
  phone_number text,
  default_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

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

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES user_profiles(id),
  status text NOT NULL DEFAULT 'pending',
  total_amount numeric(10,2) NOT NULL,
  address text,
  phone_number text,
  payment_method text NOT NULL DEFAULT 'cash',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

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

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id integer REFERENCES orders(id),
  menu_item_id integer REFERENCES menu_items(id),
  quantity integer NOT NULL,
  price numeric(10,2) NOT NULL,
  special_instructions text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );