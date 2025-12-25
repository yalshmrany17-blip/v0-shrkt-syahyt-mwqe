"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

const packagesData = {
  riyadh: {
    title: "باقة الرياض الحديثة",
    subtitle: "العاصمة العصرية",
    description: "استكشف معالم العاصمة الحديثة والتراث العريق في رحلة تجمع بين الماضي والمستقبل",
    image: "/riyadh-modern-skyline-kingdom-tower-night.jpg",
    days: 3,
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 127,
    highlights: [
      "زيارة برج المملكة وسكاي بريدج",
      "جولة في حي الطريف التاريخي",
      "تجربة تسوق فاخرة في الرياض بارك",
      "عشاء في مطعم عالمي مع إطلالة بانورامية",
    ],
    itinerary: [
      {
        day: 1,
        title: "الوصول واستكشاف أبها",
        description: "الوصول إلى أبها، تسجيل الدخول في الفندق، جولة في المدينة، زيارة جبل السودة",
        activities: [
          "الاستقبال في المطار والتوجه إلى الفندق",
          "جولة في مدينة أبها ومشاهدة معالمها",
          "زيارة جبل السودة والتلفريك",
          "عشاء في مطعم يطل على المدينة",
        ],
      },
      {
        day: 2,
        title: "جبل السودة وقرية رجال المع",
        description: "رحلة إلى جبل السودة وزيارة قرية رجال المع التراثية",
        activities: [
          "الصعود إلى جبل السودة بالتلفريك",
          "زيارة قرية رجال المع التراثية (موقع اليونسكو)",
          "استكشاف المعمار التقليدي في المنطقة",
          "عشاء في مطعم تقليدي يقدم المأكولات العسيرية",
        ],
      },
      {
        day: 3,
        title: "وادي محلحلة ومتنزه أبو خيال",
        description: "زيارة وادي محلحلة للاستمتاع بالطبيعة، ثم متنزه أبو خيال",
        activities: [
          "جولة في وادي محلحلة والطبيعة الخضراء",
          "زيارة متنزه أبو خيال والاستمتاع بالجلسات",
          "وقت حر للتسوق في الأسواق الشعبية",
          "عشاء حر",
        ],
      },
      {
        day: 4,
        title: "المدرجات الزراعية والعودة",
        description: "استكشاف المدرجات الزراعية الخضراء والأسواق التقليدية",
        activities: [
          "زيارة المدرجات الزراعية في تنومة أو قريبا",
          "التعرف على الزراعة التقليدية في المنطقة",
          "التسوق من الأسواق الشعبية والمنتجات المحلية",
          "المغادرة والعودة",
        ],
      },
    ],
    includes: [
      "إقامة 3 ليالي في فندق 5 نجوم",
      "وجبات الإفطار يومياً",
      "مرشد سياحي محترف",
      "النقل بسيارة فاخرة",
      "تذاكر دخول جميع المعالم",
    ],
    excludes: ["تذاكر الطيران", "التأمين الصحي", "المصاريف الشخصية"],
  },
  jeddah: {
    title: "باقة جدة التاريخية",
    subtitle: "عروس البحر الأحمر",
    description: "تراث أصيل وشواطئ ساحرة في مدينة جدة العريقة",
    image: "/jeddah-al-balad-historic-district-traditional-arch.jpg",
    days: 4,
    price: 1500,
    originalPrice: 1900,
    rating: 4.9,
    reviews: 203,
    highlights: [
      "جولة في البلد التاريخي (موقع اليونسكو)",
      "زيارة نافورة الملك فهد",
      "تجربة الكورنيش الساحلي",
      "التسوق في أسواق جدة التقليدية",
    ],
    itinerary: [
      {
        day: 1,
        title: "الوصول والبلد التاريخي",
        description: "الوصول إلى جدة واستكشاف البلد التاريخي",
        activities: [
          "الاستقبال في المطار والتوجه للفندق",
          "جولة في حي البلد التاريخي",
          "زيارة بيت نصيف والمباني التراثية",
          "عشاء في مطعم تراثي",
        ],
      },
      {
        day: 2,
        title: "الكورنيش ونافورة الملك فهد",
        description: "يوم كامل على الواجهة البحرية",
        activities: ["زيارة نافورة الملك فهد", "جولة على كورنيش جدة", "نشاطات بحرية (اختياري)", "عشاء على البحر"],
      },
      {
        day: 3,
        title: "التسوق والأسواق",
        description: "تجربة تسوق وأسواق تقليدية",
        activities: ["زيارة مول البحر الأحمر", "التسوق في سوق العلوي", "جولة في الأسواق الشعبية", "عشاء حر"],
      },
      {
        day: 4,
        title: "المتاحف والعودة",
        description: "زيارة المتاحف والمعالم الثقافية",
        activities: ["زيارة متحف جدة الإقليمي", "جولة في المنطقة التاريخية", "وقت حر للتسوق", "المغادرة"],
      },
    ],
    includes: [
      "إقامة 3 ليالي في فندق على البحر",
      "وجبات الإفطار والعشاء",
      "مرشد سياحي",
      "النقل الفاخر",
      "تذاكر الدخول",
    ],
    excludes: ["تذاكر الطيران", "التأمين", "النشاطات البحرية الإضافية"],
  },
  alula: {
    title: "باقة العلا الشاملة",
    subtitle: "متحف مفتوح",
    description: "حضارة الأنباط وجمال الطبيعة في موقع اليونسكو الأشهر",
    image: "/alula-hegra-ancient-nabataean-tombs-carved-rock.jpg",
    days: 5,
    price: 2200,
    originalPrice: 2800,
    rating: 5.0,
    reviews: 451,
    highlights: [
      "زيارة مدائن صالح (الحجر)",
      "جولة في البلدة القديمة",
      "مشاهدة صخرة الفيل",
      "تجربة التخييم الفاخر تحت النجوم",
    ],
    itinerary: [
      {
        day: 1,
        title: "الوصول ومدائن صالح",
        description: "استكشاف موقع مدائن صالح الأثري",
        activities: [
          "الاستقبال والتوجه للفندق",
          "زيارة مدائن صالح (موقع اليونسكو)",
          "جولة في المقابر النبطية المنحوتة",
          "عشاء تحت النجوم",
        ],
      },
      {
        day: 2,
        title: "البلدة القديمة والمتاحف",
        description: "جولة في التاريخ والثقافة",
        activities: ["زيارة البلدة القديمة", "جولة في متحف العلا", "استكشاف الأسواق التقليدية", "عشاء في مطعم تراثي"],
      },
      {
        day: 3,
        title: "صخرة الفيل ووادي القرى",
        description: "المعالم الطبيعية الخلابة",
        activities: ["زيارة صخرة الفيل الشهيرة", "جولة في وادي القرى", "تصوير غروب الشمس الساحر", "تخييم فاخر"],
      },
      {
        day: 4,
        title: "جبل عكمة ومرايا",
        description: "الفن والتاريخ القديم",
        activities: [
          "زيارة جبل عكمة والنقوش القديمة",
          "جولة في مرايا (قاعة المرايا)",
          "وقت حر لأنشطة اختيارية",
          "عشاء فاخر",
        ],
      },
      {
        day: 5,
        title: "الاستكشاف الحر والعودة",
        description: "يوم حر قبل المغادرة",
        activities: ["وقت حر للاستكشاف", "زيارة المعالم المتبقية", "التسوق من الحرف اليدوية", "المغادرة"],
      },
    ],
    includes: [
      "إقامة 4 ليالي (فندق + تخييم فاخر)",
      "جميع الوجبات",
      "مرشد أثري متخصص",
      "النقل 4x4 للصحراء",
      "تذاكر جميع المواقع",
    ],
    excludes: ["تذاكر الطيران", "التأمين", "الأنشطة الإضافية"],
  },
  abha: {
    title: "باقة أبها التراثية",
    subtitle: "عروس الجبال",
    description: "طبيعة خلابة ومناخ معتدل في عروس الجبال والتراث العسيري",
    image: "/abha-green-mountains-terraces-traditional-village.jpg",
    days: 4,
    price: 1800,
    originalPrice: 2200,
    rating: 4.7,
    reviews: 189,
    highlights: [
      "تسجيل الدخول في الفندق في أبها",
      "جولة في مدينة أبها",
      "زيارة جبل السودة بالتلفريك",
      "عشاء في مطعم مع إطلالة على المدينة",
    ],
    itinerary: [
      {
        day: 1,
        title: "الوصول واستكشاف أبها",
        description: "الوصول إلى أبها، تسجيل الدخول في الفندق، جولة في المدينة، زيارة جبل السودة",
        activities: [
          "الاستقبال في المطار والتوجه إلى الفندق",
          "جولة في مدينة أبها ومشاهدة معالمها",
          "زيارة جبل السودة والتلفريك",
          "عشاء في مطعم يطل على المدينة",
        ],
      },
      {
        day: 2,
        title: "جبل السودة وقرية رجال المع",
        description: "رحلة إلى جبل السودة وزيارة قرية رجال المع التراثية (موقع اليونسكو)",
        activities: [
          "الصعود إلى جبل السودة بالتلفريك",
          "زيارة قرية رجال المع التراثية (موقع اليونسكو)",
          "استكشاف المعمار التقليدي في المنطقة",
          "عشاء في مطعم تقليدي يقدم المأكولات العسيرية",
        ],
      },
      {
        day: 3,
        title: "وادي محلحلة ومتنزه أبو خيال",
        description: "زيارة وادي محلحلة للاستمتاع بالطبيعة، ثم متنزه أبو خيال",
        activities: [
          "جولة في وادي محلحلة والطبيعة الخضراء",
          "زيارة متنزه أبو خيال والاستمتاع بالجلسات",
          "وقت حر للتسوق في الأسواق الشعبية",
          "عشاء حر",
        ],
      },
      {
        day: 4,
        title: "المدرجات الزراعية والعودة",
        description: "استكشاف المدرجات الزراعية الخضراء والأسواق التقليدية",
        activities: [
          "زيارة المدرجات الزراعية في تنومة أو قريبا",
          "التعرف على الزراعة التقليدية في المنطقة",
          "التسوق من الأسواق الشعبية والمنتجات المحلية",
          "المغادرة والعودة",
        ],
      },
    ],
    includes: [
      "إقامة 3 ليالي في فندق جبلي",
      "وجبات الإفطار يومياً",
      "مرشد محلي",
      "النقل الجبلي",
      "تذاكر التلفريك والمواقع",
    ],
    excludes: ["تذاكر الطيران", "التأمين", "الوجبات غير المذكورة"],
  },
}

