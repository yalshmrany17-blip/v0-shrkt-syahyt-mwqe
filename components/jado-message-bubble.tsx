"use client"

import type { Message, ProposalOption, GroundingChunk } from "@/lib/jado-types"
import { Sender } from "@/lib/jado-types"

const JADO_AVATAR =
  "/images/d8-b5-d9-88-d8-b1-d8-a9-20-d8-ac-d8-a7-d8-af-d9-88-d8-a7-20-d9-85-d9-82-d8-b1-d8-a8-d8-a9-20.png"

interface MessageBubbleProps {
  message: Message
  isPlaying?: boolean
  onToggleAudio?: (id: string, base64: string) => void
  onSelectOption?: (option: ProposalOption) => void
  onExploreMore?: (option: ProposalOption) => void
}

export default function JadoMessageBubble({
  message,
  isPlaying,
  onToggleAudio,
  onSelectOption,
  onExploreMore,
}: MessageBubbleProps) {
  const isUser = message.sender === Sender.User

  const renderGrounding = (chunks: GroundingChunk[]) => {
    const webChunks = chunks.filter((c) => c.web && !c.maps)
    if (webChunks.length === 0) return null

    return (
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
        {webChunks.map((chunk, idx) => (
          <a
            key={idx}
            href={chunk.web!.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-white/50 hover:bg-white border border-gray-200 px-2 py-1 rounded-md text-[10px] text-gray-600 transition-colors"
          >
            <span>🔗</span>
            <span className="truncate max-w-[100px]">{chunk.web!.title}</span>
          </a>
        ))}
      </div>
    )
  }

  const getImageUrl = (keyword: string) => {
    const lower = keyword.toLowerCase()
    if (lower.includes("alula") || lower.includes("العلا"))
      return "https://images.unsplash.com/photo-1589820296156-2454edd8a80c?q=80&w=600"
    if (lower.includes("red sea") || lower.includes("diving") || lower.includes("بحر"))
      return "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600"
    if (lower.includes("jeddah") || lower.includes("جدة") || lower.includes("جده"))
      return "https://images.unsplash.com/photo-1565552632288-444d370b4718?q=80&w=600"
    if (lower.includes("abha") || lower.includes("أبها") || lower.includes("ابها") || lower.includes("عسير"))
      return "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=600"
    if (lower.includes("riyadh") || lower.includes("الرياض") || lower.includes("رياض"))
      return "https://images.unsplash.com/photo-1566249673998-d6995038f972?q=80&w=600"
    return "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600"
  }

  return (
    <div className={`flex w-full mb-6 ${isUser ? "justify-start" : "justify-end"}`}>
      <div className={`flex flex-col max-w-[90%] md:max-w-[85%] ${isUser ? "items-start" : "items-end"} gap-1`}>
        <div className={`flex ${isUser ? "flex-row" : "flex-row-reverse"} items-end gap-2 w-full`}>
          {!isUser && (
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#c8a45e] bg-[#f5f3ef] flex-shrink-0 mb-1 shadow-md">
              <img src={JADO_AVATAR || "/placeholder.svg"} alt="جادوا" className="w-full h-full object-cover" />
            </div>
          )}

          <div
            className={`relative p-4 md:p-5 rounded-2xl shadow-sm border transition-all ${
              isUser
                ? "bg-[#001c43] text-white rounded-br-none border-[#001c43]"
                : "bg-white text-[#001c43] border-gray-100 rounded-bl-none"
            }`}
          >
            {message.imageUrl && (
              <img
                src={message.imageUrl || "/placeholder.svg"}
                alt="صورة مرفقة"
                className="w-full h-48 object-cover rounded-xl mb-3 border border-white/20"
              />
            )}

            <p className="whitespace-pre-wrap text-sm leading-relaxed font-normal">{message.text}</p>

            {message.groundingChunks &&
              message.groundingChunks.length > 0 &&
              !isUser &&
              renderGrounding(message.groundingChunks)}

            {message.isAudio && message.audioData && (
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-50/10">
                <button
                  onClick={() => onToggleAudio && onToggleAudio(message.id, message.audioData!)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isPlaying
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : isUser
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-[#c8a45e] text-white hover:bg-[#b09b50]"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                        />
                      </svg>
                      <span>إيقاف</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                      <span>اسمعني</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <span className={`text-[10px] text-gray-400/80 px-2 mt-1 ${isUser ? "text-left" : "text-right"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>

        {message.proposal && (
          <div className="w-full mt-2 animate-fade-in">
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide snap-x">
              {message.proposal.options.map((option, idx) => (
                <div
                  key={idx}
                  className="min-w-[260px] w-[260px] bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden snap-center flex flex-col group hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="h-36 relative overflow-hidden">
                    <img
                      src={getImageUrl(option.imageKeyword) || "/placeholder.svg"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={option.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                      {option.priceLevel}
                    </div>
                    <div className="absolute bottom-2 right-2 left-2">
                      <h3 className="font-bold text-white text-sm drop-shadow-lg">{option.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{option.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onExploreMore && onExploreMore(option)}
                        className="flex-1 py-2.5 bg-[#f5f3ef] text-[#001c43] border border-[#c8a45e]/30 hover:bg-[#c8a45e]/20 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <span>🔍</span>
                        <span>اكتشف المزيد</span>
                      </button>
                      <button
                        onClick={() => onSelectOption && onSelectOption(option)}
                        className="flex-1 py-2.5 bg-[#001c43] text-white hover:bg-[#002855] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <span>احجز</span>
                        <span>👈</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
