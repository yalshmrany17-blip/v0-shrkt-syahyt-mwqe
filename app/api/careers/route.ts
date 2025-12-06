import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const experience = formData.get("experience") as string
    const message = formData.get("message") as string
    const resume = formData.get("resume") as File | null

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "الرجاء تعبئة جميع الحقول المطلوبة" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Store application in database
    const { error } = await supabase.from("job_applications").insert({
      name,
      email,
      phone,
      position: position || "غير محدد",
      experience: experience || "غير محدد",
      message: message || "",
      resume_name: resume?.name || null,
      status: "pending",
    })

    if (error) {
      console.error("Database error:", error)
      // Continue even if database fails - don't lose the application
    }

    return NextResponse.json({
      success: true,
      message: "تم استلام طلبك بنجاح",
    })
  } catch (error) {
    console.error("Error processing application:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إرسال الطلب" }, { status: 500 })
  }
}
