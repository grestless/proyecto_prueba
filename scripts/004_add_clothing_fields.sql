-- Agregar campos específicos para ropa (sizes, colors)
alter table public.products
add column if not exists sizes text[] default '{}',
add column if not exists colors text[] default '{}';

-- Actualizar productos existentes con valores por defecto
update public.products
set sizes = ARRAY['S', 'M', 'L', 'XL'],
    colors = ARRAY['Negro', 'Blanco', 'Gris']
where sizes = '{}' or colors = '{}';

-- Agregar campos de talle y color a cart_items
alter table public.cart_items
add column if not exists selected_size text,
add column if not exists selected_color text;

-- Agregar campos de talle y color a order_items
alter table public.order_items
add column if not exists selected_size text,
add column if not exists selected_color text;
