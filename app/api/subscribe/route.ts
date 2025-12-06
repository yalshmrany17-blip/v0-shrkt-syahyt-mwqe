import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "البريد الإلكتروني غير صالح" }, { status: 400 })
    }

    const supabase = await getSupabaseServer()

    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email, is_active: true }, { onConflict: "email" })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "تم الاشتراك بنجاح! شكراً لك",
    })
  } catch (error) {
    console.error("Error subscribing:", error)
    return NextResponse.json({ success: false, message: "حدث خطأ أثناء الاشتراك" }, { status: 500 })
  }
}
