"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { JadoLogo } from "@/components/jado-logo"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"

const packages = [
  {
    id: "riyadh",
    title: "الرياض",
    subtitle: "العاصمة العصرية",
    description: "اكتشف معالم العاصمة",
    image: "/riyadh-modern-skyline-kingdom-tower-night.jpg",
    days: 3,
    price: 1200,
  },
  {
    id: "jeddah",
    title: "جدة",
    subtitle: "عروس البحر الأحمر",
    description: "تراث وشواطئ ساحرة",
    image: "/jeddah-al-balad-historic-district-traditional-arch.jpg",
    days: 4,
    price: 1500,
  },
  {
    id: "alula",
    title: "العلا",
    subtitle: "متحف مفتوح",
    description: "حضارة الأنباط",
    image: "/alula-madain-saleh-nabataean-tombs-desert.jpg",
    days: 5,
    price: 2200,
  },
  {
    id: "abha",
    title: "أبها",
    subtitle: "عروس الجبال",
    description: "طبيعة خلابة",
    image: "/abha-green-mountains-terraces-traditional-village.jpg",
    days: 4,
    price: 1800,
  },
]

const stats = [
  { number: 10, suffix: "+", label: "سنوات" },
  { number: 50, suffix: "K", label: "عميل" },
  { number: 100, suffix: "+", label: "وجهة" },
  { number: 24, suffix: "/7", label: "دعم" },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"
    switch (direction) {
      case "up":
        return "translate3d(0, 60px, 0)"
      case "down":
        return "translate3d(0, -60px, 0)"
      case "left":
        return "translate3d(60px, 0, 0)"
      case "right":
        return "translate3d(-60px, 0, 0)"
      default:
        return "translate3d(0, 60px, 0)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function MagneticButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode
  className?: string
  href?: string
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({ x: (e.clientX - centerX) * 0.3, y: (e.clientY - centerY) * 0.3 })
  }, [])

  return (
    <Link
      ref={buttonRef}
      href={href || "#"}
      className={`inline-block transition-transform duration-300 ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      {children}
    </Link>
  )
}

function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setOffset(progress * 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="w-full h-[120%] relative" style={{ transform: `translateY(${-offset}px)` }}>
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" priority />
      </div>
    </div>
  )
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrollY > 50 ? "rgba(0, 28, 67, 0.95)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
        }}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <JadoLogo variant="full" size="sm" color="white" />
          </Link>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {[
              { name: "الرئيسية", href: "/" },
              { name: "الباقات", href: "/packages" },
              { name: "من نحن", href: "/about" },
              { name: "شريكك التنفيذي", href: "/executive-partner" },
              { name: "الفعاليات", href: "/events" },
              { name: "المدونة", href: "/blog" },
              { name: "تواصل معنا", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <MagneticButton
            href="/booking"
            className="bg-accent text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-accent/90"
          >
            احجز الآن
          </MagneticButton>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/saudi-arabia-desert-landscape-sunset-golden-dunes.jpg"
          alt="صحراء السعودية"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div
            className="transition-all duration-1000"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs sm:text-sm mb-4 border border-accent/30">
              اكتشف المملكة العربية السعودية
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              رحلات <span className="text-accent">استثنائية</span>
              <br />
              لذكريات لا تُنسى
            </h1>
            <p className="text-white/70 text-sm sm:text-base md:text-lg mb-6 max-w-xl mx-auto">
              نصمم لك تجارب سفر فريدة تجمع بين التراث العريق والطبيعة الخلابة
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <MagneticButton
                href="/packages"
                className="bg-accent text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-accent/90 shadow-lg"
              >
                استكشف الباقات
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 backdrop-blur-sm border border-white/20"
              >
                تواصل معنا
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-10 sm:py-14 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {stats.map((stat, index) => (
              <RevealOnScroll key={stat.label} delay={index * 100} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs text-white/60 mt-1">{stat.label}</div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <RevealOnScroll className="text-center mb-8 sm:mb-10">
            <span className="text-accent text-xs sm:text-sm font-medium">باقاتنا المميزة</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">وجهات سياحية استثنائية</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {packages.map((pkg, index) => (
              <RevealOnScroll key={pkg.id} delay={index * 100} direction={index % 2 === 0 ? "left" : "right"}>
                <Link href={`/packages/${pkg.id}`} className="group block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-white font-bold text-base sm:text-lg">{pkg.title}</h3>
                      <p className="text-white/60 text-[10px] sm:text-xs">{pkg.subtitle}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-accent text-xs sm:text-sm font-bold">{pkg.price} ر.س</span>
                        <span className="text-white/60 text-[10px] sm:text-xs">{pkg.days} أيام</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* AlUla Section */}
      <section id="alula" className="relative py-16 sm:py-24">
        <ParallaxImage src="/alula-madain-saleh-nabataean-tombs-desert.jpg" alt="العلا" className="absolute inset-0" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <RevealOnScroll>
            <span className="text-accent text-xs sm:text-sm font-medium">وجهة مميزة</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4">العُلا</h2>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-6">
              متحف مفتوح يضم آثار حضارة الأنباط العريقة وتكوينات صخرية فريدة
            </p>
            <MagneticButton
              href="/packages/alula"
              className="bg-accent text-white px-6 py-3 rounded-full text-sm font-medium inline-block"
            >
              اكتشف العلا
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>

      {/* Why Jado Section */}
      <section id="why" className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <RevealOnScroll className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">لماذا جادوا؟</h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🎯", title: "خبرة محلية", desc: "معرفة عميقة بالوجهات" },
              { icon: "⭐", title: "جودة عالية", desc: "خدمات متميزة" },
              { icon: "💰", title: "أسعار منافسة", desc: "قيمة مقابل السعر" },
              { icon: "🛡️", title: "أمان تام", desc: "سلامتك أولويتنا" },
            ].map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 100}>
                <div className="bg-card p-4 sm:p-5 rounded-xl text-center hover:shadow-lg transition-shadow">
                  <span className="text-2xl sm:text-3xl mb-2 block">{item.icon}</span>
                  <h3 className="font-bold text-sm sm:text-base text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">جاهز لبدء مغامرتك؟</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              تواصل معنا الآن واحصل على عرض خاص لرحلتك القادمة
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <MagneticButton
                href="/booking"
                className="bg-accent text-white px-6 py-3 rounded-full text-sm font-medium"
              >
                احجز رحلتك
              </MagneticButton>
              <MagneticButton
                href={CONTACT_INFO.whatsappLink}
                className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20"
              >
                واتساب
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-8 bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/careers"
              className="group flex items-center gap-3 bg-card hover:bg-primary hover:text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="w-10 h-10 bg-accent/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg
                  className="w-5 h-5 text-accent group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <span className="block font-bold text-sm">انضم لفريقنا</span>
                <span className="text-xs text-muted-foreground group-hover:text-white/70">وظائف متاحة</span>
              </div>
            </Link>

            <Link
              href="/partners"
              className="group flex items-center gap-3 bg-card hover:bg-primary hover:text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="w-10 h-10 bg-accent/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg
                  className="w-5 h-5 text-accent group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <span className="block font-bold text-sm">سجل كمزود خدمة</span>
                <span className="text-xs text-muted-foreground group-hover:text-white/70">كن شريكاً معنا</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 bg-primary border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <JadoLogo variant="full" size="xs" color="white" />
            <div className="flex gap-4 text-xs text-white/60">
              <Link href="/about" className="hover:text-white">
                من نحن
              </Link>
              <Link href="/packages" className="hover:text-white">
                الباقات
              </Link>
              <Link href="/contact" className="hover:text-white">
                تواصل معنا
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-12"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-12"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.173-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
            <p className="text-[10px] text-white/40">© 2025 جادوا. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
