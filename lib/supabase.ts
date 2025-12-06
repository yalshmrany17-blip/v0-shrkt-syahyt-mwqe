import { createBrowserClient } from "@supabase/ssr"

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance

  supabaseInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return supabaseInstance
}

// Types for database tables
export interface Booking {
  id: string
  package_name: string
  customer_name: string
  customer_email: string
  customer_phone: string
  travel_date: string
  adults_count: number
  children_count: number
  total_price: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
}

export interface ChatConversation {
  id: string
  session_id: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

export interface Lead {
  id: string
  name?: string
  email?: string
  phone?: string
  interest?: string
  source: string
  created_at: string
}
