import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    const supabase = await getSupabaseServer()

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone,
      subject,
      message,
      status: "unread",
    })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    return NextResponse.json({ success: true, message: "تم إرسال الرسالة بنجاح" })
  } catch (error) {
    console.error("Error sending contact form:", error)
    return NextResponse.json({ success: false, message: "حدث خطأ أثناء إرسال الرسالة" }, { status: 500 })
  }
}
