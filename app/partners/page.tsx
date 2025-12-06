"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { JadoLogo } from "@/components/jado-logo"

const partners = [
  {
    id: 1,
    name: "فنادق الريتز كارلتون",
    category: "فنادق",
    description: "شريكنا في تقديم أفخم تجارب الإقامة في المملكة",
    logo: "/ritz-carlton-hotel-logo.jpg",
    rating: 5,
    locations: ["الرياض", "جدة", "العلا"],
  },
  {
    id: 2,
    name: "الخطوط السعودية",
    category: "طيران",
    description: "شريكنا الاستراتيجي في خدمات النقل الجوي",
    logo: "/saudia-airlines-logo.jpg",
    rating: 5,
    locations: ["جميع المدن"],
  },
  {
    id: 3,
    name: "هيئة السياحة",
    category: "حكومي",
    description: "شراكة رسمية لتقديم أفضل التجارب السياحية",
    logo: "/saudi-tourism-authority-logo.png",
    rating: 5,
    locations: ["المملكة"],
  },
  {
    id: 4,
    name: "مطاعم لوزين",
    category: "مطاعم",
    description: "تجارب طعام سعودية أصيلة في رحلاتنا",
    logo: "/saudi-restaurant-logo.jpg",
    rating: 4,
    locations: ["الرياض", "جدة"],
  },
  {
    id: 5,
    name: "شركة المسافر",
    category: "نقل",
    description: "خدمات نقل فاخرة ومريحة لضيوفنا",
    logo: "/luxury-transport-company-logo.jpg",
    rating: 5,
    locations: ["جميع المدن"],
  },
  {
    id: 6,
    name: "فندق العلا",
    category: "فنادق",
    description: "إقامة فريدة وسط الطبيعة الخلابة",
    logo: "/alula-resort-hotel-logo.jpg",
    rating: 5,
    locations: ["العلا"],
  },
]

const categories = ["الكل", "فنادق", "طيران", "حكومي", "مطاعم", "نقل"]

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState("الكل")

  const filteredPartners = activeCategory === "الكل" ? partners : partners.filter((p) => p.category === activeCategory)

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
            <Link href="/partners" className="text-white">
              مزودي الخدمات
            </Link>
            <Link href="/events" className="hover:text-white transition-colors">
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
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm mb-4">
              شركاء النجاح
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">مزودي الخدمات</h1>
            <p className="text-base md:text-lg text-white/70">
              نفخر بشراكاتنا مع أفضل مزودي الخدمات في المملكة لنقدم لكم تجارب سفر استثنائية
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-card border-b border-border sticky top-[60px] z-40">
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

      {/* Partners Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <div
                key={partner.id}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center overflow-hidden">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      width={60}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                      {partner.name}
                    </h3>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {partner.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < partner.rating ? "text-yellow-500" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {partner.locations.slice(0, 2).map((loc) => (
                      <span key={loc} className="text-xs text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Partner CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">انضم إلى شركاء جادوا</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm">
            نرحب بالشراكة مع مزودي الخدمات المتميزين لتقديم أفضل التجارب السياحية
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            تواصل معنا
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
