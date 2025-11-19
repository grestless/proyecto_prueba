-- Agregar columnas selected_size y selected_color a cart_items
alter table public.cart_items
add column if not exists selected_size text,
add column if not exists selected_color text;

-- Eliminar la restricción única anterior
alter table public.cart_items
drop constraint if exists cart_items_user_id_product_id_key;

-- Crear nueva restricción única que incluya size y color
alter table public.cart_items
add constraint cart_items_user_id_product_id_size_color_key 
unique(user_id, product_id, selected_size, selected_color);
