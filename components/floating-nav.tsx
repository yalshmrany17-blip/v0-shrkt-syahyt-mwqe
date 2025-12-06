"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-[#001c43]/95 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                scrolled ? "bg-[#af4b32]" : "bg-white/10 backdrop-blur-sm",
              )}
            >
              <span className="text-white font-bold text-lg">ج</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">جادوا</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "#packages", label: "الباقات" },
              { href: "/blog", label: "المدونة" },
              { href: "/about", label: "من نحن" },
              { href: "/contact", label: "تواصل معنا" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  "text-white/80 hover:text-white hover:bg-white/10",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link href="/booking" className="hidden sm:block">
              <Button
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  scrolled ? "bg-[#af4b32] hover:bg-[#8f3b22] text-white" : "bg-white text-[#001c43] hover:bg-white/90",
                )}
              >
                احجز الآن
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#001c43] transition-all duration-500 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[
            { href: "/", label: "الرئيسية" },
            { href: "#packages", label: "الباقات" },
            { href: "/blog", label: "المدونة" },
            { href: "/about", label: "من نحن" },
            { href: "/contact", label: "تواصل معنا" },
          ].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#e2b386] transition-colors"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setMobileOpen(false)}>
            <Button className="mt-8 bg-[#af4b32] hover:bg-[#8f3b22] text-white rounded-full px-10 py-6 text-lg">
              احجز الآن
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
