"use client"

import Link from "next/link"
import Image from "next/image"
import { JadoLogo } from "@/components/jado-logo"

const services = [
  {
    icon: "🏢",
    title: "تنظيم المؤتمرات",
    description: "خدمات متكاملة لتنظيم المؤتمرات والملتقيات بأعلى المعايير",
  },
  {
    icon: "✈️",
    title: "رحلات الأعمال",
    description: "تخطيط وتنظيم رحلات الأعمال للشركات والمؤسسات",
  },
  {
    icon: "🎯",
    title: "الفعاليات المخصصة",
    description: "تصميم وتنفيذ فعاليات حصرية تناسب أهداف شركتك",
  },
  {
    icon: "🤝",
    title: "برامج الضيافة",
    description: "استقبال الوفود والضيوف بأرقى خدمات الضيافة السعودية",
  },
  {
    icon: "🏨",
    title: "حجوزات الشركات",
    description: "أسعار خاصة وخدمات مميزة للحجوزات المؤسسية",
  },
  {
    icon: "📋",
    title: "إدارة السفر",
    description: "إدارة شاملة لبرامج السفر المؤسسية",
  },
]

const benefits = [
  { number: "30%", label: "توفير في التكاليف" },
  { number: "24/7", label: "دعم على مدار الساعة" },
  { number: "100+", label: "شركة شريكة" },
  { number: "5000+", label: "رحلة عمل ناجحة" },
]

const testimonials = [
  {
    quote: "جادوا شريك موثوق في تنظيم جميع رحلات فريقنا، خدمة احترافية ومتميزة",
    author: "أحمد الراشد",
    position: "مدير الموارد البشرية",
    company: "شركة التقنية المتقدمة",
  },
  {
    quote: "ساعدونا في تنظيم مؤتمرنا السنوي بشكل مثالي، نتائج فاقت التوقعات",
    author: "سارة العتيبي",
    position: "مديرة التسويق",
    company: "مجموعة الابتكار",
  },
]

export default function ExecutivePartnerPage() {
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
            <Link href="/executive-partner" className="text-white">
              شريكك التنفيذي
            </Link>
            <Link href="/events" className="hover:text-white transition-colors">
              الفعاليات
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              تواصل معنا
            </Link>
          </nav>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            تواصل معنا
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 min-h-[70vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/modern-office-conference-meeting-business-professi.jpg"
            alt="جادوا شريكك التنفيذي"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/95 to-primary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-accent text-white rounded-full text-sm mb-4">
              للشركات والمؤسسات
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              جادوا
              <br />
              <span className="text-accent">شريكك التنفيذي</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-6 leading-relaxed">
              حلول سفر مؤسسية متكاملة تلبي احتياجات شركتك. من تنظيم المؤتمرات إلى إدارة رحلات الأعمال، نحن شريكك
              الموثوق.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                احصل على عرض
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+966501234567"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{benefit.number}</div>
                <div className="text-sm text-muted-foreground">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-accent text-sm">خدماتنا</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">حلول متكاملة لأعمالك</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-accent text-sm">كيف نعمل</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">خطوات بسيطة للبدء</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "تواصل معنا", desc: "أخبرنا عن احتياجات شركتك" },
              { step: "02", title: "نحلل متطلباتك", desc: "نفهم أهدافك ونصمم الحل المناسب" },
              { step: "03", title: "نقدم العرض", desc: "عرض مخصص يناسب ميزانيتك" },
              { step: "04", title: "ننفذ بإتقان", desc: "نضمن تجربة استثنائية" },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-border -z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-accent text-sm">آراء عملائنا</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">ماذا يقول شركاؤنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border">
                <svg className="w-8 h-8 text-accent/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-foreground mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  <div className="text-sm text-accent">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">جاهز لتطوير تجربة السفر في شركتك؟</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm">
            تواصل معنا اليوم واحصل على استشارة مجانية وعرض مخصص لاحتياجات شركتك
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              احصل على عرض مخصص
            </Link>
            <a
              href="mailto:Contact@jadosaudi.com"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Contact@jadosaudi.com
            </a>
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
