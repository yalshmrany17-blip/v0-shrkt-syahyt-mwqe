import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const { bookingId, paymentIntentId, status } = await request.json()

    // Extract numeric ID from bookingId (e.g., "JDO-123" -> 123)
    const numericId = bookingId.replace("JDO-", "")

    const supabase = getSupabaseAdmin()

    // Update booking with payment information
    const { data, error } = await supabase
      .from("bookings")
      .update({
        status,
        payment_intent_id: paymentIntentId,
        payment_date: new Date().toISOString(),
      })
      .eq("id", numericId)
      .select()
      .single()

    if (error) {
      console.error("Error updating booking:", error)
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error processing payment update:", error)
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 })
  }
}
