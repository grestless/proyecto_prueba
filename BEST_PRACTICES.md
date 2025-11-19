# Mejores Prácticas de Desarrollo

Este documento describe las mejores prácticas implementadas en el proyecto WellnessShop.

## 🛡️ Manejo de Errores

### 1. Error Boundary

**Ubicación**: `components/error-boundary.tsx`

Captura errores en el árbol de componentes de React y muestra una interfaz de fallback amigable.

\`\`\`tsx
export class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Error Boundary caught:", error, errorInfo)
  }
}
\`\`\`

**Beneficios**:
- Previene que toda la aplicación se rompa por un error
- Proporciona feedback visual al usuario
- Registra errores para debugging

### 2. Try/Catch en Operaciones Asíncronas

**Patrón implementado en todo el código**:

\`\`\`tsx
const handleOperation = async () => {
  setIsLoading(true)
  
  try {
    // Validación previa
    if (!data) {
      throw new Error("Datos inválidos")
    }

    // Operación con Supabase/Stripe
    const { data, error } = await supabase.from('table').select()
    
    if (error) {
      console.error("[v0] Database error:", error)
      throw new Error("Mensaje amigable para el usuario")
    }

    // Éxito
    toast.success("¡Operación exitosa!")
    
  } catch (error) {
    console.error("[v0] Error:", error)
    
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error("Error inesperado. Por favor, intenta nuevamente.")
    }
  } finally {
    setIsLoading(false)
  }
}
\`\`\`

**Beneficios**:
- Captura todos los errores posibles
- Proporciona mensajes específicos al usuario
- Siempre limpia el estado (finally)
- Registra errores con prefijo [v0] para debugging

### 3. Notificaciones Toast

**Ubicación**: `components/toast-provider.tsx`

Usa `react-hot-toast` para notificaciones no intrusivas.

\`\`\`tsx
// Éxito
toast.success("¡Producto agregado al carrito!")

// Error
toast.error("Error al procesar el pago")

// Loading con ID para actualizar después
toast.loading("Procesando...", { id: "checkout" })
// ... operación ...
toast.success("Completado", { id: "checkout" })
\`\`\`

**Configuración personalizada**:
\`\`\`tsx
<Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: "#fff",
      color: "#047857",
      border: "1px solid #d1fae5",
    },
  }}
/>
\`\`\`

### 4. Validación de Datos

**Frontend**:
\`\`\`tsx
// Validación antes de enviar
if (password !== repeatPassword) {
  toast.error("Las contraseñas no coinciden")
  return
}

if (password.length < 6) {
  toast.error("La contraseña debe tener al menos 6 caracteres")
  return
}
\`\`\`

**Backend (Server Actions)**:
\`\`\`tsx
export async function createCheckoutSession(lineItems: LineItem[]) {
  try {
    // Validar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw new Error("Error de autenticación")
    if (!user) redirect("/auth/login")

    // Validar datos
    if (!lineItems || lineItems.length === 0) {
      throw new Error("El carrito está vacío")
    }

    // Procesar...
  } catch (error) {
    // Manejo de errores con mensajes específicos
  }
}
\`\`\`

## 🔒 Seguridad

### 1. Row Level Security (RLS)

Todas las tablas tienen políticas RLS:

\`\`\`sql
-- Ejemplo: cart_items
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);
\`\`\`

### 2. Validación en Múltiples Capas

1. **Frontend**: Validación de formularios
2. **Server Actions**: Validación de datos y autenticación
3. **Base de datos**: RLS y constraints

### 3. Manejo Seguro de Credenciales

- Variables de entorno para API keys
- Nunca exponer claves secretas en el cliente
- Usar `NEXT_PUBLIC_` solo para claves públicas

## 📝 Código Limpio

### 1. Logging Consistente

Usa el prefijo `[v0]` para todos los logs:

\`\`\`tsx
console.error("[v0] Error in handleCheckout:", error)
console.log("[v0] User authenticated:", user.id)
\`\`\`

### 2. Mensajes de Error Específicos

❌ **Malo**:
\`\`\`tsx
toast.error("Error")
\`\`\`

✅ **Bueno**:
\`\`\`tsx
if (error.message.includes("Invalid login credentials")) {
  toast.error("Credenciales incorrectas. Verifica tu email y contraseña.")
}
\`\`\`

### 3. Manejo de Estados de Carga

Siempre proporciona feedback visual:

\`\`\`tsx
const [isLoading, setIsLoading] = useState(false)

<Button disabled={isLoading}>
  {isLoading ? "Procesando..." : "Enviar"}
</Button>
\`\`\`

### 4. Rollback en Caso de Error

Si una operación falla a mitad de camino, deshaz los cambios:

\`\`\`tsx
// Crear orden
const { data: order, error: orderError } = await supabase
  .from("orders")
  .insert({ ... })

// Si falla crear items, eliminar la orden
const { error: itemsError } = await supabase
  .from("order_items")
  .insert(orderItems)

if (itemsError) {
  await supabase.from("orders").delete().eq("id", order.id)
  throw new Error("Error al procesar los artículos")
}
\`\`\`

## 🎯 Mejores Prácticas de UX

### 1. Feedback Inmediato

- Toast notifications para acciones
- Estados de carga en botones
- Mensajes de error claros y accionables

### 2. Prevención de Errores

- Validación en tiempo real
- Deshabilitar botones cuando no hay datos
- Límites en inputs (min, max, step)

### 3. Recuperación de Errores

- Botones para reintentar
- Redirección a páginas seguras
- Mantener el estado cuando sea posible

## 🧪 Testing y Debugging

### 1. Console Logs para Debugging

Usa logs descriptivos durante el desarrollo:

\`\`\`tsx
console.log("[v0] Cart items:", cartItems)
console.log("[v0] User authenticated:", user)
console.error("[v0] Database error:", error)
\`\`\`

### 2. Eliminar Logs en Producción

Antes de deploy, elimina o comenta los logs de debugging (excepto errores).

## 📊 Monitoreo

### Errores a Monitorear

1. **Autenticación**: Fallos de login/signup
2. **Base de datos**: Errores de Supabase
3. **Pagos**: Fallos de Stripe
4. **Validación**: Datos inválidos del usuario

### Herramientas Recomendadas

- Vercel Analytics (ya incluido)
- Sentry para error tracking
- Supabase Dashboard para logs de DB

## 🚀 Performance

### 1. Optimización de Queries

\`\`\`tsx
// ✅ Seleccionar solo campos necesarios
const { data } = await supabase
  .from('products')
  .select('id, name, price')

// ❌ Evitar select(*)
\`\`\`

### 2. Manejo de Estados

- Usar `useState` para estados locales
- Evitar re-renders innecesarios
- Limpiar efectos y listeners

### 3. Carga de Imágenes

- Usar placeholders mientras cargan
- Optimizar tamaños de imagen
- Lazy loading cuando sea apropiado

---

## 📚 Recursos Adicionales

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [React Hot Toast](https://react-hot-toast.com/)
- [Stripe Best Practices](https://stripe.com/docs/security/guide)

---

Mantén estas prácticas en mente al agregar nuevas funcionalidades al proyecto.
