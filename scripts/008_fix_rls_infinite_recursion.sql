-- Eliminar políticas problemáticas que causan recursión infinita
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;
drop policy if exists "Admins can view all orders" on public.orders;
drop policy if exists "Admins can update all orders" on public.orders;
drop policy if exists "Admins can view all order items" on public.order_items;

-- Crear una función helper para verificar si un usuario es admin
-- Esta función usa SECURITY DEFINER para evitar recursión en RLS
create or replace function public.is_admin(user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = user_id and role = 'admin'
  );
end;
$$;

-- Crear una función helper para obtener el rol del usuario actual
create or replace function public.current_user_role()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = auth.uid();
  
  return coalesce(user_role, 'user');
end;
$$;

-- Políticas de profiles: usuarios ven su propio perfil, admins ven todos
create policy "Users can view own profile, admins view all"
  on public.profiles for select
  using (
    auth.uid() = id OR
    public.is_admin(auth.uid())
  );

-- Mantener las políticas originales de update e insert
-- (ya existen y no causan recursión)

-- Políticas de productos: todos pueden ver, solo admins pueden modificar
create policy "Admins can insert products"
  on public.products for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

create policy "Admins can update products"
  on public.products for update
  to authenticated
  using (public.is_admin(auth.uid()));

create policy "Admins can delete products"
  on public.products for delete
  to authenticated
  using (public.is_admin(auth.uid()));

-- Políticas de orders: usuarios ven sus propios pedidos, admins ven todos
create policy "Users view own orders, admins view all"
  on public.orders for select
  using (
    auth.uid() = user_id OR
    public.is_admin(auth.uid())
  );

create policy "Admins can update all orders"
  on public.orders for update
  to authenticated
  using (
    auth.uid() = user_id OR
    public.is_admin(auth.uid())
  );

-- Políticas de order_items: usuarios ven items de sus pedidos, admins ven todos
create policy "Users view own order items, admins view all"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    ) OR
    public.is_admin(auth.uid())
  );

-- Dar permisos de ejecución a las funciones helper
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.current_user_role() to authenticated;
