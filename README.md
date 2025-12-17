# Celutronix - E-Commerce Platform

A production-ready e-commerce platform built with Next.js, Supabase, and Stripe. Features a complete shopping experience with authentication, product catalog, shopping cart, checkout, user profiles, and admin dashboard.

## Features

### Customer Features
- **Authentication**: Email/password signup and login with Supabase Auth
- **Product Catalog**: Browse products with search, category filters, and sorting
- **Product Details**: View detailed product information with images and descriptions
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout**: Secure payment processing with Stripe
- **User Profile**: View account information and order history
- **Order Tracking**: Track order status and view past purchases

### Admin Features
- **Dashboard**: Overview with key metrics (products, orders, revenue)
- **Product Management**: Full CRUD operations for products
- **Order Management**: View all customer orders with details
- **Inventory Control**: Manage product stock levels

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth with JWT (httpOnly cookies)
- **Payments**: Stripe Checkout
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Error Handling**: React Error Boundary + react-hot-toast
- **Notifications**: Toast notifications for user feedback
- **Validation**: Zod schemas with react-hook-form

## Database Schema

### Tables
- `profiles`: User profile information
- `products`: Product catalog with pricing and inventory
- `cart_items`: Shopping cart items per user
- `orders`: Order records with status tracking
- `order_items`: Individual items within each order

All tables are protected with Row Level Security (RLS) policies.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Stripe account

### Installation

1. Clone the repository and install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up Supabase:
   - The Supabase integration is already connected
   - Run the SQL scripts in the `scripts` folder to create tables:
     - `001_create_tables.sql` - Creates all database tables with RLS
     - `002_create_profile_trigger.sql` - Auto-creates user profiles
     - `003_seed_products.sql` - Seeds initial product data

