"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Target, Eye, Heart, Shield, Star, Users, Award, Clock } from "lucide-react"

const stats = [
  { number: "5000+", label: "عميل سعيد" },
  { number: "50+", label: "وجهة سياحية" },
  { number: "4.9", label: "تقييم العملاء" },
  { number: "4", label: "سنوات خبرة" },
]

const values = [
  { icon: Heart, title: "الشغف", description: "نحب ما نعمل ونتحمس لتقديم أفضل التجارب السياحية" },
  { icon: Shield, title: "الأمان", description: "نضع سلامة وأمان عملائنا في المقدمة دائماً" },
  { icon: Star, title: "التميز", description: "نسعى للتميز في كل تفصيل لنقدم خدمات تفوق التوقعات" },
  { icon: Users, title: "العمل الجماعي", description: "نؤمن بقوة الفريق الواحد لتحقيق أهدافنا" },
  { icon: Award, title: "الجودة", description: "نلتزم بأعلى معايير الجودة في جميع خدماتنا" },
  { icon: Clock, title: "الالتزام", description: "نلتزم بوعودنا ومواعيدنا ونحترم وقت عملائنا" },
]

const timeline = [
  { year: "2020", title: "البداية", description: "تأسست شركة جادوا برؤية لتقديم تجارب سياحية استثنائية" },
  { year: "2021", title: "التوسع", description: "توسعنا لنشمل أكثر من 20 وجهة سياحية في المملكة" },
  { year: "2022", title: "التميز", description: "حصلنا على شهادة التميز في خدمة العملاء" },
  { year: "2023", title: "النمو", description: "وصلنا لخدمة أكثر من 5000 عميل سنوياً" },
  { year: "2024", title: "المستقبل", description: "نستمر في الابتكار وتقديم تجارب فريدة" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/saudi-arabia-desert-landscape-at-sunset-with-golde.jpg"
            alt="جادوا للسياحة"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>

        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">قصة جادوا</h1>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
            رحلة بدأت بحلم لنقل جمال المملكة العربية السعودية إلى العالم
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/80 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-medium mb-4 block">من نحن</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">نصنع ذكريات لا تُنسى</h2>
              <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  تأسست شركة جادوا للسياحة والسفر في عام 2020 بهدف تقديم تجارب سياحية استثنائية تعكس جمال وتنوع المملكة
                  العربية السعودية.
                </p>
                <p>
                  نؤمن بأن السياحة ليست مجرد زيارة أماكن جديدة، بل هي رحلة لاكتشاف الثقافات والتاريخ والطبيعة الخلابة.
                  لذلك نحرص على تقديم برامج سياحية متنوعة تناسب جميع الأذواق.
                </p>
                <p>اليوم، نفخر بخدمة آلاف العملاء سنوياً وتقديم تجارب لا تُنسى في أجمل وجهات المملكة.</p>
              </div>
            </div>

            {/* Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="h-48 rounded-3xl overflow-hidden">
                    <Image
                      src="/alula-hegra-ancient-nabataean-tombs-carved-in-rock.jpg"
                      alt="العلا"
                      width={300}
                      height={200}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="h-64 rounded-3xl overflow-hidden">
                    <Image
                      src="/riyadh-modern-skyline-with-kingdom-tower-at-night.jpg"
                      alt="الرياض"
                      width={300}
                      height={280}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-12">
                  <div className="h-64 rounded-3xl overflow-hidden">
                    <Image
                      src="/jeddah-al-balad-historic-district-with-traditional.jpg"
                      alt="جدة"
                      width={300}
                      height={280}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="h-48 rounded-3xl overflow-hidden">
                    <Image
                      src="/abha-green-mountains-terraces-traditional-village-.jpg"
                      alt="أبها"
                      width={300}
                      height={200}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-10 text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">رؤيتنا</h3>
              <p className="text-secondary leading-relaxed">
                أن نكون الشركة الرائدة في مجال السياحة والسفر في المملكة العربية السعودية، ونساهم في تعزيز مكانة المملكة
                كوجهة سياحية عالمية.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-10 text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">رسالتنا</h3>
              <p className="text-secondary leading-relaxed">
                نلتزم بتقديم خدمات سياحية متميزة وآمنة تتجاوز توقعات عملائنا، من خلال فريق محترف وبرامج مبتكرة تجمع بين
                الأصالة والحداثة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-medium mb-4 block">ما يميزنا</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">قيمنا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              القيم التي نؤمن بها وتوجه عملنا في كل رحلة نقدمها
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-medium mb-4 block">رحلتنا</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">مسيرة النجاح</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-secondary" />

            <div className="flex flex-col gap-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-8 items-start">
                  {/* Year Circle */}
                  <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{item.year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-accent to-accent/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-6">انضم إلى رحلتنا</h2>
          <p className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            اكتشف جمال المملكة العربية السعودية معنا واصنع ذكريات لا تُنسى
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-card text-accent hover:bg-card/90 rounded-full px-10 py-6 text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                احجز رحلتك الآن
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full px-10 py-6 text-lg font-bold transition-all duration-300 bg-transparent"
              >
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
