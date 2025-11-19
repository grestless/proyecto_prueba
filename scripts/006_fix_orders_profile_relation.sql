-- Drop existing foreign key constraint on orders.user_id
alter table public.orders drop constraint if exists orders_user_id_fkey;

-- Add new foreign key constraint to reference profiles instead of auth.users
alter table public.orders 
  add constraint orders_user_id_fkey 
  foreign key (user_id) 
  references public.profiles(id) 
  on delete cascade;

-- Do the same for cart_items for consistency
alter table public.cart_items drop constraint if exists cart_items_user_id_fkey;

alter table public.cart_items 
  add constraint cart_items_user_id_fkey 
  foreign key (user_id) 
  references public.profiles(id) 
  on delete cascade;

-- Update RLS policies to ensure they still work correctly
-- (They should work the same since profiles.id = auth.users.id)
