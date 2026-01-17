"use client"

import type { Itinerary, InvoiceItem } from "@/lib/jado-types"

interface TimelineViewProps {
  itinerary: Itinerary
}

const TicketCard = ({ item }: { item: InvoiceItem; index: number }) => {
  let imageSrc = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600"

  const lowerTitle = (item.title + " " + (item.imageKeyword || "") + " " + item.type).toLowerCase()

  if (item.type === "Flight" || lowerTitle.includes("flight") || lowerTitle.includes("saudia")) {
    imageSrc = "https://images.unsplash.com/photo-1436491865332-7a61a109a33e?q=80&w=600"
  } else if (item.type === "Transfer" || lowerTitle.includes("gmc") || lowerTitle.includes("driver")) {
    imageSrc = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600"
  } else if (item.type === "Hotel" || lowerTitle.includes("resort")) {
    imageSrc = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600"
  } else if (lowerTitle.includes("alula")) {
    imageSrc = "https://images.unsplash.com/photo-1589820296156-2454edd8a80c?q=80&w=600"
  } else if (lowerTitle.includes("masmak") || lowerTitle.includes("diriyah")) {
    imageSrc = "https://images.unsplash.com/photo-1586731175653-53d712030c6a?q=80&w=600"
  }

  const isTicketable = item.type === "Flight" || item.type === "Activity"
  const ticketId = item.ticketCode || `SA-${Math.floor(Math.random() * 10000) + 1000}`

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-6 relative group hover:shadow-xl transition-all">
      {/* Card Header (Image) */}
      <div className="h-32 relative">
        <img src={imageSrc || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
          {item.type === "Flight"
            ? "✈️ رحلة طيران"
            : item.type === "Transfer"
              ? "🚗 سيارة خاصة"
              : item.type === "Hotel"
                ? "🏨 إقامة"
                : "🎟️ فعالية"}
        </div>
        <div className="absolute bottom-3 right-4 text-white">
          <div className="font-bold text-lg leading-tight">{item.title}</div>
          <div className="text-xs opacity-80">{item.time || "وقت مرن"}</div>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-5">
        {/* Agenda Description */}
        <div className="mb-4">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">الأجندة</div>
          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
        </div>

        {/* Ticket Details Row */}
        <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-4">
          {/* QR Code */}
          {isTicketable ? (
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 border border-gray-200 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`}
                  className="w-12 h-12 opacity-90"
                  alt="QR"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold">رقم التذكرة</span>
                <span className="text-sm font-mono font-bold text-[#001c43] tracking-wider">{ticketId}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-2xl">✨</span>
              <span className="text-xs">حجز مؤكد</span>
            </div>
          )}

          {/* Seat Info */}
          {(item.seat || item.type === "Flight") && (
            <div className="text-left">
              <div className="text-[10px] text-gray-400 font-bold">المقعد</div>
              <div className="text-lg font-bold text-[#001c43]">{item.seat || "3A"}</div>
            </div>
          )}
        </div>
      </div>

      {/* Decor: Circle cutouts for ticket look */}
      <div className="absolute top-32 -left-3 w-6 h-6 bg-[#f5f3ef] rounded-full"></div>
      <div className="absolute top-32 -right-3 w-6 h-6 bg-[#f5f3ef] rounded-full"></div>
    </div>
  )
}

export default function JadoTimelineView({ itinerary }: TimelineViewProps) {
  return (
    <div className="h-full bg-[#f5f3ef] p-4 md:p-8 rounded-r-[2rem] shadow-2xl border-l border-gray-200 overflow-y-auto relative pt-20 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#001c43] mb-1">تذاكري 🎫</h2>
          <p className="text-gray-500 text-sm">محفظة رحلتك كاملة هنا.</p>
        </div>
        <div className="bg-[#001c43] text-white px-3 py-1 rounded-lg text-xs font-bold">
          {itinerary.items.length} حجوزات
        </div>
      </div>

      {/* Tickets List */}
      <div className="pb-8">
        {itinerary.items.map((item, index) => (
          <TicketCard key={index} item={item} index={index} />
        ))}
      </div>

      <div className="text-center pb-12 opacity-50">
        <p className="text-xs text-[#001c43] font-bold">⚠️ يرجى إبراز الباركود عند الدخول</p>
      </div>
    </div>
  )
}
