-- Seed some initial products
insert into public.products (name, description, price, image_url, category, stock) values
  ('Organic Green Tea', 'Premium organic green tea leaves, rich in antioxidants', 1299, '/placeholder.svg?height=400&width=400', 'Tea', 50),
  ('Herbal Wellness Blend', 'A soothing blend of chamomile, lavender, and mint', 1499, '/placeholder.svg?height=400&width=400', 'Tea', 40),
  ('Matcha Powder', 'Premium ceremonial grade matcha powder from Japan', 2499, '/placeholder.svg?height=400&width=400', 'Tea', 30),
  ('Vitamin C Serum', 'Brightening vitamin C serum for radiant skin', 3499, '/placeholder.svg?height=400&width=400', 'Skincare', 25),
  ('Natural Face Moisturizer', 'Hydrating face cream with natural ingredients', 2999, '/placeholder.svg?height=400&width=400', 'Skincare', 35),
  ('Yoga Mat', 'Eco-friendly non-slip yoga mat', 4999, '/placeholder.svg?height=400&width=400', 'Fitness', 20),
  ('Resistance Bands Set', 'Set of 5 resistance bands for home workouts', 2499, '/placeholder.svg?height=400&width=400', 'Fitness', 45),
  ('Essential Oil Diffuser', 'Ultrasonic aromatherapy diffuser', 3999, '/placeholder.svg?height=400&width=400', 'Wellness', 30),
  ('Organic Protein Powder', 'Plant-based protein powder, vanilla flavor', 3999, '/placeholder.svg?height=400&width=400', 'Nutrition', 40),
  ('Meditation Cushion', 'Comfortable meditation cushion with organic filling', 4499, '/placeholder.svg?height=400&width=400', 'Wellness', 15)
on conflict do nothing;
