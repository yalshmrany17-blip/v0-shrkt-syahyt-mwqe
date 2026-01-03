import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build"
const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables." },
        { status: 500 },
      )
    }

    const { bookingId, amount } = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "sar",
      metadata: {
        bookingId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
