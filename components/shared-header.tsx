"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { JadoLogo } from "@/components/jado-logo"

export function SharedHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-primary/95 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <JadoLogo variant="full" size="sm" color="white" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { href: "/", label: "الرئيسية" },
            { href: "/packages", label: "الباقات" },
            { href: "/about", label: "من نحن" },
            { href: "/partners", label: "مزودي الخدمات" },
            { href: "/executive-partner", label: "شريكك التنفيذي" },
            { href: "/events", label: "الفعاليات" },
            { href: "/blog", label: "المدونة" },
            { href: "/contact", label: "تواصل معنا" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary-foreground/90 hover:text-jado-sand transition-colors duration-300 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/booking">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-4 sm:px-6 text-sm transition-all duration-300 hover:scale-105">
              احجز الآن
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary/98 backdrop-blur-xl border-t border-primary-foreground/10">
          <nav className="flex flex-col p-6 gap-4">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/packages", label: "الباقات" },
              { href: "/about", label: "من نحن" },
              { href: "/partners", label: "مزودي الخدمات" },
              { href: "/executive-partner", label: "شريكك التنفيذي" },
              { href: "/events", label: "الفعاليات" },
              { href: "/blog", label: "المدونة" },
              { href: "/contact", label: "تواصل معنا" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-foreground/90 hover:text-jado-sand transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
