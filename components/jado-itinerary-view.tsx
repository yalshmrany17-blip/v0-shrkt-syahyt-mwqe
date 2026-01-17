"use client"

import { useState } from "react"
import type { Itinerary, InvoiceItem } from "@/lib/jado-types"

interface ItineraryViewProps {
  itinerary: Itinerary
  onConfirm: (email: string) => void
}

const InvoiceItemRow = ({ item }: { item: InvoiceItem }) => {
  let imgUrl = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600"
  let emoji = "📍"

  const lowerTitle = (item.title + " " + (item.imageKeyword || "") + " " + item.type).toLowerCase()

  if (item.type === "Flight" || lowerTitle.includes("flight")) {
    imgUrl = "https://images.unsplash.com/photo-1436491865332-7a61a109a33e?q=80&w=600"
    emoji = "✈️"
  } else if (item.type === "Transfer" || lowerTitle.includes("gmc") || lowerTitle.includes("driver")) {
    imgUrl = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600"
    emoji = "🚗"
  } else if (
    lowerTitle.includes("island") ||
    lowerTitle.includes("sheybarah") ||
    lowerTitle.includes("red sea") ||
    lowerTitle.includes("maldive")
  ) {
    imgUrl = "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600"
    emoji = "🏝️"
  } else if (lowerTitle.includes("palace") || lowerTitle.includes("fort") || lowerTitle.includes("masmak")) {
    imgUrl = "https://images.unsplash.com/photo-1586731175653-53d712030c6a?q=80&w=600"
    emoji = "🏰"
  } else if (lowerTitle.includes("hotel") || lowerTitle.includes("resort")) {
    imgUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600"
    emoji = "🛏️"
  }

  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors items-center group">
      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-200 flex-shrink-0 relative">
        <img
          src={imgUrl || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 right-0 bg-white/80 p-0.5 rounded-tl-md text-xs">{emoji}</div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-[#001c43] text-sm">{item.title}</h4>
          <span className="font-bold text-[#001c43] text-sm whitespace-nowrap">{item.price.toLocaleString()} ر.س</span>
        </div>
        <p className="text-xs text-gray-500 mb-2">{item.description}</p>

        {item.time && (
          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-mono">🕒 {item.time}</span>
        )}
      </div>
    </div>
  )
}

const TripStatsInfographic = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100 shadow-inner">
      <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
        <span>📊</span> تحليل الرحلة
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold w-12 text-gray-500">مغامرة</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-orange-400 w-[70%] rounded-r-full shadow-sm"></div>
          </div>
          <span className="text-[10px] font-bold text-orange-600">70%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold w-12 text-gray-500">استجمام</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-blue-400 w-[45%] rounded-r-full shadow-sm"></div>
          </div>
          <span className="text-[10px] font-bold text-blue-600">45%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold w-12 text-gray-500">تراث</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-[#c8a45e] w-[85%] rounded-r-full shadow-sm"></div>
          </div>
          <span className="text-[10px] font-bold text-[#c8a45e]">85%</span>
        </div>
      </div>
    </div>
  )
}

export default function JadoItineraryView({ itinerary, onConfirm }: ItineraryViewProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple">("card")

  const handleConfirm = () => {
    if (!email || !email.includes("@")) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      onConfirm(email)
    }, 2000)
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4 md:p-8 rounded-r-[2rem] shadow-2xl border-l border-gray-200 relative">
      {/* Invoice Paper Effect */}
      <div className="bg-white shadow-xl rounded-sm overflow-hidden min-h-[600px] flex flex-col relative">
        {/* Top Accent */}
        <div className="h-3 bg-[#001c43] w-full"></div>

        {/* Header */}
        <div className="p-8 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#001c43]">فاتورة موحدة</h1>
              <p className="text-gray-400 text-sm mt-1">Unified Tax Invoice</p>
            </div>
            <div className="text-left">
              <div className="text-[#001c43] font-bold text-xl"># {itinerary.invoiceNumber}</div>
              <div className="text-gray-500 text-xs">{new Date().toLocaleDateString("en-GB")}</div>
              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-bold inline-block text-center border ${itinerary.status === "Paid" ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}
              >
                {itinerary.status === "Paid" ? "مدفوعة بالكامل" : "مسودة"}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Infographic */}
        <div className="px-4 mt-4">
          <TripStatsInfographic />
        </div>

        {/* Items List */}
        <div className="p-4 flex-1">
          {itinerary.items.map((item, idx) => (
            <InvoiceItemRow key={idx} item={item} />
          ))}
        </div>

        {/* Totals Section */}
        <div className="bg-gray-50 p-8 border-t border-gray-200">
          <div className="flex justify-between text-gray-500 text-sm mb-2">
            <span>المجموع الفرعي</span>
            <span>{itinerary.subtotal?.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <span>الضريبة (15%)</span>
            <span>{itinerary.tax?.toLocaleString()} ر.س</span>
          </div>
          <div className="w-full h-px bg-gray-300 mb-4"></div>
          <div className="flex justify-between text-2xl font-bold text-[#001c43] items-center">
            <span>الإجمالي</span>
            <span>{itinerary.totalAmount?.toLocaleString()} ر.س</span>
          </div>
        </div>

        {/* Payment & Action Button */}
        {itinerary.status !== "Paid" && (
          <div className="p-8 pt-6 bg-white border-t border-gray-100">
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#001c43] mb-2">البريد الإلكتروني (لاستلام التذاكر)</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 rounded-xl border-2 ${emailError ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"} text-gray-900 placeholder-gray-400 focus:border-[#001c43] focus:ring-0 outline-none transition-all text-left font-bold shadow-sm`}
                dir="ltr"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod("apple")}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${paymentMethod === "apple" ? "border-black bg-black text-white shadow-lg" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}
              >
                <span className="text-lg"></span>
                <span className="font-bold text-sm">Pay</span>
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${paymentMethod === "card" ? "border-[#001c43] bg-blue-50 text-[#001c43] shadow-sm" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}
              >
                <span className="text-lg">💳</span>
                <span className="font-bold text-sm">بطاقة / مدى</span>
              </button>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-bold text-white
                ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#001c43] hover:bg-[#001c43]/90 hover:scale-[1.01] active:scale-[0.99]"}
              `}
            >
              {isProcessing ? (
                <span>جاري الاتصال بالبنك...</span>
              ) : (
                <>
                  <span>{paymentMethod === "apple" ? " Pay" : "إتمام الدفع"}</span>
                  <span>{itinerary.totalAmount?.toLocaleString()} ر.س</span>
                </>
              )}
            </button>

            <div className="flex justify-center items-center gap-4 mt-4 opacity-50 grayscale">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                className="h-4"
                alt="Mastercard"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                className="h-3"
                alt="Visa"
              />
              <span className="text-[10px] font-bold border border-gray-400 px-1 rounded text-gray-600">mada</span>
            </div>
          </div>
        )}

        {itinerary.status === "Paid" && (
          <div className="p-8 bg-green-50 border-t border-green-100 text-center">
            <p className="text-green-800 font-bold mb-2">تم الدفع بنجاح ✅</p>
            <p className="text-xs text-green-700">تم إرسال التذاكر والفاتورة النهائية إلى بريدك</p>
          </div>
        )}
      </div>
    </div>
  )
}
