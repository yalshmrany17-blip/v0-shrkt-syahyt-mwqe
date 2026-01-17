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

**OUTPUT FORMATS:**
When user asks for destinations/options, ALWAYS return JSON proposal format.
When user confirms booking, return JSON itinerary format.
`

const DESTINATION_PROPOSALS: { [key: string]: any } = {
  alula: {
    type: "proposal",
    text: "يا بعد حيي! العلا من أجمل الأماكن في المملكة 🏜️ شف هالخيارات:",
    options: [
      {
        id: "alula-historical",
        title: "رحلة العلا التاريخية",
        description: "استكشف مدائن صالح والبلدة القديمة، كشتة ومناظر ولا في الخيال.",
        imageKeyword: "alula madain saleh",
        priceLevel: "💰💰💰",
      },
      {
        id: "alula-adventure",
        title: "مغامرات العلا الصحراوية",
        description: "تجربة صخرة الفيل ومطل حرة عويرض، ومغامرات في الصحراء.",
        imageKeyword: "alula elephant rock desert",
        priceLevel: "💰💰💰",
      },
    ],
  },
  riyadh: {
    type: "proposal",
    text: "أبشر! الرياض العاصمة فيها أماكن رهيبة 🏙️ اختر اللي يعجبك:",
    options: [
      {
        id: "riyadh-modern",
        title: "الرياض الحديثة",
        description: "برج المملكة وبوليفارد الرياض، تسوق وترفيه ومطاعم فاخرة.",
        imageKeyword: "riyadh kingdom tower boulevard",
        priceLevel: "💰💰",
      },
      {
        id: "riyadh-heritage",
        title: "الرياض التراثية",
        description: "حي الطريف ومتحف الرياض وقصر المصمك، تاريخ وأصالة.",
        imageKeyword: "riyadh diriyah masmak",
        priceLevel: "💰💰",
      },
    ],
  },
  jeddah: {
    type: "proposal",
    text: "تدلل! جدة عروس البحر الأحمر 🌊 هذي أحلى الخيارات:",
    options: [
      {
        id: "jeddah-historical",
        title: "جدة التاريخية",
        description: "البلد التاريخي والأسواق الشعبية، أجواء تراثية ساحرة.",
        imageKeyword: "jeddah albalad historical",
        priceLevel: "💰💰",
      },
      {
        id: "jeddah-modern",
        title: "جدة الحديثة",
        description: "الكورنيش ونافورة الملك فهد والواجهة البحرية.",
        imageKeyword: "jeddah corniche fountain",
        priceLevel: "💰💰",
      },
    ],
  },
  abha: {
    type: "proposal",
    text: "سم طال عمرك! أبها جوها رهيب 🌲 شف هالخيارات:",
    options: [
      {
        id: "abha-mountains",
        title: "أبها الجبلية",
        description: "جبل السودة والتلفريك، مناظر خلابة وجو بارد.",
        imageKeyword: "abha soudah mountains",
        priceLevel: "💰💰💰",
      },
      {
        id: "abha-heritage",
        title: "قرى أبها التراثية",
        description: "قرية رجال ألمع والمدرجات الزراعية، تراث عسيري أصيل.",
        imageKeyword: "abha rijal almaa village",
        priceLevel: "💰💰",
      },
    ],
  },
  redsea: {
    type: "proposal",
    text: "يا هلا! البحر الأحمر من أجمل الأماكن للاسترخاء 🏝️:",
    options: [
      {
        id: "redsea-diving",
        title: "غوص البحر الأحمر",
        description: "شعاب مرجانية وأسماك ملونة، تجربة لا تنسى.",
        imageKeyword: "red sea diving coral",
        priceLevel: "💰💰💰",
      },
      {
        id: "redsea-resort",
        title: "استرخاء الشواطئ",
        description: "منتجعات فاخرة على البحر، راحة واستجمام.",
        imageKeyword: "red sea resort beach",
        priceLevel: "💰💰💰",
      },
    ],
  },
}

const SMART_RESPONSES: { keywords: string[]; response: string; proposal?: any }[] = [
  {
    keywords: ["مرحبا", "هلا", "السلام", "اهلا", "هاي", "مساء", "صباح"],
    response: "يا هلا والله فيك! 🤩\n\nأنا **جادوا**، رفيقك في السفر داخل المملكة.\n\nعلمني طال عمرك، وش اسمك الكريم؟",
  },
  {
    keywords: ["اسمي", "انا"],
    response: "يا هلا يا بعد حيي! نورت والله 🌟\n\nطيب علمني، وين تبي تروح؟ أو قولي وش تبي: مغامرة، استرخاء، أو تراث؟",
  },
  {
    keywords: ["العلا", "علا", "مدائن صالح", "صخرة الفيل"],
    response: DESTINATION_PROPOSALS.alula.text,
    proposal: DESTINATION_PROPOSALS.alula,
  },
  {
    keywords: ["الرياض", "رياض"],
    response: DESTINATION_PROPOSALS.riyadh.text,
    proposal: DESTINATION_PROPOSALS.riyadh,
  },
  {
    keywords: ["جدة", "جده"],
    response: DESTINATION_PROPOSALS.jeddah.text,
    proposal: DESTINATION_PROPOSALS.jeddah,
  },
  {
    keywords: ["أبها", "ابها", "السودة", "عسير"],
    response: DESTINATION_PROPOSALS.abha.text,
    proposal: DESTINATION_PROPOSALS.abha,
  },
  {
    keywords: ["البحر الأحمر", "بحر احمر", "غوص", "شاطئ", "منتجع"],
    response: DESTINATION_PROPOSALS.redsea.text,
    proposal: DESTINATION_PROPOSALS.redsea,
  },
  {
    keywords: ["الباقات", "باقات", "الرحلات", "رحلات", "عروض", "خيارات", "وين اروح", "اقتراحات"],
    response: "سم طال عمرك! عندنا باقات تبيّض الوجه 🎉 اختر اللي يناسبك:",
    proposal: {
      type: "proposal",
      text: "سم طال عمرك! عندنا باقات تبيّض الوجه 🎉 اختر اللي يناسبك:",
      options: [
        {
          id: "riyadh-pkg",
          title: "الرياض العاصمة",
          description: "3 أيام - برج المملكة، الطريف، بوليفارد",
          imageKeyword: "riyadh kingdom tower",
          priceLevel: "💰💰",
        },
        {
          id: "jeddah-pkg",
          title: "جدة عروس البحر",
          description: "3 أيام - البلد التاريخي، الكورنيش، النافورة",
          imageKeyword: "jeddah corniche",
          priceLevel: "💰💰",
        },
        {
          id: "alula-pkg",
          title: "العلا الساحرة",
          description: "4 أيام - مدائن صالح، صخرة الفيل، تخييم",
          imageKeyword: "alula elephant rock",
          priceLevel: "💰💰💰",
        },
        {
          id: "abha-pkg",
          title: "أبها الباردة",
          description: "3 أيام - السودة، رجال ألمع، المدرجات",
          imageKeyword: "abha mountains",
          priceLevel: "💰💰💰",
        },
      ],
    },
  },
  {
    keywords: ["السعر", "الاسعار", "كم", "تكلفة", "سعر", "ميزانية"],
    response:
      "طال عمرك، هذي أسعارنا 💰\n\n**الرياض** (3 أيام): 2,500 ريال\n**جدة** (3 أيام): 2,800 ريال\n**أبها** (3 أيام): 3,200 ريال\n**العلا** (4 أيام): 4,500 ريال\n\n*الأسعار للشخص وتشمل كل شي*\n\nوش ميزانيتك تقريباً؟",
  },
  {
    keywords: ["حجز", "احجز", "اريد", "ابي", "ابغى", "ابغا", "اعتمد"],
    response:
      "أبشر بالي يسرك! 🎉\n\nعشان أجهز لك الحجز، قولي:\n\n1️⃣ أي باقة؟\n2️⃣ التاريخ المفضل؟\n3️⃣ كم شخص معك؟\n\nأو تحجز مباشرة من [صفحة الحجز](/booking)",
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

function findSmartResponse(message: string): { text: string; proposal?: any } | null {
  const lowerMessage = message.toLowerCase()
  for (const item of SMART_RESPONSES) {
    if (item.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return { text: item.response, proposal: item.proposal }
    }
  }
  return null
}

let conversationHistory: { role: string; content: string }[] = []

async function callAI(message: string): Promise<string> {
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

    const smartResponse = findSmartResponse(message)
    if (smartResponse) {
      return NextResponse.json({
        text: smartResponse.text,
        proposal: smartResponse.proposal,
        itinerary: null,
      })
    }

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
        text: "سم طال عمرك! اختر من هالخيارات:",
        proposal: {
          type: "proposal",
          text: "سم طال عمرك! اختر من هالخيارات:",
          options: [
            {
              id: "riyadh-pkg",
              title: "الرياض العاصمة",
              description: "3 أيام - برج المملكة، الطريف، بوليفارد",
              imageKeyword: "riyadh kingdom tower",
              priceLevel: "💰💰",
            },
            {
              id: "jeddah-pkg",
              title: "جدة عروس البحر",
              description: "3 أيام - البلد التاريخي، الكورنيش، النافورة",
              imageKeyword: "jeddah corniche",
              priceLevel: "💰💰",
            },
            {
              id: "alula-pkg",
              title: "العلا الساحرة",
              description: "4 أيام - مدائن صالح، صخرة الفيل، تخييم",
              imageKeyword: "alula elephant rock",
              priceLevel: "💰💰💰",
            },
            {
              id: "abha-pkg",
              title: "أبها الباردة",
              description: "3 أيام - السودة، رجال ألمع، المدرجات",
              imageKeyword: "abha mountains",
              priceLevel: "💰💰💰",
            },
          ],
        },
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
