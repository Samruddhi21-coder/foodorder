/*
  # Sample data for food ordering application

  1. Content:
    - Menu categories with sample food categories
    - Menu items with sample dishes
*/

-- Insert sample menu categories
INSERT INTO menu_categories (name, description, image_url)
VALUES
  ('Appetizers', 'Start your meal with our delicious appetizers', 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg'),
  ('Main Courses', 'Signature dishes prepared with the finest ingredients', 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg'),
  ('Pasta & Risotto', 'Classic Italian pasta and creamy risotto dishes', 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg'),
  ('Pizza', 'Hand-tossed pizzas with premium toppings', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'),
  ('Desserts', 'Sweet treats to end your meal on a high note', 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'),
  ('Beverages', 'Refreshing drinks to complement your meal', 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg');

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, image_url, category_id, is_vegetarian, is_spicy, is_featured)
VALUES
  ('Bruschetta', 'Toasted bread topped with fresh tomatoes, basil, and garlic', 8.99, 'https://images.pexels.com/photos/6605208/pexels-photo-6605208.jpeg', 1, true, false, true),
  ('Mozzarella Sticks', 'Crispy fried mozzarella sticks served with marinara sauce', 9.99, 'https://images.pexels.com/photos/13696040/pexels-photo-13696040.jpeg', 1, true, false, false),
  ('Spicy Buffalo Wings', 'Crispy chicken wings tossed in our signature spicy buffalo sauce', 12.99, 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg', 1, false, true, true),
  
  ('Grilled Salmon', 'Fresh salmon fillet grilled to perfection with lemon herb butter', 24.99, 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg', 2, false, false, true),
  ('Beef Tenderloin', 'Prime beef tenderloin with red wine reduction and roasted vegetables', 29.99, 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg', 2, false, false, true),
  ('Vegetable Curry', 'Seasonal vegetables in a rich curry sauce with fragrant basmati rice', 18.99, 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 2, true, true, false),
  
  ('Spaghetti Carbonara', 'Classic carbonara with pancetta, egg, parmesan, and black pepper', 16.99, 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg', 3, false, false, true),
  ('Mushroom Risotto', 'Creamy arborio rice with wild mushrooms and parmesan', 17.99, 'https://images.pexels.com/photos/5638527/pexels-photo-5638527.jpeg', 3, true, false, false),
  ('Spinach Ravioli', 'Handmade ravioli filled with spinach and ricotta in sage butter', 18.99, 'https://images.pexels.com/photos/1373915/pexels-photo-1373915.jpeg', 3, true, false, false),
  
  ('Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 14.99, 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg', 4, true, false, true),
  ('Pepperoni Pizza', 'Tomato sauce, mozzarella, and spicy pepperoni', 16.99, 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg', 4, false, true, true),
  ('Vegetarian Pizza', 'Tomato sauce, mozzarella, bell peppers, onions, mushrooms, and olives', 15.99, 'https://images.pexels.com/photos/6697393/pexels-photo-6697393.jpeg', 4, true, false, false),
  
  ('Tiramisu', 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', 9.99, 'https://images.pexels.com/photos/6974220/pexels-photo-6974220.jpeg', 5, true, false, true),
  ('Chocolate Lava Cake', 'Warm chocolate cake with a molten center, served with vanilla ice cream', 10.99, 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg', 5, true, false, true),
  ('New York Cheesecake', 'Creamy cheesecake with a graham cracker crust and berry compote', 8.99, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 5, true, false, false),
  
  ('Fresh Lemonade', 'Freshly squeezed lemonade with mint leaves', 4.99, 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg', 6, true, false, false),
  ('Iced Tea', 'Refreshing iced tea with lemon slice', 3.99, 'https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg', 6, true, false, false),
  ('Espresso', 'Strong Italian espresso', 3.50, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', 6, true, false, true);