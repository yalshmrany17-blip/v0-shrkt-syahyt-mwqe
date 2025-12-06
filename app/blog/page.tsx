"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Calendar, User, ArrowLeft, Search, Clock } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    slug: "discover-alula-hidden-gems",
    title: "اكتشف الجواهر المخفية في العلا",
    excerpt: "رحلة استكشافية إلى أسرار العلا التاريخية والطبيعية التي لم تكتشفها من قبل",
    image: "/alula-hegra-ancient-nabataean-tombs-carved-in-rock.jpg",
    author: "فريق جادوا",
    date: "2024-01-15",
    category: "وجهات سياحية",
    readTime: "5 دقائق",
  },
  {
    id: 2,
    slug: "riyadh-modern-attractions",
    title: "الرياض الحديثة: معالم لا تفوت",
    excerpt: "دليلك الشامل لاستكشاف أحدث المعالم والمرافق الترفيهية في العاصمة الرياض",
    image: "/riyadh-modern-skyline-with-kingdom-tower-at-night.jpg",
    author: "سارة أحمد",
    date: "2024-01-12",
    category: "مدن سعودية",
    readTime: "7 دقائق",
  },
  {
    id: 3,
    slug: "jeddah-historical-balad",
    title: "جدة التاريخية: رحلة في البلد",
    excerpt: "استكشف عبق التاريخ في البلد التاريخية بجدة وتعرف على قصص الماضي العريق",
    image: "/jeddah-al-balad-historic-district-with-traditional.jpg",
    author: "محمد الغامدي",
    date: "2024-01-10",
    category: "تراث وثقافة",
    readTime: "6 دقائق",
  },
  {
    id: 4,
    slug: "abha-mountains-adventure",
    title: "مغامرة في جبال عسير",
    excerpt: "دليل شامل لأفضل مسارات التسلق والمشي في جبال عسير الخلابة",
    image: "/abha-green-mountains-terraces-traditional-village-.jpg",
    author: "فاطمة القحطاني",
    date: "2024-01-08",
    category: "مغامرات",
    readTime: "8 دقائق",
  },
  {
    id: 5,
    slug: "taif-rose-season",
    title: "موسم الورد في الطائف",
    excerpt: "تجربة فريدة في مزارع الورد وتعرف على صناعة العطور التقليدية",
    image: "/taif-rose-gardens-mountains-saudi-arabia.jpg",
    author: "نورا الدوسري",
    date: "2024-01-05",
    category: "طبيعة",
    readTime: "5 دقائق",
  },
  {
    id: 6,
    slug: "eastern-province-coast",
    title: "سواحل المنطقة الشرقية",
    excerpt: "اكتشف جمال الشواطئ والكورنيش في الدمام والخبر",
    image: "/dammam-corniche-modern-cityscape-saudi-arabia.jpg",
    author: "أحمد السلمي",
    date: "2024-01-03",
    category: "سواحل",
    readTime: "6 دقائق",
  },
]

const categories = ["الكل", "وجهات سياحية", "مدن سعودية", "تراث وثقافة", "مغامرات", "طبيعة", "سواحل"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "الكل" || post.category === selectedCategory
    const matchesSearch = post.title.includes(searchQuery) || post.excerpt.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/saudi-arabia-desert-landscape-at-sunset-with-golde.jpg"
            alt="مدونة جادوا"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>

        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">مدونة جادوا</h1>
          <p className="text-xl md:text-2xl text-secondary mb-8">اكتشف أسرار السياحة في المملكة العربية السعودية</p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
            <Input
              type="text"
              placeholder="ابحث في المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pr-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
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
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground border-0">{post.category}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="ghost"
                        className="text-accent hover:text-accent hover:bg-accent/10 rounded-full group/btn"
                      >
                        اقرأ المزيد
                        <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover/btn:-translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">لا توجد مقالات تطابق بحثك</p>
            </div>
          )}
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
