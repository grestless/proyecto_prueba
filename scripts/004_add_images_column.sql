-- Add images array column to products table for multiple product images
ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Add featured column to mark highlighted products
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Update existing products to have images array populated from image_url
UPDATE products 
SET images = ARRAY[image_url] 
WHERE images = '{}' AND image_url IS NOT NULL;
