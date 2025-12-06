"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link href="/">
              <Image src="/images/jado-logo.png" alt="جادو للسياحة" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link href="/packages" className="text-foreground hover:text-primary transition-colors">
              الباقات
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
              معرض الصور
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              من نحن
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
              المدونة
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              تواصل معنا
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="outline" size="sm">
              تسجيل الدخول
            </Button>
            <Link href="/booking">
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                احجز الآن
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2">
              <Link href="/" className="block px-3 py-2 text-foreground hover:text-primary">
                الرئيسية
              </Link>
              <Link href="/packages" className="block px-3 py-2 text-foreground hover:text-primary">
                الباقات
              </Link>
              <Link href="/gallery" className="block px-3 py-2 text-foreground hover:text-primary">
                معرض الصور
              </Link>
              <Link href="/about" className="block px-3 py-2 text-foreground hover:text-primary">
                من نحن
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-foreground hover:text-primary">
                المدونة
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-foreground hover:text-primary">
                تواصل معنا
              </Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Button variant="outline" size="sm">
                  تسجيل الدخول
                </Button>
                <Link href="/booking">
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    احجز الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
