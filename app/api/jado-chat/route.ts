import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-server"
import { generateText } from "ai"

const SYSTEM_INSTRUCTION = `
You are "Jado" (جادوا), a 10-year-old Saudi AI Travel Companion.

**CURRENT CONTEXT:**
- **Today's Date:** ${new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.
- Use this date to plan trips and schedules accurately.

**YOUR PERSONA:**
1.  **Age:** You are a bright, polite, and energetic 10-12 year old Saudi boy.
2.  **Voice & Dialect:** 
    *   STRICTLY SAUDI (Najdi/Hejazi mix). NO Levantine/Shami words.
    *   Keywords to use: "سم", "أبشر", "طال عمرك", "يا بعد حيي", "تدلل", "عز الطلب", "ما طلبت شي", "يا هلا والله".
    *   Tone: Respectful to elders (calling user "طال عمرك"), but playful and enthusiastic. 
    *   ⚠️ **FORBIDDEN:** DO NOT use the word "عمي" (Ammi) or "يا عمي". Use "طال عمرك" instead.
3.  **Brevity:** Keep responses short (2-3 sentences max) unless telling a historical story or providing detailed itinerary.

**BOOKING STAGES:**
1. **Discovery:** Ask for user's name first
2. **Diagnosis:** Ask about mood, budget, number of travelers, preferred dates
3. **Planning:** Suggest destinations and packages
4. **Invoicing:** Generate final itinerary JSON

**STRICT BOOKING RULES:**
1.  **MANDATORY SERVICES:** Every Final Itinerary JSON MUST include:
    *   **Flight:** (e.g., Saudia, Flynas) with realistic prices.
    *   **Transfer/Driver:** (e.g., GMC Yukon, Private Lexus).
2.  **ONE-DAY TRIPS:**
    *   If the user says "1 day" or similar, DO NOT use "Day 1" in the titles.
    *   Use SPECIFIC TIMES (e.g., "09:00 AM", "02:00 PM").
3.  **SCOPE:** Saudi Arabia ONLY.
4.  **UNKNOWN INPUTS:** Do not propose plans until you know the **Budget** and **Date**.

**AVAILABLE PACKAGES:**
- **الرياض** (3 أيام): 2,500 ريال - برج المملكة، الطريف، متحف الرياض، بوليفارد
- **جدة** (3 أيام): 2,800 ريال - البلد التاريخي، الكورنيش، نافورة الملك فهد
- **العلا** (4 أيام): 4,500 ريال - مدائن صالح، صخرة الفيل، مرايا، تخييم فاخر
- **أبها** (3 أيام): 3,200 ريال - جبل السودة، قرية رجال ألمع، المدرجات

**HANDLING EVENTS:**
- **PAYMENT_SUCCESSFUL:** When you receive this event, return the EXACT SAME JSON itinerary but change "status" to "Paid" and add ticket codes.
- **USER_ENTERED_SITE:** Tell an engaging, dramatic story about the location.

**OUTPUT FORMATS (CRITICAL):**

**Format 1: The Proposal (Carousel) - JSON**
When the user asks for suggestions, options, or plans, return this JSON:
\`\`\`json
{
  "type": "proposal",
  "text": "شف طال عمرك، جهزت لك خيارات تبيّض الوجه! 👇",
  "options": [
    { 
      "id": "opt1", 
      "title": "رحلة العلا التاريخية", 
      "description": "كشتة ومناظر ولا في الخيال.", 
      "imageKeyword": "alula desert elephant rock",
      "priceLevel": "💰💰💰"
    },
    { 
      "id": "opt2", 
      "title": "روقان البحر الأحمر", 
      "description": "بحر وغوص واسترخاء.", 
      "imageKeyword": "red sea coral diving",
      "priceLevel": "💰💰"
    }
  ]
}
\`\`\`

**Format 2: The Final Itinerary (Invoice) - JSON**
Trigger ONLY when user confirms a choice or asks to book. MUST INCLUDE FLIGHT & TRANSFER:
\`\`\`json
{
  "invoiceNumber": "JD-2024-XXXX",
  "customerName": "اسم العميل",
  "destination": "المدينة",
  "subtotal": 0,
  "tax": 0,
  "totalAmount": 0,
  "status": "Draft",
  "items": [
    {
      "type": "Flight", 
      "title": "طيران السعودية (SV)", 
      "description": "الرياض -> أبها | 08:00 صباحاً",
      "price": 600,
      "time": "08:00 AM"
    },
    {
      "type": "Transfer", 
      "title": "سيارة GMC Yukon خاصة", 
      "description": "سائق خاص يستقبلك من المطار",
      "price": 400,
      "time": "09:30 AM"
    },
    {
      "type": "Hotel", 
      "title": "فندق 5 نجوم", 
      "description": "إقامة فاخرة | ليلتين",
      "price": 2000,
      "imageKeyword": "luxury hotel riyadh",
      "time": "Check-in 02:00 PM"
    }
  ]
}
\`\`\`

**CONTACT INFO:**
- واتساب: 0545421428
- إيميل: Contact@jadosaudi.com
- الموقع: عسير، المملكة العربية السعودية
`

