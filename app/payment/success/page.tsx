"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { CheckCircle, Download, Home } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("booking_id") || ""

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SharedHeader />
      <div className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#001c43] mb-4">تم الدفع بنجاح!</h1>
            <p className="text-xl text-gray-600 mb-2">شكراً لك</p>
            <div className="bg-[#001c43]/5 rounded-2xl p-6 mb-8 inline-block">
              <p className="text-sm text-gray-500 mb-1">رقم الحجز</p>
              <p className="text-2xl font-bold text-[#001c43]">{bookingId}</p>
            </div>
            <p className="text-gray-500 mb-8">
              تم إرسال تفاصيل الحجز والفاتورة إلى بريدك الإلكتروني
              <br />
              <span className="text-sm">سيتم التواصل معك قريباً لتأكيد التفاصيل النهائية</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#af4b32] hover:bg-[#af4b32]/90 text-white rounded-full px-8 h-12">
                <a href={`/api/invoice/${bookingId}`} download>
                  <Download className="w-5 h-5 ml-2" />
                  تحميل الفاتورة
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 h-12 bg-transparent">
                <Link href="/">
                  <Home className="w-5 h-5 ml-2" />
                  العودة للرئيسية
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SharedFooter />
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
