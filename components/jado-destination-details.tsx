"use client"

import type { DestinationDetails } from "@/lib/jado-types"

interface Props {
  details: DestinationDetails
  onBook: () => void
  onClose: () => void
}

export default function JadoDestinationDetails({ details, onBook, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header Image */}
        <div className="relative h-48 sm:h-56">
          <img
            src={details.imageUrl || "/placeholder.svg"}
            alt={details.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#001c43] hover:bg-white transition-colors shadow-lg"
          >
            ✕
          </button>
          <div className="absolute bottom-4 right-4 left-4">
            <h2 className="text-2xl font-bold text-white mb-1">{details.title}</h2>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <span className="flex items-center gap-1">
                <span>🕐</span> {details.duration}
              </span>
              <span className="flex items-center gap-1">
                <span>💰</span> {details.price.toLocaleString()} ريال
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-14rem)]" dir="rtl">
          <p className="text-gray-600 mb-6 leading-relaxed">{details.description}</p>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-bold text-[#001c43] mb-3 flex items-center gap-2">
              <span className="text-[#c8a45e]">✨</span> أبرز المميزات
            </h3>
            <div className="flex flex-wrap gap-2">
              {details.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="bg-[#f5f3ef] text-[#001c43] px-3 py-1.5 rounded-full text-sm border border-[#c8a45e]/20"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Program */}
          <div className="mb-6">
            <h3 className="font-bold text-[#001c43] mb-3 flex items-center gap-2">
              <span className="text-[#c8a45e]">📋</span> البرنامج السياحي
            </h3>
            <div className="space-y-4">
              {details.program.map((day) => (
                <div key={day.day} className="bg-[#f5f3ef] rounded-xl p-4 border border-[#c8a45e]/10">
                  <h4 className="font-bold text-[#001c43] mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 bg-[#001c43] text-white rounded-full flex items-center justify-center text-xs">
                      {day.day}
                    </span>
                    {day.title}
                  </h4>
                  <div className="space-y-2">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-[#c8a45e] font-mono text-xs w-14 flex-shrink-0">{act.time}</span>
                        <div>
                          <span className="text-[#001c43]">{act.activity}</span>
                          {act.location && <span className="text-gray-400 text-xs mr-2">📍 {act.location}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Includes */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-bold text-[#001c43] mb-2 text-sm flex items-center gap-1">
                <span className="text-green-500">✓</span> يشمل
              </h3>
              <ul className="space-y-1">
                {details.includes.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#001c43] mb-2 text-sm flex items-center gap-1">
                <span className="text-red-500">✗</span> لا يشمل
              </h3>
              <ul className="space-y-1">
                {details.excludes.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer - Book Button */}
        <div className="p-4 bg-[#f5f3ef] border-t border-[#c8a45e]/20">
          <button
            onClick={onBook}
            className="w-full py-4 bg-gradient-to-l from-[#001c43] to-[#002855] text-white rounded-xl font-bold text-lg hover:from-[#002855] hover:to-[#003366] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>احجز الآن</span>
            <span className="text-[#c8a45e]">🎫</span>
            <span className="text-sm font-normal opacity-80">({details.price.toLocaleString()} ريال)</span>
          </button>
        </div>
      </div>
    </div>
  )
}
