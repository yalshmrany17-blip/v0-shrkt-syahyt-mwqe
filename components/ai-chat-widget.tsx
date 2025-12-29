"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isNearby, setIsNearby] = useState(false)
  const [autoWave, setAutoWave] = useState(false)
  const [handExtended, setHandExtended] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const extendInterval = setInterval(() => {
      if (!isOpen && !isHovered) {
        setHandExtended(true)
        setTimeout(() => {
          setAutoWave(true)
          setTimeout(() => {
            setAutoWave(false)
            setTimeout(() => setHandExtended(false), 500)
          }, 2000)
        }, 800)
      }
    }, 8000)

    const initialExtend = setTimeout(() => {
      if (!isOpen) {
        setHandExtended(true)
        setTimeout(() => {
          setAutoWave(true)
          setTimeout(() => {
            setAutoWave(false)
            setTimeout(() => setHandExtended(false), 500)
          }, 2000)
        }, 800)
      }
    }, 3000)

    return () => {
      clearInterval(extendInterval)
      clearTimeout(initialExtend)
    }
  }, [isOpen, isHovered])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isOpen) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
      setIsNearby(distance < 150)
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true)
    }, 5000)

    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 12000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setShowTooltip(false)
      setHandExtended(false)
      setIsFullScreen(true)
    }
  }, [isOpen])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.2
    const deltaY = (e.clientY - centerY) * 0.2
    setMousePos({ x: deltaX, y: deltaY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const text = JSON.parse(line.slice(2))
                setMessages((prev) => {
                  const updated = [...prev]
                  const lastMsg = updated[updated.length - 1]
                  if (lastMsg.role === "assistant") {
                    lastMsg.content += text
                  }
                  return updated
                })
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestion = async (text: string) => {
    if (isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const parsedText = JSON.parse(line.slice(2))
                setMessages((prev) => {
                  const updated = [...prev]
                  const lastMsg = updated[updated.length - 1]
                  if (lastMsg.role === "assistant") {
                    lastMsg.content += parsedText
                  }
                  return updated
                })
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const showHand = handExtended || isHovered || isNearby

  const handleClose = () => {
    setIsOpen(false)
    setIsFullScreen(true)
  }

  return (
    <>
      {!isOpen && (
        <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <div
            className="absolute top-1/2 right-full -translate-y-1/2 flex items-center pointer-events-none"
            style={{
              opacity: showHand ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              className="h-3 bg-gradient-to-l from-amber-300 via-amber-200 to-amber-100 rounded-full relative"
              style={{
                width: showHand ? "120px" : "0px",
                transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-amber-400/30 rounded-full" />
              </div>
            </div>

            <div
              className="relative"
              style={{
                transform: showHand ? "translateX(0) scale(1)" : "translateX(50px) scale(0)",
                opacity: showHand ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s",
              }}
            >
              <span
                className="text-3xl sm:text-4xl block"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  transformOrigin: "70% 80%",
                  animation: autoWave ? "waveHand 1s ease-in-out infinite" : "none",
                }}
              >
                👋
              </span>
              {showHand && (
                <>
                  <span className="absolute -top-2 -left-1 text-xs animate-pulse">✨</span>
                  <span className="absolute -bottom-1 left-0 text-xs animate-pulse" style={{ animationDelay: "0.3s" }}>
                    ⭐
                  </span>
                </>
              )}
            </div>
          </div>

          <div
            className={`absolute bottom-full right-0 mb-3 transition-all duration-500 ${showTooltip && !showHand ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          >
            <div className="bg-card text-card-foreground px-3 py-2 rounded-xl shadow-lg border border-border text-xs sm:text-sm whitespace-nowrap">
              كيف أقدر أساعدك؟ 💬
              <div className="absolute bottom-0 right-4 translate-y-full">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-card" />
              </div>
            </div>
          </div>

          <button
            ref={buttonRef}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center transition-all duration-300 ease-out group"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(${isNearby && !isHovered ? 1.05 : 1})`,
            }}
          >
            <div
              className={`absolute -inset-4 rounded-full bg-gradient-to-r from-accent to-jado-orange blur-xl transition-all duration-500 ${isHovered ? "opacity-60" : isNearby || handExtended ? "opacity-40" : "opacity-20"}`}
            />

            <div
              className={`absolute -inset-1 rounded-full bg-gradient-to-r from-accent via-jado-orange to-accent transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-70"}`}
              style={{
                padding: "2px",
                animation: isHovered ? "spin 3s linear infinite" : "none",
              }}
            >
              <div className="w-full h-full rounded-full bg-primary" />
            </div>

            <div
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent to-jado-orange flex items-center justify-center shadow-xl transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-6 sm:h-6"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>

              <div className="absolute -top-0.5 -right-0.5">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-primary">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className={`fixed z-50 bg-card shadow-2xl overflow-hidden flex flex-col animate-slideUp transition-all duration-300 ${
            isFullScreen
              ? "inset-0 rounded-none"
              : "inset-4 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[380px] sm:h-[520px] rounded-2xl border border-border"
          }`}
        >
          <div className="bg-primary text-primary-foreground p-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent to-jado-orange flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="sm:w-6 sm:h-6"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">مساعد جادوا</h3>
                  <p className="text-xs sm:text-sm text-white/60">متصل الآن • جاهز لمساعدتك</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                  title={isFullScreen ? "تصغير" : "تكبير"}
                >
                  {isFullScreen ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 bg-background">
            {messages.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">🌟</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">مرحباً بك في مساعد جادوا!</h4>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
                  أنا هنا لمساعدتك في التخطيط لرحلتك المثالية. اسألني عن أي شيء!
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                  {[
                    "ما هي الباقات المتاحة؟",
                    "أريد حجز رحلة للعلا",
                    "ما أفضل وقت لزيارة أبها؟",
                    "كم سعر رحلة جدة؟",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm bg-secondary/50 text-secondary-foreground rounded-full hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-accent text-white" : "bg-primary text-primary-foreground"}`}
                >
                  {message.role === "user" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-accent text-white rounded-tr-sm" : "bg-card border border-border text-card-foreground rounded-tl-sm"}`}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 px-4 py-3 text-sm sm:text-base bg-muted rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 rounded-xl bg-accent hover:bg-accent/90 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
