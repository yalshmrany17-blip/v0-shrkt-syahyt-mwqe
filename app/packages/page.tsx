"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Star, Clock, MapPin, ArrowLeft, Filter } from "lucide-react"

const packages = [
  {
    id: "riyadh",
    name: "باقة الرياض الذهبية",
    description: "استكشف العاصمة السعودية بين الأصالة والحداثة",
    duration: "3 أيام / 2 ليالي",
    price: 1200,
    rating: 4.8,
    reviews: 124,
    image: "/riyadh-modern-skyline-with-kingdom-tower-at-night.jpg",
    highlights: ["برج المملكة", "المتحف الوطني", "قصر المصمك", "بوليفارد الرياض"],
    category: "مدن",
  },
  {
    id: "jeddah",
    name: "باقة جدة التراثية",
    description: "اكتشف عروس البحر الأحمر وتاريخها العريق",
    duration: "4 أيام / 3 ليالي",
    price: 1500,
    rating: 4.9,
    reviews: 98,
    image: "/jeddah-al-balad-historic-district-with-traditional.jpg",
    highlights: ["البلد التاريخية", "كورنيش جدة", "نافورة الملك فهد", "أسواق جدة"],
    category: "تراث",
  },
  {
    id: "alula",
    name: "باقة العلا الأثرية",
    description: "رحلة عبر الزمن في أعجوبة التاريخ السعودي",
    duration: "5 أيام / 4 ليالي",
    price: 2200,
    rating: 5.0,
    reviews: 156,
    image: "/alula-hegra-ancient-nabataean-tombs-carved-in-rock.jpg",
    highlights: ["مدائن صالح", "جبل الفيل", "البلدة القديمة", "مخيم صحراوي فاخر"],
    category: "آثار",
  },
  {
    id: "abha",
    name: "باقة أبها الجبلية",
    description: "استمتع بالطبيعة الخلابة في جبال عسير",
    duration: "4 أيام / 3 ليالي",
    price: 1800,
    rating: 4.7,
    reviews: 87,
    image: "/abha-green-mountains-terraces-traditional-village-.jpg",
    highlights: ["جبل السودة", "قرية رجال ألمع", "التلفريك", "منتزه السحاب"],
    category: "طبيعة",
  },
  {
    id: "eastern",
    name: "باقة الشرقية",
    description: "اكتشف المنطقة الشرقية ومعالمها المميزة",
    duration: "3 أيام / 2 ليالي",
    price: 1100,
    rating: 4.6,
    reviews: 65,
    image: "/dammam-corniche-modern-cityscape-saudi-arabia.jpg",
    highlights: ["كورنيش الدمام", "جزيرة المرجان", "متحف أرامكو", "سوق القيصرية"],
    category: "مدن",
  },
  {
    id: "taif",
    name: "باقة الطائف",
    description: "مدينة الورد والهواء العليل",
    duration: "3 أيام / 2 ليالي",
    price: 1300,
    rating: 4.8,
    reviews: 72,
    image: "/taif-rose-gardens-mountains-saudi-arabia.jpg",
    highlights: ["مزارع الورد", "سوق عكاظ", "الشفا والهدا", "قصر شبرا"],
    category: "طبيعة",
  },
]

const categories = ["الكل", "مدن", "تراث", "آثار", "طبيعة"]

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [sortBy, setSortBy] = useState("popular")

  const filteredPackages =
    selectedCategory === "الكل" ? packages : packages.filter((pkg) => pkg.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/saudi-arabia-desert-landscape-at-sunset-with-golde.jpg"
            alt="Saudi Arabia landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        </div>

        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent text-accent-foreground border-0 px-4 py-2 text-sm">اكتشف المملكة</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">باقاتنا السياحية</h1>
          <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed">
            اختر من بين مجموعة متنوعة من الباقات المصممة خصيصاً لتناسب اهتماماتك
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-foreground border-0 focus:ring-0 cursor-pointer"
              >
                <option value="popular">الأكثر شعبية</option>
                <option value="price-low">السعر: من الأقل</option>
                <option value="price-high">السعر: من الأعلى</option>
                <option value="rating">التقييم</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <article
                key={pkg.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-primary font-bold">{pkg.price} ريال</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{pkg.rating}</span>
                    <span className="text-white/70 text-xs">({pkg.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.category}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.highlights.slice(0, 3).map((highlight) => (
                      <span key={highlight} className="text-xs bg-secondary/20 text-primary px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <Link href={`/booking?package=${pkg.id}`}>
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground rounded-full transition-all duration-300 group/btn">
                      احجز الآن
                      <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">لم تجد ما تبحث عنه؟</h2>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            نقدم خدمة تصميم الرحلات المخصصة حسب رغباتك واحتياجاتك
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-6 text-lg transition-all duration-300 hover:scale-105"
            >
              تواصل معنا
            </Button>
          </Link>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