3. Set up Stripe:
   - The Stripe integration is already connected
   - Environment variables are automatically configured

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── actions/          # Server actions (Stripe)
│   ├── admin/            # Admin dashboard
│   ├── auth/             # Authentication pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout success/cancel
│   ├── products/         # Product catalog and details
│   ├── profile/          # User profile and orders
│   └── page.tsx          # Landing page
├── components/
│   ├── admin/            # Admin components
│   ├── ui/               # shadcn/ui components
│   ├── error-boundary.tsx    # Global error boundary
│   ├── toast-provider.tsx    # Toast notifications provider
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── ...               # Other components
├── lib/
│   └── supabase/         # Supabase client configuration
├── scripts/              # Database SQL scripts
└── types/                # TypeScript type definitions
\`\`\`

## Environment Variables

The following environment variables are automatically configured through integrations:

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Stripe
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Optional
- `NEXT_PUBLIC_SITE_URL` - Your site URL for Stripe redirects (defaults to localhost)
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Development redirect URL for auth

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. The Supabase and Stripe integrations will carry over
5. Deploy!

### Post-Deployment

1. Run the database scripts in your Supabase project
2. Update `NEXT_PUBLIC_SITE_URL` environment variable with your production URL
3. Configure Stripe webhook endpoints (if needed for production)

## Key Features Explained

### Authentication
- Uses Supabase Auth with email/password
- Middleware protects admin and profile routes
- Auto-creates user profile on signup via database trigger

### Row Level Security
- All tables have RLS enabled
- Users can only access their own cart items and orders
- Products are publicly readable but admin-writable
- Ensures data security at the database level

### Stripe Integration
- Server-side price validation prevents tampering
- Creates orders in database before checkout
- Handles success/cancel redirects
- Clears cart after successful payment

### Admin Dashboard
- Protected by authentication middleware
- Full CRUD operations for products
- View all orders with customer information
- Real-time statistics and metrics

## Authentication System

### Overview

Este proyecto implementa un sistema de autenticación robusto y seguro usando Supabase Auth con las siguientes características:

- **JWT Tokens**: Sesiones seguras con tokens JWT almacenados en cookies httpOnly
- **Middleware Protection**: Rutas protegidas automáticamente en el servidor
- **Role-Based Access Control (RBAC)**: Sistema de roles (user/admin)
- **Server-Side Validation**: Validación de roles en el servidor, no solo en cliente
- **Custom Hooks**: Hooks reutilizables para lógica de autenticación

### Flujo de Autenticación

1. **Registro (Sign Up)**:
   - Usuario completa formulario con email y contraseña (mínimo 8 caracteres, 1 mayúscula, 1 número)
   - Supabase crea cuenta en `auth.users`
   - Trigger de base de datos crea perfil automáticamente en `profiles` con rol "user"
   - Usuario recibe email de confirmación
   - Después de confirmar, puede iniciar sesión

2. **Inicio de Sesión (Login)**:
   - Usuario ingresa email y contraseña
   - Supabase valida credenciales y genera JWT
   - JWT se almacena en cookies httpOnly (seguras)
   - Usuario es redirigido a la página principal
   - Header muestra menú de usuario con avatar y nombre

3. **Sesión Activa**:
   - Middleware verifica JWT en cada request
   - Tokens se refrescan automáticamente
   - Sesión persiste entre recargas de página
   - Hooks personalizados proveen datos del usuario

4. **Cierre de Sesión (Logout)**:
   - Usuario hace clic en "Cerrar Sesión"
   - Supabase invalida el JWT
   - Cookies se limpian
   - Usuario es redirigido al home

### Roles y Permisos

#### Usuario (user)
- **Rol por defecto** para todos los nuevos registros
- **Permisos**:
  - Ver y comprar productos
  - Gestionar su carrito de compras
  - Realizar pedidos
  - Ver y editar su perfil
  - Ver historial de pedidos
  - Repetir pedidos anteriores

#### Administrador (admin)
- **Rol asignado manualmente** en la base de datos
- **Permisos adicionales**:
  - Acceso al panel de administración (`/admin`)
  - CRUD completo de productos
  - Ver lista de todos los usuarios
  - Gestionar pedidos (cambiar estados)
  - Ver estadísticas y métricas

### Hooks Personalizados

El proyecto incluye hooks reutilizables para gestionar autenticación:

#### `useAuth()`
Hook principal que provee estado de autenticación:
\`\`\`typescript
const { user, profile, loading, isAuthenticated, signOut } = useAuth()
\`\`\`

#### `useUser()`
Hook para acceder a datos del usuario actual:
\`\`\`typescript
const { user, profile, email, name, role, avatarUrl, address, phone } = useUser()
\`\`\`

#### `useAdmin()`
Hook para verificar permisos de administrador:
\`\`\`typescript
const { isAdmin, loading, canAccessAdmin } = useAdmin()
\`\`\`

### Server Actions

El proyecto incluye server actions para validación segura en el servidor:

#### `getCurrentUser()`
Obtiene el usuario y perfil actual:
\`\`\`typescript
const { user, profile, error } = await getCurrentUser()
\`\`\`

#### `requireAuth()`
Requiere autenticación, redirige si no está autenticado:
\`\`\`typescript
const { user, profile } = await requireAuth()
\`\`\`

#### `requireAdmin()`
Requiere rol de admin, redirige si no tiene permisos:
\`\`\`typescript
const { user, profile } = await requireAdmin()
\`\`\`

#### `checkIsAdmin()`
Verifica si el usuario actual es admin:
\`\`\`typescript
const isAdmin = await checkIsAdmin()
\`\`\`

#### `updateUserProfile()`
Actualiza información del perfil del usuario:
\`\`\`typescript
const { success, error } = await updateUserProfile({
  name: "Juan Pérez",
  address: "Calle Falsa 123",
  phone: "+54 11 1234-5678"
})
\`\`\`

#### `changeUserRole()`
Cambia el rol de un usuario (solo admin):
\`\`\`typescript
const { success, error } = await changeUserRole(userId, "admin")
\`\`\`

### Protección de Rutas

El middleware protege automáticamente las siguientes rutas:

- `/profile` - Requiere autenticación
- `/cart` - Requiere autenticación
- `/checkout/*` - Requiere autenticación
- `/admin/*` - Requiere autenticación + rol admin

Si un usuario intenta acceder sin permisos:
- Sin autenticación → Redirige a `/auth/login`
- Sin rol admin → Redirige a `/?error=access_denied` con mensaje de error

### Gestión de Usuarios Admin

#### Crear un Administrador

Para asignar el rol de administrador a un usuario:

**Opción 1: Usando Supabase Dashboard**
1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a "Table Editor" → "profiles"
3. Encuentra el usuario que quieres hacer admin
4. Edita el campo `role` y cámbialo de "user" a "admin"
5. Guarda los cambios

**Opción 2: Usando SQL**
\`\`\`sql
-- Reemplaza 'user@example.com' con el email del usuario
UPDATE profiles
SET role = 'admin', updated_at = NOW()
WHERE email = 'user@example.com';
\`\`\`

**Opción 3: Usando Server Action (desde código)**
\`\`\`typescript
// Solo un admin existente puede ejecutar esto
await changeUserRole(userId, "admin")
\`\`\`

#### Gestionar Roles

Los administradores pueden ver todos los usuarios en el panel de administración:
1. Inicia sesión como admin
2. Ve a `/admin`
3. Haz clic en la pestaña "Usuarios"
4. Verás una tabla con todos los usuarios registrados y sus roles

### Cambiar o Resetear Contraseñas

#### Cambiar Contraseña (Usuario Autenticado)

Para que un usuario cambie su propia contraseña:

\`\`\`typescript
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

const { error } = await supabase.auth.updateUser({
  password: "nueva_contraseña_segura"
})

if (error) {
  console.error("Error al cambiar contraseña:", error)
} else {
  console.log("Contraseña actualizada exitosamente")
}
\`\`\`

#### Resetear Contraseña (Usuario Olvidó Contraseña)

**Paso 1: Solicitar reset**
\`\`\`typescript
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

const { error } = await supabase.auth.resetPasswordForEmail(
  "user@example.com",
  {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  }
)
\`\`\`

**Paso 2: Usuario recibe email con link**

**Paso 3: Crear página de reset** (`app/auth/reset-password/page.tsx`):
\`\`\`typescript
"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      alert("Error al resetear contraseña: " + error.message)
    } else {
      alert("Contraseña actualizada exitosamente")
      router.push("/")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleReset}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nueva contraseña"
        minLength={8}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Actualizando..." : "Actualizar Contraseña"}
      </button>
    </form>
  )
}
\`\`\`

#### Resetear Contraseña como Admin

Si eres administrador y necesitas resetear la contraseña de un usuario:

**Opción 1: Usando Supabase Dashboard**
1. Ve a "Authentication" → "Users"
2. Encuentra el usuario
3. Haz clic en los tres puntos → "Send password reset email"

**Opción 2: Usando API de Admin (requiere service role key)**
\`\`\`typescript
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Solo en servidor
)

const { error } = await supabase.auth.admin.updateUserById(
  userId,
  { password: "nueva_contraseña_temporal" }
)
\`\`\`

### Seguridad

- **Cookies httpOnly**: Los JWT se almacenan en cookies httpOnly, inaccesibles desde JavaScript
- **Server-Side Validation**: Todos los permisos se validan en el servidor
- **Row Level Security**: Políticas RLS en la base de datos protegen los datos
- **Password Requirements**: Contraseñas deben tener mínimo 8 caracteres, 1 mayúscula y 1 número
- **CSRF Protection**: Next.js y Supabase proveen protección contra CSRF
- **Rate Limiting**: Supabase limita intentos de login para prevenir ataques de fuerza bruta

### Mejores Prácticas

1. **Siempre valida en el servidor**: No confíes solo en validaciones del cliente
2. **Usa los hooks personalizados**: `useAuth()`, `useUser()`, `useAdmin()` para consistencia
3. **Usa server actions**: Para operaciones sensibles, usa las server actions provistas
4. **Maneja errores apropiadamente**: Usa try/catch y muestra mensajes claros al usuario
5. **Logs de debugging**: Usa el prefijo `[v0]` en console.log para facilitar debugging

## Error Handling & Best Practices

Este proyecto implementa un sistema robusto de manejo de errores:

### Error Boundary
- Captura errores de React en toda la aplicación
- Muestra una interfaz de fallback amigable
- Registra errores para debugging

### Toast Notifications
- Feedback inmediato para todas las acciones del usuario
- Mensajes de éxito, error y carga
- Configuración personalizada con tema verde/mint

### Try/Catch Comprehensivo
- Todas las operaciones asíncronas están protegidas
- Validación de datos en frontend y backend
- Mensajes de error específicos y accionables
- Logging consistente con prefijo `[v0]`

### Validación de Datos
- Validación en tiempo real en formularios
- Validación en server actions antes de operaciones de DB
- Row Level Security en la base de datos

### Rollback de Transacciones
- Si una operación compuesta falla, se deshacen los cambios
- Ejemplo: Si falla crear order_items, se elimina la orden

Para más detalles, consulta `BEST_PRACTICES.md`.

## Troubleshooting

### Errores Comunes

**Error: "Invalid login credentials"**
- Verifica que el email y contraseña sean correctos
- Confirma tu email si es una cuenta nueva

**Error: "Failed to add to cart"**
- Asegúrate de estar autenticado
- Verifica que el producto tenga stock disponible

**Error: "Failed to create checkout session"**
- Verifica que tu carrito no esté vacío
- Confirma que las integraciones de Stripe y Supabase estén activas

**Error: "Database error"**
- Verifica que los scripts SQL se hayan ejecutado correctamente
- Confirma que las políticas RLS estén habilitadas

### Verificar Integraciones

1. **Supabase**: Ve a la sección "Connect" en el sidebar y verifica que Supabase esté conectado
2. **Stripe**: Ve a la sección "Connect" en el sidebar y verifica que Stripe esté conectado
3. **Variables de entorno**: Ve a la sección "Vars" en el sidebar y confirma que todas las variables estén configuradas

### Logs de Debugging

Todos los logs del sistema usan el prefijo `[v0]` para facilitar el debugging:
\`\`\`javascript
console.log("[v0] User authenticated:", user)
console.error("[v0] Database error:", error)
\`\`\`

Abre la consola del navegador (F12) para ver los logs detallados.

## Color Scheme

The design uses a natural green/mint color palette:
- Primary: Emerald/Green tones
- Accents: Teal/Mint
- Background: Soft emerald and teal gradients
- Text: Dark emerald for headings, medium emerald for body

## Additional Resources

- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Guía detallada de mejores prácticas
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## License

This project is built for demonstration purposes.
