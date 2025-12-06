import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, interest, source } = body

    const supabase = await getSupabaseServer()

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      interest,
      source: source || "ai_chat",
    })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving lead:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
