"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { CalendarIcon, Users, MapPin, Clock, Star, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

const packages = [
  { id: "riyadh", name: "باقة الرياض الذهبية", duration: "3 أيام / 2 ليالي", price: 1200, rating: 4.8 },
  { id: "jeddah", name: "باقة جدة التراثية", duration: "4 أيام / 3 ليالي", price: 1500, rating: 4.9 },
  { id: "alula", name: "باقة العلا الأثرية", duration: "5 أيام / 4 ليالي", price: 2200, rating: 5.0 },
  { id: "abha", name: "باقة أبها الجبلية", duration: "4 أيام / 3 ليالي", price: 1800, rating: 4.7 },
  { id: "eastern", name: "باقة الشرقية", duration: "3 أيام / 2 ليالي", price: 1100, rating: 4.6 },
  { id: "taif", name: "باقة الطائف", duration: "3 أيام / 2 ليالي", price: 1300, rating: 4.8 },
]

function BookingContent() {
  const searchParams = useSearchParams()
  const preSelectedPackage = searchParams.get("package") || ""

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState(preSelectedPackage)
  const [startDate, setStartDate] = useState<Date>()
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  useEffect(() => {
    if (preSelectedPackage) {
      setSelectedPackage(preSelectedPackage)
    }
  }, [preSelectedPackage])

  const selectedPackageData = packages.find((pkg) => pkg.id === selectedPackage)
  const totalPrice = selectedPackageData
    ? selectedPackageData.price * Number.parseInt(adults) + selectedPackageData.price * 0.5 * Number.parseInt(children)
    : 0

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(4)
  }

  const steps = [
    { number: 1, title: "اختر الباقة" },
    { number: 2, title: "التاريخ والأشخاص" },
    { number: 3, title: "البيانات الشخصية" },
  ]

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SharedHeader />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/saudi-arabia-desert-landscape-at-sunset-with-golde.jpg"
            alt="احجز رحلتك"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001c43]/80 via-[#001c43]/60 to-[#001c43]/90" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">احجز رحلتك</h1>
          <p className="text-xl text-[#cac3b0]">ابدأ مغامرتك في اكتشاف المملكة</p>
        </div>
      </section>

      {/* Progress Steps */}
      {currentStep < 4 && (
        <section className="py-8 px-6 bg-white border-b">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                        currentStep >= step.number ? "bg-[#af4b32] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        currentStep >= step.number ? "text-[#001c43]" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 md:w-32 h-1 mx-4 rounded ${
                        currentStep > step.number ? "bg-[#af4b32]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Area */}
            <div className="lg:col-span-2">
              {/* Step 1: Select Package */}
              {currentStep === 1 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#001c43] mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#af4b32]" />
                    اختر الباقة السياحية
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedPackage === pkg.id
                            ? "border-[#af4b32] bg-[#af4b32]/5"
                            : "border-gray-200 hover:border-[#af4b32]/50"
                        }`}
                      >
                        <h3 className="font-bold text-[#001c43] mb-2">{pkg.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Clock className="w-4 h-4" />
                          {pkg.duration}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{pkg.rating}</span>
                          </div>
                          <span className="text-lg font-bold text-[#af4b32]">{pkg.price} ريال</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-8">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedPackage}
                      className="bg-[#af4b32] hover:bg-[#af4b32]/90 text-white rounded-full px-8 py-6"
                    >
                      التالي
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Guests */}
              {currentStep === 2 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#001c43] mb-6 flex items-center gap-3">
                    <CalendarIcon className="w-6 h-6 text-[#af4b32]" />
                    اختر التاريخ وعدد الأشخاص
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-[#001c43] font-medium mb-3 block">تاريخ بداية الرحلة</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-14 justify-start text-right rounded-xl bg-transparent"
                          >
                            <CalendarIcon className="ml-3 h-5 w-5 text-[#af4b32]" />
                            {startDate ? format(startDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#001c43] font-medium mb-3 block">عدد البالغين</Label>
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger className="h-14 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "شخص" : "أشخاص"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-[#001c43] font-medium mb-3 block">عدد الأطفال</Label>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger className="h-14 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num === 0 ? "لا يوجد" : `${num} ${num === 1 ? "طفل" : "أطفال"}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="rounded-full px-8 py-6">
                      <ArrowRight className="w-5 h-5 ml-2" />
                      السابق
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!startDate}
                      className="bg-[#af4b32] hover:bg-[#af4b32]/90 text-white rounded-full px-8 py-6"
                    >
                      التالي
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Personal Info */}
              {currentStep === 3 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#001c43] mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#af4b32]" />
                    المعلومات الشخصية
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#001c43] font-medium mb-3 block">الاسم الأول *</Label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="h-14 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[#001c43] font-medium mb-3 block">اسم العائلة *</Label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="h-14 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-[#001c43] font-medium mb-3 block">البريد الإلكتروني *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-14 rounded-xl"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-[#001c43] font-medium mb-3 block">رقم الهاتف *</Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="h-14 rounded-xl"
                        placeholder="+966 50 123 4567"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-[#001c43] font-medium mb-3 block">طلبات خاصة (اختياري)</Label>
                      <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        className="min-h-[120px] rounded-xl"
                        placeholder="أي طلبات خاصة أو ملاحظات..."
                      />
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} className="rounded-full px-8 py-6">
                        <ArrowRight className="w-5 h-5 ml-2" />
                        السابق
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#af4b32] hover:bg-[#af4b32]/90 text-white rounded-full px-8 py-6"
                      >
                        تأكيد الحجز
                        <CheckCircle className="w-5 h-5 mr-2" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 4: Success */}
              {currentStep === 4 && (
                <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#001c43] mb-4">تم تأكيد حجزك بنجاح!</h2>
                  <p className="text-xl text-gray-600 mb-8">شكراً لاختيارك جادوا للسياحة والسفر</p>
                  <p className="text-gray-500 mb-8">سيتم التواصل معك خلال 24 ساعة لتأكيد تفاصيل الرحلة</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button className="bg-[#001c43] hover:bg-[#001c43]/90 text-white rounded-full px-8 py-6">
                        العودة للرئيسية
                      </Button>
                    </Link>
                    <Link href="/packages">
                      <Button variant="outline" className="rounded-full px-8 py-6 bg-transparent">
                        تصفح المزيد من الباقات
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            {currentStep < 4 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
                  <h3 className="text-xl font-bold text-[#001c43] mb-6">ملخص الحجز</h3>

                  {selectedPackageData && (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#001c43]/5 rounded-2xl">
                        <h4 className="font-bold text-[#001c43] mb-1">{selectedPackageData.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {selectedPackageData.duration}
                        </div>
                      </div>

                      {startDate && (
                        <div className="flex justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500">تاريخ الرحلة</span>
                          <span className="font-medium">{format(startDate, "PPP", { locale: ar })}</span>
                        </div>
                      )}

                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500">البالغين</span>
                        <span className="font-medium">{adults} شخص</span>
                      </div>

                      {Number.parseInt(children) > 0 && (
                        <div className="flex justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500">الأطفال</span>
                          <span className="font-medium">{children} طفل</span>
                        </div>
                      )}

                      <div className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[#001c43]">الإجمالي</span>
                          <span className="text-2xl font-bold text-[#af4b32]">{totalPrice.toLocaleString()} ريال</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">* شامل جميع الضرائب والرسوم</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">جاري التحميل...</div>}
    >
      <BookingContent />
    </Suspense>
  )
}
