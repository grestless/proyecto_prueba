-- Script para establecer el usuario administrador
-- Este script debe ejecutarse después de que el usuario se haya registrado

-- Actualizar el rol del usuario admin basado en su email
update public.profiles
set role = 'admin'
where id in (
  select id from auth.users
  where email = 'guillermodghiggia@outlook.com'
);

-- Verificar que el usuario fue actualizado correctamente
-- Especificando de qué tabla es cada columna para evitar ambigüedad
select p.id, u.email, p.role
from public.profiles p
join auth.users u on p.id = u.id
where u.email = 'guillermodghiggia@outlook.com';
