import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-server"
import { CONTACT_INFO } from "@/lib/constants"

export async function GET(request: Request, { params }: { params: { bookingId: string } }) {
  try {
    const bookingId = params.bookingId

    // Extract numeric ID
    const numericId = bookingId.replace("JDO-", "")

    const supabase = getSupabaseAdmin()

    const { data: booking, error } = await supabase.from("bookings").select("*").eq("id", numericId).single()

    if (error || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Generate simple HTML invoice
    const invoiceHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #001c43; padding-bottom: 20px; }
          .header h1 { color: #001c43; margin: 0; }
          .header p { color: #666; }
          .invoice-details { margin: 30px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { background: #001c43; color: white; padding: 20px; margin-top: 20px; font-size: 18px; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>فاتورة | جادوا للسياحة والسفر</h1>
          <p>رقم الفاتورة: ${bookingId}</p>
          <p>التاريخ: ${new Date().toLocaleDateString("ar-SA")}</p>
        </div>
        
        <div class="invoice-details">
          <div class="detail-row">
            <strong>اسم العميل:</strong>
            <span>${booking.customer_name}</span>
          </div>
          <div class="detail-row">
            <strong>البريد الإلكتروني:</strong>
            <span>${booking.customer_email}</span>
          </div>
          <div class="detail-row">
            <strong>رقم الجوال:</strong>
            <span>${booking.customer_phone}</span>
          </div>
          <div class="detail-row">
            <strong>الباقة السياحية:</strong>
            <span>${booking.package_name}</span>
          </div>
          <div class="detail-row">
            <strong>تاريخ السفر:</strong>
            <span>${booking.travel_date}</span>
          </div>
          <div class="detail-row">
            <strong>عدد المسافرين:</strong>
            <span>${booking.adults_count} بالغين + ${booking.children_count} أطفال</span>
          </div>
          <div class="detail-row">
            <strong>حالة الحجز:</strong>
            <span>${booking.status === "paid" ? "مدفوع" : "قيد الانتظار"}</span>
          </div>
        </div>
        
        <div class="total">
          <div style="display: flex; justify-content: space-between;">
            <span>المبلغ الإجمالي:</span>
            <span style="font-size: 24px;">${booking.total_price.toLocaleString()} ريال</span>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>جادوا للسياحة والسفر</strong></p>
          <p>${CONTACT_INFO.address}</p>
          <p>الهاتف: ${CONTACT_INFO.phoneDisplay} | البريد: ${CONTACT_INFO.email}</p>
        </div>
      </body>
      </html>
    `

    return new NextResponse(invoiceHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="invoice-${bookingId}.html"`,
      },
    })
  } catch (error) {
    console.error("Error generating invoice:", error)
    return NextResponse.json({ error: "Failed to generate invoice" }, { status: 500 })
  }
}
