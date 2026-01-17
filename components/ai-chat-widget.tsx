"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Sender, BookingStage } from "@/lib/jado-types"
import type { Message, Itinerary, ProposalOption } from "@/lib/jado-types"
import JadoMessageBubble from "./jado-message-bubble"
import JadoItineraryView from "./jado-itinerary-view"
import JadoTimelineView from "./jado-timeline-view"
import JadoProgressBar from "./jado-progress-bar"

const JADO_AVATAR =
  "/images/d8-b5-d9-88-d8-b1-d8-a9-20-d8-ac-d8-a7-d8-af-d9-88-d8-a7-20-d9-85-d9-82-d8-b1-d8-a8-d8-a9-20.png"

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [showPanel, setShowPanel] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [currentStage, setCurrentStage] = useState<BookingStage>(BookingStage.Discovery)

  const [isHovered, setIsHovered] = useState(false)
  const [isNearby, setIsNearby] = useState(false)
  const [showWavingHand, setShowWavingHand] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMsg: Message = {
      id: "init",
      sender: Sender.Bot,
      text: "يا هلا والله!\n\nأنا **جادوا**، رفيقك في السفر داخل المملكة.\n\nعلمني طال عمرك، وش اسمك الكريم؟\n\nيمكنك أيضاً الاستعلام عن حجوزاتك السابقة أو تذاكرك بذكر رقم الحجز.",
      timestamp: new Date(),
    }
    setMessages([welcomeMsg])
  }, [])

  useEffect(() => {
    const waveInterval = setInterval(() => {
      if (!isOpen && !isHovered) {
        setShowWavingHand(true)
        setTimeout(() => setShowWavingHand(false), 3000)
      }
    }, 5000)

    // Initial wave after 2 seconds
    const initialWave = setTimeout(() => {
      if (!isOpen) {
        setShowWavingHand(true)
        setShowTooltip(true)
        setTimeout(() => setShowWavingHand(false), 3000)
      }
    }, 2000)

    return () => {
      clearInterval(waveInterval)
      clearTimeout(initialWave)
    }
  }, [isOpen, isHovered])

  // Detect nearby mouse
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isOpen) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
      const nearby = distance < 150
      setIsNearby(nearby)

      // Show waving hand when nearby
      if (nearby && !showWavingHand) {
        setShowWavingHand(true)
      }
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
  }, [isOpen, showWavingHand])

  // Hide tooltip after delay
  useEffect(() => {
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000)
    return () => clearTimeout(hideTimer)
  }, [showTooltip])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setShowTooltip(false)
      setShowWavingHand(false)
    }
  }, [isOpen])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.1
    const deltaY = (e.clientY - centerY) * 0.1
    setMousePos({ x: deltaX, y: deltaY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
    setTimeout(() => setShowWavingHand(false), 500)
  }, [])

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || inputText
    if (!textToSend.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: Sender.User,
      text: textToSend,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setInputText("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/jado-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.Bot,
        text: data.text || "عذراً، حصل خطأ. حاول مرة ثانية.",
        timestamp: new Date(),
        groundingChunks: data.groundingChunks,
        proposal: data.proposal,
      }

      setMessages((prev) => [...prev, botMessage])

      if (data.proposal) {
        setCurrentStage(BookingStage.Planning)
      }

      if (data.itinerary) {
        setItinerary(data.itinerary)
        setCurrentStage(BookingStage.Invoicing)
        if (data.itinerary.status === "Draft" && !isPaid) {
          setShowPanel(true)
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.Bot,
        text: "معليش علقت شوي.. النت يستهبل دقيقة وأرجع لك!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    }

    setIsLoading(false)
  }

  const handleOptionSelect = (option: ProposalOption) => {
    handleSendMessage(`اعتمد لي خيار: ${option.title}`)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result as string

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: Sender.User,
        text: "صورة مرفقة",
        imageUrl: base64String,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setIsLoading(true)

      try {
        const response = await fetch("/api/jado-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "وش رايك في هالمكان؟",
            imageBase64: base64String.split(",")[1],
          }),
        })

        const data = await response.json()

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: Sender.Bot,
          text: data.text,
          timestamp: new Date(),
          groundingChunks: data.groundingChunks,
        }
        setMessages((prev) => [...prev, botMessage])
      } catch (error) {
        console.error("Error:", error)
      }

      setIsLoading(false)
    }
    reader.readAsDataURL(file)
    event.target.value = ""
  }

  const handleItineraryAction = async (email: string) => {
    if (itinerary?.status === "Draft") {
      setShowPanel(false)
      setIsPaid(true)
      setIsLoading(true)
      setCurrentStage(BookingStage.Paid)

      const systemTrigger = `[PAYMENT_SUCCESSFUL: البريد: ${email}. العميل دفع. أرجع الفاتورة بحالة 'Paid']`

      try {
        const response = await fetch("/api/jado-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: systemTrigger }),
        })

        const data = await response.json()

        if (data.itinerary) {
          setItinerary(data.itinerary)
        }

        const msg: Message = {
          id: Date.now().toString(),
          sender: Sender.Bot,
          text: data.text || "تم الدفع بنجاح! تذكرتك جاهزة.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, msg])
      } catch (e) {
        console.error("Error triggering payment", e)
      } finally {
        setIsLoading(false)
        setTimeout(() => setShowPanel(true), 1500)
      }
    }
  }

  // Quick actions for mobile
  const quickActions = [
    { label: "الباقات المتاحة", icon: "🎯" },
    { label: "حجوزاتي السابقة", icon: "📋" },
    { label: "تذاكري", icon: "🎫" },
    { label: "تواصل مع فريقنا", icon: "📞" },
  ]

  return (
    <>
      {/* Floating Button with Jado Avatar and Waving Hand */}
      {!isOpen && (
        <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          {/* Tooltip */}
          <div
            className={`absolute bottom-full right-0 mb-3 transition-all duration-500 ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          >
            <div className="bg-white text-[#001C43] px-4 py-3 rounded-2xl shadow-xl border border-[#c8a45e]/30 text-sm whitespace-nowrap font-bold">
              هلا! كيف أقدر أساعدك؟
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-[#c8a45e]/30 transform rotate-45"></div>
            </div>
          </div>

          <div
            className={`absolute transition-all duration-700 ease-out ${showWavingHand || isHovered ? "opacity-100" : "opacity-0"}`}
            style={{
              left: "-60px",
              top: "50%",
              transform: `translateY(-50%) ${showWavingHand || isHovered ? "translateX(0)" : "translateX(20px)"}`,
            }}
          >
            {/* Arm extending from avatar */}
            <div
              className="relative"
              style={{
                animation: showWavingHand ? "extendArm 0.5s ease-out forwards" : "none",
              }}
            >
              {/* Arm */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-l from-[#d4a574] to-[#c8956a] rounded-full origin-right"
                style={{
                  width: showWavingHand || isHovered ? "50px" : "0px",
                  transition: "width 0.5s ease-out",
                }}
              />
              {/* Hand */}
              <div
                className="text-4xl"
                style={{
                  animation: showWavingHand ? "waveHandAnimation 0.5s ease-in-out infinite" : "none",
                  transformOrigin: "bottom center",
                }}
              >
                👋
              </div>
            </div>
          </div>

          {/* Main Button with Jado Image */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => {
              setIsHovered(true)
              setShowWavingHand(true)
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center transition-all duration-300 ease-out group"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(${isHovered ? 1.1 : isNearby ? 1.05 : 1})`,
            }}
          >
            {/* Glow Effect */}
            <div
              className={`absolute -inset-4 rounded-full transition-all duration-500 ${isHovered || isNearby ? "opacity-100" : "opacity-50"}`}
              style={{
                background: `radial-gradient(circle, rgba(200,164,94,${isHovered ? 0.5 : 0.3}) 0%, transparent 70%)`,
                animation: isNearby && !isHovered ? "pulse 2s ease-in-out infinite" : "none",
              }}
            />

            {/* Avatar Container - Static, no shake */}
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-2xl transition-all duration-300 border-4 ${isHovered ? "border-[#c8a45e]" : "border-white"}`}
            >
              <img src={JADO_AVATAR || "/placeholder.svg"} alt="جادوا" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001c43]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-lg">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window - Full Screen on Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#f5f3ef]">
          {/* Main Chat Area */}
          <div
            className={`flex flex-col h-full transition-all duration-500 ${showPanel ? "hidden md:flex md:w-2/5" : "w-full"}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-l from-[#001C43] to-[#002855] p-3 sm:p-4 shadow-lg safe-area-top">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#c8a45e] shadow-lg bg-white">
                    <img src={JADO_AVATAR || "/placeholder.svg"} alt="جادوا" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-base sm:text-lg">جادوا</h1>
                    <p className="text-xs text-[#c8a45e]">رفيقك في السفر</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {itinerary && !showPanel && (
                    <button
                      onClick={() => setShowPanel(true)}
                      className="text-[#001C43] bg-[#c8a45e] hover:bg-[#d4b06a] text-xs sm:text-sm font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <span>{isPaid ? "تذكرتي" : "العرض"}</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <JadoProgressBar currentStage={currentStage} />
              </div>
            </div>

            <div className="flex gap-2 p-3 overflow-x-auto bg-white border-b border-[#c8a45e]/10 md:hidden">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(action.label)}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-[#f5f3ef] rounded-full text-xs font-medium text-[#001C43] border border-[#c8a45e]/20 hover:bg-[#c8a45e]/10 transition-colors"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              {messages.map((msg) => (
                <JadoMessageBubble key={msg.id} message={msg} onSelectOption={handleOptionSelect} />
              ))}
              {isLoading && (
                <div className="flex justify-end mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#c8a45e]">
                      <img src={JADO_AVATAR || "/placeholder.svg"} alt="جادوا" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 border border-[#c8a45e]/20">
                      <span className="text-xs text-[#c8a45e] font-bold ml-2">يكتب...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#001C43] rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-[#001C43] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-[#001C43] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Mobile Optimized */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#c8a45e]/20 shadow-lg safe-area-bottom">
              <div className="flex items-center gap-2 sm:gap-3 bg-[#f5f3ef] p-2 rounded-2xl border border-[#c8a45e]/20">
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-10 h-10 flex items-center justify-center text-[#6B7280] hover:text-[#001C43] hover:bg-white rounded-full transition-all text-lg"
                >
                  📷
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="سولف مع جادوا..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-right text-[#001C43] placeholder-gray-400 px-2 py-2 text-sm sm:text-base min-w-0"
                  dir="rtl"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-[#001C43] to-[#002855] text-white rounded-full hover:from-[#002855] hover:to-[#003366] transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Side Panel (Invoice/Timeline) - Mobile: Full Screen */}
          {showPanel && itinerary && (
            <div className="flex-1 relative">
              <button
                onClick={() => setShowPanel(false)}
                className="absolute top-3 left-3 sm:top-4 sm:left-4 z-50 bg-[#001C43]/90 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-[#001C43] transition-colors"
              >
                ✕ رجوع
              </button>
              {isPaid ? (
                <JadoTimelineView itinerary={itinerary} />
              ) : (
                <JadoItineraryView itinerary={itinerary} onConfirm={handleItineraryAction} />
              )}
            </div>
          )}
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes waveHandAnimation {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(-10deg); }
          75% { transform: rotate(20deg); }
        }
        
        @keyframes extendArm {
          0% { width: 0; }
          100% { width: 50px; }
        }
        
        .safe-area-top {
          padding-top: max(0.75rem, env(safe-area-inset-top));
        }
        
        .safe-area-bottom {
          padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  )
}
