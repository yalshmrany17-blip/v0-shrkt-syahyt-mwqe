"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { JadoLogo } from "@/components/jado-logo"

const jobOpenings = [
  {
    id: 1,
    title: "مدير عمليات سياحية",
    department: "العمليات",
    location: "الرياض",
    type: "دوام كامل",
    description: "نبحث عن مدير عمليات ذو خبرة في إدارة الرحلات السياحية والتنسيق مع الشركاء.",
  },
  {
    id: 2,
    title: "مستشار سياحي",
    department: "المبيعات",
    location: "جدة",
    type: "دوام كامل",
    description: "مستشار سياحي لمساعدة العملاء في اختيار الباقات المناسبة وتقديم استشارات السفر.",
  },
  {
    id: 3,
    title: "مصمم تجارب سياحية",
    department: "التطوير",
    location: "الرياض",
    type: "دوام كامل",
    description: "تصميم تجارب سياحية فريدة ومبتكرة تعكس ثقافة وتراث المملكة.",
  },
  {
    id: 4,
    title: "مدير تسويق رقمي",
    department: "التسويق",
    location: "الرياض",
    type: "دوام كامل",
    description: "قيادة استراتيجيات التسويق الرقمي وإدارة الحملات الإعلانية.",
  },
  {
    id: 5,
    title: "مرشد سياحي",
    department: "العمليات",
    location: "العلا",
    type: "دوام جزئي",
    description: "مرشد سياحي للمجموعات في منطقة العلا التاريخية.",
  },
]

const benefits = [
  { icon: "salary", title: "رواتب تنافسية", description: "حزمة رواتب ومكافآت تنافسية" },
  { icon: "health", title: "تأمين صحي", description: "تأمين طبي شامل لك ولعائلتك" },
  { icon: "travel", title: "خصومات سفر", description: "خصومات حصرية على جميع الرحلات" },
  { icon: "growth", title: "تطوير مهني", description: "برامج تدريب وتطوير مستمرة" },
  { icon: "balance", title: "توازن الحياة", description: "بيئة عمل مرنة وداعمة" },
  { icon: "team", title: "فريق متميز", description: "العمل مع نخبة من المحترفين" },
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
  })
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-primary/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <JadoLogo size="sm" variant="light" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
              الرئيسية
            </Link>
            <Link href="/packages" className="text-white/80 hover:text-white text-sm transition-colors">
              الباقات
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white text-sm transition-colors">
              من نحن
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white text-sm transition-colors">
              تواصل معنا
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">انضم لفريق جادوا</h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              نبحث عن شغوفين بالسياحة والضيافة للانضمام إلى فريقنا المتميز وصناعة تجارب سفر لا تُنسى
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">لماذا تعمل معنا؟</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  {benefit.icon === "salary" && (
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {benefit.icon === "health" && (
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                  {benefit.icon === "travel" && (
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {benefit.icon === "growth" && (
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  )}
                  {benefit.icon === "balance" && (
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {benefit.icon === "team" && (
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold text-primary text-sm mb-1">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">الوظائف المتاحة</h2>
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className={`bg-card border rounded-lg overflow-hidden transition-all ${
                  selectedJob === job.id ? "border-accent shadow-md" : "border-border hover:border-accent/50"
                }`}
              >
                <button
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="w-full p-4 text-right"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`transform transition-transform ${selectedJob === job.id ? "rotate-180" : ""}`}>
                        <svg
                          className="w-5 h-5 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{job.type}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-lg">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </button>
                {selectedJob === job.id && (
                  <div className="px-4 pb-4 border-t border-border pt-4">
                    <p className="text-muted-foreground text-sm mb-4">{job.description}</p>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, position: job.title }))
                        document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                    >
                      تقدم لهذه الوظيفة
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-2">قدم سيرتك الذاتية</h2>
            <p className="text-muted-foreground text-center mb-8">
              لم تجد الوظيفة المناسبة؟ أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة
            </p>

            {submitted ? (
              <div className="bg-card p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">تم استلام طلبك بنجاح</h3>
                <p className="text-muted-foreground mb-4">
                  شكراً لاهتمامك بالانضمام لفريق جادوا. سنراجع طلبك ونتواصل معك قريباً.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", email: "", phone: "", position: "", experience: "", message: "" })
                    setResume(null)
                  }}
                  className="text-accent hover:underline"
                >
                  تقديم طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card p-6 md:p-8 rounded-xl shadow-sm">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      الاسم الكامل <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      البريد الإلكتروني <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      رقم الجوال <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">الوظيفة المطلوبة</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm bg-background"
                    >
                      <option value="">اختر الوظيفة</option>
                      {jobOpenings.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-primary mb-1">سنوات الخبرة</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm bg-background"
                  >
                    <option value="">اختر سنوات الخبرة</option>
                    <option value="0-1">أقل من سنة</option>
                    <option value="1-3">1-3 سنوات</option>
                    <option value="3-5">3-5 سنوات</option>
                    <option value="5-10">5-10 سنوات</option>
                    <option value="10+">أكثر من 10 سنوات</option>
                  </select>
                </div>

                {/* Resume Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-primary mb-1">
                    السيرة الذاتية <span className="text-accent">*</span>
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      {resume ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-primary font-medium">{resume.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setResume(null)
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="w-10 h-10 text-muted-foreground mx-auto mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="text-muted-foreground text-sm">اضغط هنا لرفع السيرة الذاتية</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (حد أقصى 5 ميجابايت)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-primary mb-1">رسالة إضافية</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm resize-none"
                    placeholder="أخبرنا المزيد عن نفسك..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    "إرسال الطلب"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <JadoLogo size="sm" variant="light" showText />
            <p className="text-white/60 text-sm">جميع الحقوق محفوظة لشركة جادوا للسياحة © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
