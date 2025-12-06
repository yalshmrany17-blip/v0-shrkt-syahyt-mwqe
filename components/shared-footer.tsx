"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube, Send, CheckCircle } from "lucide-react"
import { JadoLogo } from "@/components/jado-logo"

export function SharedFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

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
            <div className="flex gap-2">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "الباقات", href: "/packages" },
                { label: "من نحن", href: "/about" },
                { label: "مزودي الخدمات", href: "/partners" },
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
            <ul className="space-y-2">
              {["الرياض", "جدة", "العلا", "أبها", "الدمام"].map((dest) => (
                <li key={dest}>
                  <Link
                    href="/packages"
                    className="text-secondary hover:text-jado-sand transition-colors duration-300 text-sm"
                  >
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-secondary text-sm">الرياض، السعودية</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href="tel:+966501234567"
                  className="text-secondary hover:text-jado-sand transition-colors text-sm"
                  dir="ltr"
                >
                  +966 50 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href="mailto:info@jadosaudi.com"
                  className="text-secondary hover:text-jado-sand transition-colors text-sm"
                >
                  info@jadosaudi.com
                </a>
              </li>
            </ul>
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
