"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Loader2, CreditCard } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({ bookingId, amount }: { bookingId: string; amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?booking_id=${bookingId}`,
      },
      redirect: "if_required",
    })

    if (error) {
      setMessage(error.message || "حدث خطأ أثناء المعالجة")
      setIsProcessing(false)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Update booking status
      await fetch("/api/booking/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, paymentIntentId: paymentIntent.id, status: "paid" }),
      })
      router.push(`/payment/success?booking_id=${bookingId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {message && <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">{message}</div>}
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-[#af4b32] hover:bg-[#af4b32]/90 text-white h-14 rounded-xl text-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
            جاري المعالجة...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 ml-2" />
            ادفع {amount.toLocaleString()} ريال
          </>
        )}
      </Button>
    </form>
  )
}

function PaymentContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id") || ""
  const amount = Number.parseInt(searchParams.get("amount") || "0")
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    if (bookingId && amount) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, amount }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
    }
  }, [bookingId, amount])

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SharedHeader />
      <div className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#001c43] mb-2">إتمام الدفع</h1>
            <p className="text-gray-600 mb-8">رقم الحجز: {bookingId}</p>

            <div className="bg-[#001c43]/5 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المبلغ الإجمالي</span>
                <span className="text-3xl font-bold text-[#001c43]">{amount.toLocaleString()} ريال</span>
              </div>
            </div>

            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, locale: "ar" }}>
                <CheckoutForm bookingId={bookingId} amount={amount} />
              </Elements>
            ) : (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#af4b32]" />
              </div>
            )}
          </div>
        </div>
      </div>
      <SharedFooter />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#af4b32]" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  )
}
