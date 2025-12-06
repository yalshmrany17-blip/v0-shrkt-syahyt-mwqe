import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/">
              <Image
                src="/images/jado-logo.png"
                alt="جادو للسياحة"
                width={120}
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-white/80 mb-4">
              شركة جادو للسياحة - رحلات استثنائية وتجارب لا تُنسى في أجمل الوجهات السياحية
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button size="sm" variant="ghost" className="text-white hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-accent">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-white/80 hover:text-white transition-colors">
                  الباقات
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-white transition-colors">
                  معرض الصور
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">النشرة الإخبارية</h4>
            <p className="text-white/80 mb-4">اشترك في نشرتنا الإخبارية لتحصل على أحدث العروض والأخبار</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-accent hover:bg-accent/90">اشتراك</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80">© 2024 جادو للسياحة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
