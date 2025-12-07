"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, ArrowLeft } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "الهاتف",
    value: "+966 54 542 1428",
    description: "متاح 24/7 لخدمتك",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: "Contact@jadosaudi.com",
    description: "سنرد خلال 24 ساعة",
  },
  {
    icon: MapPin,
    title: "العنوان",
    value: "شارع الملك فهد، حي العليا",
    description: "الرياض، المملكة العربية السعودية",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    value: "السبت - الخميس: 9 ص - 6 م",
    description: "الجمعة: 2 م - 6 م",
  },
]

const faqs = [
  {
    question: "كيف يمكنني حجز رحلة؟",
    answer:
      "يمكنك حجز رحلتك بسهولة من خلال موقعنا الإلكتروني أو الاتصال بنا مباشرة. اختر الباقة المناسبة، واملأ البيانات المطلوبة.",
  },
  {
    question: "ما هي سياسة الإلغاء؟",
    answer: "يمكن إلغاء الحجز مجاناً حتى 48 ساعة قبل موعد الرحلة. بعد ذلك، قد تطبق رسوم إلغاء حسب نوع الباقة.",
  },
  {
    question: "هل تشمل الباقات الإقامة والوجبات؟",
    answer: "نعم، معظم باقاتنا تشمل الإقامة في فنادق مختارة والوجبات الأساسية. تفاصيل كل باقة موضحة بوضوح.",
  },
  {
    question: "هل يمكن تخصيص الرحلة؟",
    answer: "بالطبع! نقدم خدمة تخصيص الرحلات حسب رغباتك واحتياجاتك الخاصة. تواصل معنا لمناقشة متطلباتك.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/saudi-arabia-desert-landscape-at-sunset-with-golde.jpg"
            alt="تواصل معنا"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>

        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">تواصل معنا</h1>
          <p className="text-xl md:text-2xl text-secondary">نحن هنا لمساعدتك في التخطيط لرحلتك المثالية</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-6 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                  <info.icon className="w-8 h-8 text-primary group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-primary mb-2">{info.title}</h3>
                <p className="text-accent font-medium mb-1">{info.value}</p>
                <p className="text-muted-foreground text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <span className="text-accent font-medium mb-4 block">راسلنا</span>
              <h2 className="text-4xl font-bold text-primary mb-8">أرسل لنا رسالة</h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-primary font-medium mb-2 block">
                        الاسم الكامل *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-14 rounded-xl border-border focus:border-accent focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-primary font-medium mb-2 block">
                        البريد الإلكتروني *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-14 rounded-xl border-border focus:border-accent focus:ring-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-primary font-medium mb-2 block">
                        رقم الهاتف *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="h-14 rounded-xl border-border focus:border-accent focus:ring-accent"
                        placeholder="+966 50 123 4567"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-primary font-medium mb-2 block">
                        الموضوع *
                      </Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger className="h-14 rounded-xl border-border">
                          <SelectValue placeholder="اختر الموضوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">استفسار عن الحجز</SelectItem>
                          <SelectItem value="packages">استفسار عن الباقات</SelectItem>
                          <SelectItem value="complaint">شكوى أو اقتراح</SelectItem>
                          <SelectItem value="partnership">شراكة تجارية</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-primary font-medium mb-2 block">
                      الرسالة *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="min-h-[180px] rounded-xl border-border focus:border-accent focus:ring-accent"
                      placeholder="اكتب رسالتك هنا..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        جاري الإرسال...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        إرسال الرسالة
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="bg-green-50 rounded-3xl p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-muted-foreground mb-8">شكراً لتواصلك معنا. سيتم الرد على رسالتك خلال 24 ساعة.</p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                    }}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    إرسال رسالة أخرى
                  </Button>
                </div>
              )}

              {/* WhatsApp Button */}
              <div className="mt-8">
                <a
                  href="https://wa.me/966545421428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full h-14 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300"
                >
                  <MessageCircle className="w-6 h-6" />
                  تواصل عبر واتساب
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <span className="text-accent font-medium mb-4 block">أسئلة شائعة</span>
              <h2 className="text-4xl font-bold text-primary mb-8">كيف نساعدك؟</h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-primary mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 bg-primary rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">جاهز لحجز رحلتك؟</h3>
                <p className="text-secondary mb-6">استكشف باقاتنا السياحية المتنوعة</p>
                <Link href="/packages">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-6 text-lg">
                    تصفح الباقات
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
