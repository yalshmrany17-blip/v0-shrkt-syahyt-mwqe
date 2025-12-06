"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { JadoLogo } from "@/components/jado-logo"

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
                href="https://wa.me/966500000000"
                className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20"
              >
                واتساب
              </MagneticButton>
            </div>
          </RevealOnScroll>
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
            <p className="text-[10px] text-white/40">© 2025 جادوا. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
