"use server"

import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

interface LineItem {
  product_id: string
  product_name: string
  product_description: string
  price: number
  quantity: number
}

export async function createCheckoutSession(lineItems: LineItem[], total: number) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Auth error in checkout:", authError)
      throw new Error("Error de autenticación. Por favor, inicia sesión nuevamente.")
    }

    if (!user) {
      redirect("/auth/login")
    }

    // Validate line items
    if (!lineItems || lineItems.length === 0) {
      throw new Error("El carrito está vacío. Agrega productos antes de proceder al pago.")
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: total,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) {
      console.error("[v0] Error creating order:", orderError)
      throw new Error("No se pudo crear la orden. Por favor, intenta nuevamente.")
    }

    if (!order) {
      throw new Error("Error al crear la orden en la base de datos.")
    }

    // Create order items
    const orderItems = lineItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("[v0] Error creating order items:", itemsError)
      // Rollback: delete the order if items creation fails
      await supabase.from("orders").delete().eq("id", order.id)
      throw new Error("Error al procesar los artículos de la orden.")
    }

    // Get origin from headers
    const headersList = await headers()
    const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product_name,
            description: item.product_description,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
    })

    if (!session.url) {
      throw new Error("No se pudo generar la URL de pago de Stripe.")
    }

    // Update order with Stripe session ID
    const { error: updateError } = await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id)

    if (updateError) {
      console.error("[v0] Error al actualizar la orden con el ID de la sesión:", updateError)
      // Continue anyway as the order is created
    }

    return session.url
  } catch (error) {
    console.error("[v0] Error in createCheckoutSession:", error)

    // Return user-friendly error message
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("Error inesperado al procesar el pago. Por favor, contacta con soporte.")
  }
}
