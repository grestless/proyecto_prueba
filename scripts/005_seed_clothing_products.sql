-- Eliminar productos de wellness anteriores
delete from public.products;

-- Insertar productos de ropa
insert into public.products (name, description, price, image_url, category, stock, sizes, colors) values
  (
    'Remera Básica Oversize',
    'Remera de algodón 100% orgánico con corte oversize. Perfecta para el día a día con máxima comodidad y estilo minimalista.',
    4500,
    '/placeholder.svg?height=600&width=600',
    'Remeras',
    45,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Negro', 'Blanco', 'Verde Oliva', 'Gris', 'Beige']
  ),
  (
    'Buzo Hoodie Minimalista',
    'Buzo con capucha de algodón premium. Diseño limpio y moderno con ajuste perfecto. Ideal para cualquier ocasión.',
    8900,
    '/placeholder.svg?height=600&width=600',
    'Buzos',
    30,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Negro', 'Verde Oliva Oscuro', 'Gris Carbón', 'Beige']
  ),
  (
    'Pantalón Cargo Urbano',
    'Pantalón cargo de gabardina con múltiples bolsillos. Estilo urbano con comodidad excepcional.',
    7500,
    '/placeholder.svg?height=600&width=600',
    'Pantalones',
    35,
    ARRAY['28', '30', '32', '34', '36', '38'],
    ARRAY['Verde Oliva', 'Negro', 'Beige', 'Gris']
  ),
  (
    'Campera Bomber Unisex',
    'Campera bomber reversible con forro acolchado. Diseño atemporal y versátil para todas las estaciones.',
    12900,
    '/placeholder.svg?height=600&width=600',
    'Camperas',
    20,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Verde Oliva', 'Negro', 'Azul Marino']
  ),
  (
    'Zapatillas Urbanas Minimalistas',
    'Zapatillas de lona con suela de goma. Diseño limpio y cómodo para uso diario.',
    6900,
    '/placeholder.svg?height=600&width=600',
    'Calzado',
    40,
    ARRAY['38', '39', '40', '41', '42', '43', '44'],
    ARRAY['Blanco', 'Negro', 'Verde Oliva', 'Gris']
  ),
  (
    'Jean Recto Clásico',
    'Jean de corte recto en denim premium. Diseño atemporal que nunca pasa de moda.',
    8500,
    '/placeholder.svg?height=600&width=600',
    'Pantalones',
    38,
    ARRAY['28', '30', '32', '34', '36', '38'],
    ARRAY['Azul Oscuro', 'Negro', 'Gris']
  ),
  (
    'Camisa Oversize de Lino',
    'Camisa de lino 100% natural con corte oversize. Perfecta para climas cálidos con estilo relajado.',
    6500,
    '/placeholder.svg?height=600&width=600',
    'Camisas',
    28,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Blanco', 'Beige', 'Verde Oliva Claro', 'Gris']
  ),
  (
    'Shorts Deportivos',
    'Shorts de tela técnica con bolsillos laterales. Ideal para entrenamiento o uso casual.',
    4200,
    '/placeholder.svg?height=600&width=600',
    'Shorts',
    50,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Negro', 'Gris', 'Verde Oliva', 'Azul Marino']
  ),
  (
    'Sweater Cuello Redondo',
    'Sweater de lana merino con cuello redondo. Suave, abrigado y elegante.',
    9500,
    '/placeholder.svg?height=600&width=600',
    'Buzos',
    25,
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Negro', 'Gris', 'Verde Oliva Oscuro', 'Beige']
  ),
  (
    'Gorra Snapback Minimalista',
    'Gorra de algodón con cierre ajustable. Diseño limpio sin logos llamativos.',
    3500,
    '/placeholder.svg?height=600&width=600',
    'Accesorios',
    60,
    ARRAY['Único'],
    ARRAY['Negro', 'Verde Oliva', 'Beige', 'Gris']
  )
on conflict do nothing;