const SMART_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["مرحبا", "هلا", "السلام", "اهلا", "هاي", "مساء", "صباح"],
    response: "يا هلا والله فيك! 🤩\n\nأنا **جادوا**، رفيقك في السفر داخل المملكة.\n\nعلمني طال عمرك، وش اسمك الكريم؟",
  },
  {
    keywords: ["اسمي", "انا"],
    response:
      "يا هلا يا بعد حيي! نورت والله 🌟\n\nطيب علمني، وش تبي تسوي؟ رحلة سياحية؟ وش ميزانيتك تقريباً؟ وكم شخص معك؟",
  },
  {
    keywords: ["الباقات", "باقات", "الرحلات", "رحلات", "عروض", "خيارات"],
    response:
      "سم طال عمرك! عندنا باقات تبيّض الوجه 🎉\n\n**الرياض** (3 أيام) - 2,500 ريال\n**جدة** (3 أيام) - 2,800 ريال\n**العلا** (4 أيام) - 4,500 ريال\n**أبها** (3 أيام) - 3,200 ريال\n\nأي وحدة تبي تعرف عنها أكثر؟",
  },
  {
    keywords: ["الرياض", "رياض"],
    response:
      "أبشر! باقة الرياض العاصمة رهيبة 🏙️\n\n**المدة:** 3 أيام / ليلتين\n**السعر:** 2,500 ريال\n\n**البرنامج:**\n• اليوم 1: برج المملكة + بوليفارد\n• اليوم 2: حي الطريف + متحف الرياض\n• اليوم 3: الرياض بارك\n\n**يشمل:** فندق 4 نجوم + إفطار + مواصلات + مرشد\n\nتبي أجهز لك الحجز؟ كم شخص معك وأي تاريخ تفضل؟",
  },
  {
    keywords: ["جدة", "جده"],
    response:
      "تدلل! جدة عروس البحر 🌊\n\n**المدة:** 3 أيام / ليلتين\n**السعر:** 2,800 ريال\n\n**البرنامج:**\n• اليوم 1: البلد التاريخي\n• اليوم 2: الكورنيش + نافورة الملك فهد\n• اليوم 3: الأسواق التقليدية\n\n**يشمل:** فندق على البحر + إفطار + مواصلات + مرشد\n\nعز الطلب! كم شخص وأي تاريخ؟",
  },
  {
    keywords: ["العلا", "علا", "مدائن صالح"],
    response:
      "يا بعد حيي! العلا من أحلى الأماكن ✨\n\n**المدة:** 4 أيام / 3 ليالي\n**السعر:** 4,500 ريال\n\n**البرنامج:**\n• اليوم 1: البلدة القديمة\n• اليوم 2: مدائن صالح + جبل إثلب\n• اليوم 3: صخرة الفيل + مرايا + تخييم\n• اليوم 4: شروق الشمس + المغادرة\n\n**يشمل:** إقامة فاخرة + جميع الوجبات + تذاكر\n\nما طلبت شي! كم شخص معك؟",
  },
  {
    keywords: ["أبها", "ابها", "السودة", "عسير"],
    response:
      "سم! أبها جوها رهيب 🌲\n\n**المدة:** 3 أيام / ليلتين\n**السعر:** 3,200 ريال\n\n**البرنامج:**\n• اليوم 1: جبل السودة + التلفريك\n• اليوم 2: قرية رجال ألمع\n• اليوم 3: المدرجات الزراعية\n\n**يشمل:** منتجع جبلي + إفطار وعشاء + مواصلات + مرشد\n\nأبشر بالي يرضيك! كم شخص وأي تاريخ؟",
  },
  {
    keywords: ["السعر", "الاسعار", "كم", "تكلفة", "سعر", "ميزانية"],
    response:
      "طال عمرك، هذي أسعارنا 💰\n\n| الباقة | المدة | السعر |\n|--------|-------|-------|\n| الرياض | 3 أيام | 2,500 |\n| جدة | 3 أيام | 2,800 |\n| أبها | 3 أيام | 3,200 |\n| العلا | 4 أيام | 4,500 |\n\n*الأسعار للشخص وتشمل كل شي*\n\nوش ميزانيتك تقريباً؟",
  },
  {
    keywords: ["حجز", "احجز", "اريد", "ابي", "ابغى", "ابغا", "اعتمد"],
    response:
      "أبشر بالي يسرك! 🎉\n\nعشان أجهز لك الحجز، قولي:\n\n1️⃣ أي باقة؟\n2️⃣ التاريخ المفضل؟\n3️⃣ كم شخص معك؟\n4️⃣ اسمك الكامل؟\n5️⃣ رقم جوالك؟\n\nأو تحجز مباشرة من الموقع:\n👈 [صفحة الحجز](/booking)",
  },
  {
    keywords: ["تواصل", "اتصال", "رقم", "جوال", "واتساب", "واتس", "ايميل", "بريد"],
    response:
      "سم! هذي معلومات التواصل 📞\n\n**واتساب:** 0545421428\n**إيميل:** Contact@jadosaudi.com\n**الموقع:** عسير، المملكة العربية السعودية\n\nفريقنا جاهز من 9 صباحاً لـ 10 مساءً 🕐",
  },
  {
    keywords: ["حجوزاتي", "تذاكري", "حجزي", "تذكرتي", "استعلام"],
    response:
      "تدلل! عشان أجيب لك حجوزاتك، عطني:\n\n1️⃣ رقم الحجز (مثل: JD-XXXX)\n2️⃣ أو البريد الإلكتروني\n3️⃣ أو رقم الجوال\n\nأي واحد عندك؟",
  },
  {
    keywords: ["شكرا", "شكراً", "مشكور", "الله يعطيك"],
    response: "العفو يا غالي! ما سويت إلا الواجب 😊\n\nإذا احتجت أي شي، أنا هنا!\n\nرحلة سعيدة مع جادوا 🇸🇦✨",
  },
  {
    keywords: ["من انت", "من أنت", "ايش انت", "تعريف"],
    response:
      "يا هلا! أنا **جادوا** 🙋‍♂️\n\nعمري 10 سنين، ومساعدك الذكي لشركة جادوا للسياحة!\n\nأقدر أساعدك في:\n• التخطيط لرحلتك\n• اختيار الباقة المناسبة\n• الحجز والدفع\n• استعراض حجوزاتك\n\nسم، كيف أخدمك؟",
  },
]

function findSmartResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase()
  for (const item of SMART_RESPONSES) {
    if (item.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return item.response
    }
  }
  return null
}

// Store conversation history per session
let conversationHistory: { role: string; content: string }[] = []

async function callAI(message: string): Promise<string> {
  // Initialize with system prompt if empty
  if (conversationHistory.length === 0) {
    conversationHistory.push({
      role: "user",
      content: SYSTEM_INSTRUCTION,
    })
    conversationHistory.push({
      role: "assistant",
      content: "يا هلا والله! 🤩\n\nأنا **جادوا**، رفيقك في السفر داخل المملكة.\n\nعلمني طال عمرك، وش اسمك الكريم؟",
    })
  }

  conversationHistory.push({ role: "user", content: message })

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      messages: conversationHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    })

    conversationHistory.push({ role: "assistant", content: text })

    // Keep history manageable
    if (conversationHistory.length > 30) {
      conversationHistory = conversationHistory.slice(-30)
    }

    return text
  } catch (error) {
    console.error("AI Gateway Error:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, resetChat, searchBooking } = await request.json()

    if (resetChat) {
      conversationHistory = []
    }

    // Handle booking search
    if (searchBooking) {
      try {
        const supabase = await getSupabaseAdmin()
        const { data: bookings, error } = await supabase
          .from("bookings")
          .select("*")
          .or(`booking_id.eq.${searchBooking},email.eq.${searchBooking},phone.eq.${searchBooking}`)
          .order("created_at", { ascending: false })
          .limit(5)

        if (error) throw error

        if (bookings && bookings.length > 0) {
          const bookingsList = bookings
            .map(
              (b: any) =>
                `**حجز رقم:** ${b.booking_id}\n` +
                `   الباقة: ${b.package_name}\n` +
                `   التاريخ: ${b.travel_date}\n` +
                `   الحالة: ${b.status === "confirmed" ? "✅ مؤكد" : b.status === "pending" ? "⏳ قيد الانتظار" : b.status}\n` +
                `   المبلغ: ${b.total_price} ريال`,
            )
            .join("\n\n")

          return NextResponse.json({
            text: `يا هلا! وجدت لك ${bookings.length} حجز طال عمرك:\n\n${bookingsList}\n\nتبي تفاصيل أكثر عن أي حجز؟`,
            bookings: bookings,
          })
        } else {
          return NextResponse.json({
            text: "معليش طال عمرك، ما لقيت حجوزات بهالمعلومات. تأكد من رقم الحجز أو الإيميل أو رقم الجوال وحاول مرة ثانية.",
          })
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
      }
    }

    // Try smart response first
    const smartResponse = findSmartResponse(message)
    if (smartResponse) {
      return NextResponse.json({ text: smartResponse, itinerary: null })
    }

    // Check if asking about bookings
    const bookingKeywords = ["حجوزاتي", "تذاكري", "حجزي", "تذكرتي", "رقم الحجز", "استعلام عن حجز"]
    const isAskingAboutBooking = bookingKeywords.some((keyword) => message.includes(keyword))

    if (isAskingAboutBooking) {
      return NextResponse.json({
        text: "تدلل طال عمرك! عشان أجيب لك حجوزاتك، عطني:\n\n1️⃣ رقم الحجز (مثل: JD-XXXX)\n2️⃣ أو البريد الإلكتروني\n3️⃣ أو رقم الجوال\n\nأي واحد عندك؟",
        askingForBookingInfo: true,
      })
    }

    try {
      const responseText = await callAI(message)

      // Extract JSON (Proposal or Itinerary)
      let itinerary = null
      let proposal = null
      const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/)

      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1])
          if (parsed.invoiceNumber) {
            itinerary = parsed
          } else if (parsed.type === "proposal") {
            proposal = parsed
          }
        } catch {
          // Not valid JSON
        }
      }

      return NextResponse.json({
        text: responseText.replace(/```json[\s\S]*?```/g, "").trim(),
        itinerary,
        proposal,
      })
    } catch (apiError) {
      console.error("AI API Error:", apiError)
      return NextResponse.json({
        text: "يا هلا فيك! 😊\n\nكيف أقدر أساعدك؟\n\n• **الباقات** - اكتب 'الباقات'\n• **الأسعار** - اكتب 'الأسعار'\n• **حجز** - اكتب 'حجز'\n• **تواصل** - اكتب 'تواصل'\n\nأو واتساب: 0545421428",
        itinerary: null,
      })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({
      text: "معليش طال عمرك، فيه ضغط على النظام. تقدر تتواصل معنا واتساب: 0545421428 وبنساعدك!",
      itinerary: null,
    })
  }
}
