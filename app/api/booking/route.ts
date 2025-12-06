import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      packageName,
      customerName,
      customerEmail,
      customerPhone,
      travelDate,
      adultsCount,
      childrenCount,
      totalPrice,
      notes,
    } = body

    // Validate required fields
    if (!packageName || !customerName || !customerEmail || !customerPhone || !travelDate) {
      return NextResponse.json(
        {
          success: false,
          message: "جميع الحقول المطلوبة يجب ملؤها",
        },
        { status: 400 },
      )
    }

    // Save booking to Supabase
    const supabase = await getSupabaseServer()

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        package_name: packageName,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        travel_date: travelDate,
        adults_count: adultsCount || 1,
        children_count: childrenCount || 0,
        total_price: totalPrice,
        notes,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "تم تأكيد الحجز بنجاح! سنتواصل معك قريباً",
      bookingId: data?.id,
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى",
      },
      { status: 500 },
    )
  }
}
