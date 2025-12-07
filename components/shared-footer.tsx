"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"
import { JadoLogo } from "@/components/jado-logo"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const SocialIcon = ({
  icon: Icon,
  href,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
  color: string
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110"
    style={{ ["--hover-color" as string]: color }}
  >
    {/* Background animation */}
    <span
      className="absolute inset-0 rounded-full transition-all duration-500 ease-out scale-0 group-hover:scale-100"
      style={{ backgroundColor: color }}
    />
    {/* Pulse ring */}
    <span
      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"
      style={{ backgroundColor: color, animationDuration: "1s" }}
    />
    {/* Icon */}
    <Icon className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:rotate-[360deg]" />
  </a>
)

export function SharedFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setIsSubscribed(true)
        setTimeout(() => {
          setIsSubscribed(false)
          setEmail("")
        }, 3000)
      }
    } catch (error) {
      console.error("Subscription error:", error)
    }
  }

  const socialLinks = [
    { icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: "Instagram", color: "#E4405F" },
    { icon: TikTokIcon, href: SOCIAL_LINKS.tiktok, label: "TikTok", color: "#000000" },
    { icon: XIcon, href: SOCIAL_LINKS.x, label: "X", color: "#1DA1F2" },
    { icon: LinkedInIcon, href: SOCIAL_LINKS.linkedin, label: "LinkedIn", color: "#0A66C2" },
    { icon: WhatsAppIcon, href: CONTACT_INFO.whatsappLink, label: "WhatsApp", color: "#25D366" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">اشترك في نشرتنا البريدية</h3>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                احصل على أحدث العروض والباقات السياحية مباشرة في بريدك الإلكتروني
              </p>
            </div>
            <div>
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 sm:gap-3">
                  <Input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-11 sm:h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-full px-4 sm:px-6 text-sm"
                  />
                  <Button
                    type="submit"
                    className="h-11 sm:h-12 px-4 sm:px-6 bg-accent hover:bg-accent/90 rounded-full transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Send className="w-4 h-4 ml-1 sm:ml-2" />
                    <span className="hidden sm:inline">اشترك</span>
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-full text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>تم الاشتراك بنجاح!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <JadoLogo variant="full" size="sm" color="white" />
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-4">
              شركة سياحية سعودية متخصصة في تقديم تجارب سفر استثنائية.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  color={social.color}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-4">روابط سريعة</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "الباقات", href: "/packages" },
                { label: "من نحن", href: "/about" },
                { label: "شريكك التنفيذي", href: "/executive-partner" },
                { label: "الفعاليات", href: "/events" },
                { label: "المدونة", href: "/blog" },
                { label: "تواصل معنا", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-jado-sand transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-sm font-bold mb-4">الوجهات</h4>
            <ul className="flex flex-col gap-2">
              {["الرياض", "جدة", "العلا", "أبها", "الدمام"].map((dest) => (
                <li key={dest}>
                  <Link href="/packages" className="text-secondary hover:text-jado-sand transition-colors text-sm">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-primary-foreground mb-6">تواصل معنا</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2 group">
                <MapPin className="w-4 h-4 text-accent group-hover:text-jado-sand transition-colors flex-shrink-0" />
                <a
                  href={CONTACT_INFO.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-jado-sand transition-colors text-sm"
                >
                  {CONTACT_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-accent group-hover:text-jado-sand transition-colors" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-secondary hover:text-jado-sand transition-colors text-sm"
                  dir="ltr"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Mail className="w-4 h-4 text-accent group-hover:text-jado-sand transition-colors" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-secondary hover:text-jado-sand transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* New Section for Careers and Partners */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/careers"
              className="text-secondary hover:text-jado-sand transition-all duration-300 flex items-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              انضم لفريقنا - التوظيف
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <Link
              href="/partners"
              className="text-secondary hover:text-jado-sand transition-all duration-300 flex items-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              سجل كمزود خدمة
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-secondary text-xs">© {new Date().getFullYear()} جادوا للسياحة. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 text-xs text-secondary">
            <Link href="#" className="hover:text-jado-sand transition-colors">
              الخصوصية
            </Link>
            <Link href="#" className="hover:text-jado-sand transition-colors">
              الشروط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