export default function PackageDetailPage() {
  const params = useParams()
  const id = params.id as string
  const pkg = packagesData[id as keyof typeof packagesData]
  const [activeDay, setActiveDay] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (currentScrollY / docHeight) * 100

      setScrollProgress(progress)
      setHeaderVisible(currentScrollY < lastScrollY.current || currentScrollY < 100)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">الباقة غير موجودة</h1>
          <Link href="/packages" className="text-accent hover:underline">
            العودة للباقات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/10 z-[70]">
        <div
          className="h-full bg-gradient-to-r from-accent via-jado-orange to-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-lg transition-all duration-500 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ boxShadow: "0 10px 40px rgba(0, 28, 67, 0.3)" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/packages"
              className="text-white hover:text-secondary transition-colors flex items-center gap-2 group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="rotate-180 transition-transform group-hover:-translate-x-1"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <span className="font-bold">العودة</span>
            </Link>

            <div className="hidden md:block text-white text-center">
              <p className="text-sm text-white/60">الباقة السياحية</p>
              <h2 className="font-bold text-lg">{pkg.title}</h2>
            </div>

            <Link
              href={`/booking?package=${id}`}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-accent/50"
            >
              احجز الآن
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden">
        <div
          className="absolute inset-0 scale-110"
          style={{
            transform: `translateY(${scrollProgress * 0.5}px)`,
          }}
        >
          <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl animate-fade-up">
              <div className="inline-block bg-accent/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                {pkg.days} أيام / {pkg.days - 1} ليالٍ
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">{pkg.title}</h1>
              <p className="text-xl text-white/80 mb-6">{pkg.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.5 7.5H22l-6.5 5 2.5 7.5-6-5-6 5 2.5-7.5-6.5-5h7.5z" />
                  </svg>
                  <span className="font-bold">{pkg.rating}</span>
                  <span>({pkg.reviews} تقييم)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-accent">{pkg.price} ر.س</span>
                  <span className="text-white/40 line-through">{pkg.originalPrice} ر.س</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Highlights */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">نظرة عامة</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pkg.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                style={{
                  animation: `fade-up 0.8s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Itinerary */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">البرنامج اليومي</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            برنامج مفصل لكل يوم من الرحلة مع جميع الأنشطة المخطط لها
          </p>

          <div className="max-w-5xl mx-auto">
            {/* Day Tabs */}
            <div className="flex overflow-x-auto gap-4 mb-12 pb-4 scrollbar-hide">
              {pkg.itinerary.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`flex-shrink-0 px-8 py-4 rounded-full font-bold transition-all duration-500 whitespace-nowrap ${
                    activeDay === index
                      ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                      : "bg-card text-muted-foreground hover:bg-card/80"
                  }`}
                >
                  اليوم {day.day}
                </button>
              ))}
            </div>

            {/* Day Content with smooth transition */}
            <div className="relative">
              {pkg.itinerary.map((day, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    activeDay === index
                      ? "opacity-100 translate-x-0 relative"
                      : "opacity-0 translate-x-10 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <div className="bg-card p-8 md:p-12 rounded-3xl shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-accent">{day.day}</span>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold mb-2">{day.title}</h3>
                        <p className="text-muted-foreground">{day.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {day.activities.map((activity, actIndex) => (
                        <div
                          key={actIndex}
                          className="flex items-start gap-4 p-4 bg-background rounded-xl hover:shadow-md transition-all duration-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <p className="text-lg leading-relaxed">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Includes & Excludes */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Includes */}
            <div className="bg-card p-8 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">الباقة تشمل</h3>
              </div>
              <ul className="space-y-4">
                {pkg.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" opacity="0.2" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excludes */}
            <div className="bg-card p-8 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">الباقة لا تشمل</h3>
              </div>
              <ul className="space-y-4">
                {pkg.excludes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" opacity="0.2" />
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">جاهز لبدء المغامرة؟</h2>
            <p className="text-xl text-white/80 mb-12">احجز الآن واستمتع برحلة لا تُنسى</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href={`/booking?package=${id}`}
                className="bg-accent hover:bg-accent/90 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-accent/50 transition-all inline-flex items-center gap-3 hover:scale-105"
              >
                احجز هذه الباقة
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white px-12 py-5 rounded-full font-bold text-lg backdrop-blur-md border border-white/20 transition-all"
              >
                تواصل معنا
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.5 7.5H22l-6.5 5 2.5 7.5-6-5-6 5 2.5-7.5-6.5-5h7.5z" />
                </svg>
                <span>تقييم {pkg.rating}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{pkg.reviews} مسافر</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{pkg.days} أيام</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
