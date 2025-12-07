import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-server"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"

async function sendWhatsAppNotification(booking: {
  customerName: string
  customerPhone: string
  packageName: string
  travelDate: string
  totalPrice: number
  bookingId: string
}) {
  const message = `مرحباً ${booking.customerName}! 🎉

تم تأكيد حجزك في جادوا للسياحة بنجاح!

📦 الباقة: ${booking.packageName}
📅 تاريخ السفر: ${booking.travelDate}
💰 المبلغ الإجمالي: ${booking.totalPrice.toLocaleString()} ريال
🔢 رقم الحجز: ${booking.bookingId}

سيتواصل معك فريقنا قريباً لتأكيد التفاصيل.

شكراً لاختيارك جادوا! 🌟`

  // WhatsApp API URL (can be integrated with WhatsApp Business API)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${booking.customerPhone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(message)}`

  console.log("[v0] WhatsApp notification URL:", whatsappUrl)
  return whatsappUrl
}

function formatBookingEmail(booking: {
  customerName: string
  packageName: string
  travelDate: string
  adultsCount: number
  childrenCount: number
  totalPrice: number
  bookingId: string
}) {
  return {
    subject: `تأكيد الحجز - ${booking.packageName} | جادوا للسياحة`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #001c43 0%, #002a5c 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 30px; }
          .booking-details { background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #666; }
          .detail-value { font-weight: 600; color: #001c43; }
          .total-row { background: #001c43; color: white; padding: 15px 20px; border-radius: 8px; margin-top: 15px; }
          .cta-button { display: inline-block; background: #af4b32; color: white; padding: 15px 40px; border-radius: 30px; text-decoration: none; font-weight: 600; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 14px; }
          .social-links { margin: 15px 0; }
          .social-links a { margin: 0 10px; color: #001c43; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 تم تأكيد حجزك!</h1>
            <p>شكراً لاختيارك جادوا للسياحة</p>
          </div>
          <div class="content">
            <p>مرحباً <strong>${booking.customerName}</strong>،</p>
            <p>يسعدنا إبلاغك بأن حجزك قد تم بنجاح. فيما يلي تفاصيل حجزك:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">رقم الحجز</span>
                <span class="detail-value">${booking.bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">الباقة</span>
                <span class="detail-value">${booking.packageName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">تاريخ السفر</span>
                <span class="detail-value">${booking.travelDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">عدد البالغين</span>
                <span class="detail-value">${booking.adultsCount}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">عدد الأطفال</span>
                <span class="detail-value">${booking.childrenCount}</span>
              </div>
              <div class="total-row">
                <div style="display: flex; justify-content: space-between;">
                  <span>المبلغ الإجمالي</span>
                  <span style="font-size: 20px;">${booking.totalPrice.toLocaleString()} ريال</span>
                </div>
              </div>
            </div>
            
            <p>سيتواصل معك أحد ممثلي خدمة العملاء خلال 24 ساعة لتأكيد التفاصيل وترتيب الدفع.</p>
            
            <center>
              <a href="${CONTACT_INFO.whatsappLink}" class="cta-button">تواصل معنا عبر واتساب</a>
            </center>
          </div>
          <div class="footer">
            <div class="social-links">
              <a href="${SOCIAL_LINKS.instagram}">Instagram</a>
              <a href="${SOCIAL_LINKS.tiktok}">TikTok</a>
              <a href="${SOCIAL_LINKS.x}">X</a>
              <a href="${SOCIAL_LINKS.linkedin}">LinkedIn</a>
            </div>
            <p>© ${new Date().getFullYear()} جادوا للسياحة. جميع الحقوق محفوظة.</p>
            <p>${CONTACT_INFO.address} | ${CONTACT_INFO.phoneDisplay}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }
}

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

    const bookingId = data?.id || `JDO-${Date.now()}`

    const whatsappUrl = await sendWhatsAppNotification({
      customerName,
      customerPhone,
      packageName,
      travelDate,
      totalPrice: totalPrice || 0,
      bookingId,
    })

    const emailContent = formatBookingEmail({
      customerName,
      packageName,
      travelDate,
      adultsCount: adultsCount || 1,
      childrenCount: childrenCount || 0,
      totalPrice: totalPrice || 0,
      bookingId,
    })

    console.log("[v0] Email content prepared:", emailContent.subject)

    return NextResponse.json({
      success: true,
      message: "تم تأكيد الحجز بنجاح! سنتواصل معك قريباً",
      bookingId,
      whatsappUrl,
      emailSubject: emailContent.subject,
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
