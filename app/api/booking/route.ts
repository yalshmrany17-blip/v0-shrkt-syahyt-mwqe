import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-server"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const DOMAIN_VERIFIED = true
const VERIFIED_FROM_EMAIL = "جادوا للسياحة <noreply@send.jadosaudi.com>"
const TEST_FROM_EMAIL = "جادوا للسياحة <onboarding@resend.dev>"
const ADMIN_EMAIL = "Contact@jadosaudi.com"
const TEST_EMAIL = "yalshmrany17@gmail.com"

async function sendBookingEmail(booking: {
  customerName: string
  customerEmail: string
  packageName: string
  travelDate: string
  adultsCount: number
  childrenCount: number
  totalPrice: number
  bookingId: string
}) {
  const testNotice = DOMAIN_VERIFIED
    ? ""
    : `
    <div class="test-notice">
      <strong>ملاحظة:</strong> هذا الإيميل للاختبار - إيميل العميل الفعلي: ${booking.customerEmail}
    </div>
  `

  const emailHtml = `
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
        .invoice-button { display: inline-block; background: #f0f0f0; color: #001c43; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 10px 5px; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 14px; }
        .social-links { margin: 15px 0; }
        .social-links a { margin: 0 10px; color: #001c43; text-decoration: none; }
        .test-notice { background: #fff3cd; color: #856404; padding: 10px; margin-bottom: 15px; border-radius: 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>تم تأكيد حجزك!</h1>
          <p>شكراً لاختيارك جادوا للسياحة</p>
        </div>
        <div class="content">
          ${testNotice}
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
          
          <p>يمكنك الدفع الآن عبر البطاقة البنكية أو التواصل معنا عبر واتساب لترتيب الدفع.</p>
          
          <center>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://jadosaudi.com"}/api/invoice/${booking.bookingId}" class="invoice-button">📄 تحميل الفاتورة</a>
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
  `

  if (!resend) {
    console.log("[v0] RESEND_API_KEY not configured - email not sent")
    return { sent: false, reason: "RESEND_API_KEY not configured" }
  }

  try {
    const fromEmail = DOMAIN_VERIFIED ? VERIFIED_FROM_EMAIL : TEST_FROM_EMAIL
    const toEmail = DOMAIN_VERIFIED ? booking.customerEmail : TEST_EMAIL

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `تأكيد الحجز #${booking.bookingId} - ${booking.packageName} | جادوا للسياحة`,
      html: emailHtml,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return { sent: false, error: error.message }
    }

    console.log("[v0] Email sent successfully to:", toEmail, "ID:", data?.id)
    return { sent: true, id: data?.id }
  } catch (err) {
    console.error("[v0] Failed to send email:", err)
    return { sent: false, error: "Failed to send email" }
  }
}

async function sendAdminNotification(booking: {
  customerName: string
  customerEmail: string
  customerPhone: string
  packageName: string
  travelDate: string
  adultsCount: number
  childrenCount: number
  totalPrice: number
  bookingId: string
  notes?: string
}) {
  if (!resend) return

  const adminEmailHtml = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; }
        .header { background: #af4b32; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .detail { padding: 10px 0; border-bottom: 1px solid #eee; }
        .label { color: #666; font-size: 14px; }
        .value { font-weight: bold; color: #001c43; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin:0;">حجز جديد!</h2>
          <p style="margin:5px 0 0;">رقم الحجز: ${booking.bookingId}</p>
        </div>
        
        <div class="detail">
          <div class="label">اسم العميل</div>
          <div class="value">${booking.customerName}</div>
        </div>
        <div class="detail">
          <div class="label">البريد الإلكتروني</div>
          <div class="value">${booking.customerEmail}</div>
        </div>
        <div class="detail">
          <div class="label">رقم الجوال</div>
          <div class="value">${booking.customerPhone}</div>
        </div>
        <div class="detail">
          <div class="label">الباقة</div>
          <div class="value">${booking.packageName}</div>
        </div>
        <div class="detail">
          <div class="label">تاريخ السفر</div>
          <div class="value">${booking.travelDate}</div>
        </div>
        <div class="detail">
          <div class="label">عدد المسافرين</div>
          <div class="value">${booking.adultsCount} بالغين + ${booking.childrenCount} أطفال</div>
        </div>
        <div class="detail">
          <div class="label">المبلغ الإجمالي</div>
          <div class="value" style="font-size: 18px; color: #af4b32;">${booking.totalPrice.toLocaleString()} ريال</div>
        </div>
        ${
          booking.notes
            ? `
        <div class="detail">
          <div class="label">ملاحظات</div>
          <div class="value">${booking.notes}</div>
        </div>
        `
            : ""
        }
        
        <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
          <a href="https://wa.me/${booking.customerPhone.replace(/[^0-9]/g, "")}" style="color: #25D366; text-decoration: none; font-weight: bold;">
            تواصل مع العميل عبر واتساب
          </a>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const fromEmail = DOMAIN_VERIFIED ? VERIFIED_FROM_EMAIL : TEST_FROM_EMAIL
    const toEmail = DOMAIN_VERIFIED ? ADMIN_EMAIL : TEST_EMAIL

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[حجز جديد] ${booking.packageName} - ${booking.customerName} | #${booking.bookingId}`,
      html: adminEmailHtml,
    })
    console.log("[v0] Admin notification sent to:", toEmail)
  } catch (err) {
    console.error("[v0] Failed to send admin notification:", err)
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

    console.log("[v0] Received booking request:", { packageName, customerName, customerEmail })

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

    const supabase = getSupabaseAdmin()

    console.log("[v0] Inserting booking into Supabase...")

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
        notes: notes || null,
        status: "pending",
        payment_status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json(
        {
          success: false,
          message: "حدث خطأ أثناء حفظ الحجز. يرجى المحاولة مرة أخرى",
          error: error.message,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Booking created successfully:", data)

    const bookingId = data?.id ? `JDO-${data.id}` : `JDO-${Date.now()}`

    // Send emails
    const emailResult = await sendBookingEmail({
      customerName,
      customerEmail,
      packageName,
      travelDate,
      adultsCount: adultsCount || 1,
      childrenCount: childrenCount || 0,
      totalPrice: totalPrice || 0,
      bookingId,
    })

    await sendAdminNotification({
      customerName,
      customerEmail,
      customerPhone,
      packageName,
      travelDate,
      adultsCount: adultsCount || 1,
      childrenCount: childrenCount || 0,
      totalPrice: totalPrice || 0,
      bookingId,
      notes,
    })

    const whatsappMessage = `مرحباً، أنا ${customerName}
تم حجزي للباقة: ${packageName}
رقم الحجز: ${bookingId}
تاريخ السفر: ${travelDate}`

    const whatsappUrl = `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`

    return NextResponse.json({
      success: true,
      message: "تم تأكيد الحجز بنجاح! سنتواصل معك قريباً",
      bookingId,
      whatsappUrl,
      emailSent: emailResult.sent,
    })
  } catch (error) {
    console.error("[v0] Error creating booking:", error)
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
