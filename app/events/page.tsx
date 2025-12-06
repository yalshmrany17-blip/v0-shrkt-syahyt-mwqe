"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { JadoLogo } from "@/components/jado-logo"

const events = [
  {
    id: 1,
    title: "موسم الرياض 2025",
    date: "أكتوبر - مارس 2025",
    location: "الرياض",
    category: "ترفيه",
    image: "/riyadh-season-entertainment-festival-night.jpg",
    description: "أكبر موسم ترفيهي في المملكة مع فعاليات متنوعة",
    featured: true,
  },
  {
    id: 2,
    title: "مهرجان شتاء طنطورة",
    date: "ديسمبر - فبراير 2025",
    location: "العلا",
    category: "ثقافي",
    image: "/winter-at-tantora-alula-music-festival-desert.jpg",
    description: "حفلات موسيقية عالمية وسط آثار العلا الخلابة",
    featured: true,
  },
  {
    id: 3,
    title: "سباق فورمولا إي",
    date: "فبراير 2025",
    location: "الدرعية",
    category: "رياضة",
    image: "/formula-e-diriyah-race-car-racing.jpg",
    description: "سباق السيارات الكهربائية في قلب الدرعية التاريخية",
    featured: false,
  },
  {
    id: 4,
    title: "مهرجان البحر الأحمر السينمائي",
    date: "نوفمبر 2025",
    location: "جدة",
    category: "ثقافي",
    image: "/red-sea-film-festival-jeddah-cinema.jpg",
    description: "مهرجان سينمائي دولي يجمع نجوم العالم",
    featured: false,
  },
  {
    id: 5,
    title: "موسم جدة",
    date: "يونيو - أغسطس 2025",
    location: "جدة",
    category: "ترفيه",
    image: "/jeddah-season-summer-festival-entertainment.jpg",
    description: "فعاليات صيفية متنوعة على ساحل البحر الأحمر",
    featured: false,
  },
  {
    id: 6,
    title: "رالي داكار السعودية",
    date: "يناير 2025",
    location: "متعددة",
    category: "رياضة",
    image: "/dakar-rally-saudi-arabia-desert-racing.jpg",
    description: "أشهر سباق تحمل في العالم عبر صحاري المملكة",
    featured: false,
  },
]

const categories = ["الكل", "ترفيه", "ثقافي", "رياضة"]

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("الكل")

  const filteredEvents = activeCategory === "الكل" ? events : events.filter((e) => e.category === activeCategory)

  const featuredEvents = events.filter((e) => e.featured)

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-primary/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <JadoLogo variant="light" size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <Link href="/packages" className="hover:text-white transition-colors">
              الباقات
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              من نحن
            </Link>
            <Link href="/partners" className="hover:text-white transition-colors">
              مزودي الخدمات
            </Link>
            <Link href="/events" className="text-white">
              الفعاليات
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              تواصل معنا
            </Link>
          </nav>
          <Link
            href="/booking"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            احجز الآن
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/saudi-arabia-events-festivals-celebration-firework.jpg" alt="فعاليات" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
        </div>
        <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm mb-4">
              اكتشف الفعاليات
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">فعاليات المملكة</h1>
            <p className="text-base md:text-lg text-white/70">
              اكتشف أبرز الفعاليات والمواسم في المملكة العربية السعودية واحجز رحلتك معنا
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">الفعاليات المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredEvents.map((event) => (
              <div key={event.id} className="relative rounded-xl overflow-hidden group h-64 md:h-80">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs">{event.category}</span>
                </div>
                <div className="absolute bottom-0 right-0 left-0 p-6">
                  <div className="flex items-center gap-4 text-white/70 text-xs mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{event.description}</p>
                  <Link
                    href={`/booking?event=${event.id}`}
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    احجز رحلتك
                    <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-background border-b border-border sticky top-[60px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">جميع الفعاليات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-lg transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-accent text-white px-2 py-0.5 rounded-full text-xs">{event.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                  <Link
                    href={`/booking?event=${event.id}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm transition-colors"
                  >
                    احجز رحلتك
                    <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Event CTA */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">تبحث عن تجربة خاصة؟</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm">
              نصمم لك رحلة مخصصة لحضور أي فعالية في المملكة مع باقة شاملة تناسب احتياجاتك
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              صمم رحلتك
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <JadoLogo variant="light" size="sm" className="mx-auto mb-4" />
          <p className="text-white/60 text-sm">© 2025 جادوا للسياحة. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
