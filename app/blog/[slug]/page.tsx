import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, ArrowLeft, Share2, BookOpen, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 1,
    slug: "discover-alula-hidden-gems",
    title: "اكتشف الجواهر المخفية في العلا",
    excerpt: "رحلة استكشافية إلى أسرار العلا التاريخية والطبيعية التي لم تكتشفها من قبل",
    content: `
      <h2>العلا: جوهرة التاريخ والطبيعة</h2>
      <p>العلا، هذه الجوهرة التاريخية في شمال غرب المملكة العربية السعودية، تحتضن كنوزاً أثرية وطبيعية لا تُقدر بثمن. من مدائن صالح الأثرية إلى التكوينات الصخرية الفريدة، تقدم العلا تجربة سياحية لا تُنسى.</p>
      
      <h3>مدائن صالح: عاصمة الحضارة النبطية</h3>
      <p>تُعتبر مدائن صالح أول موقع في المملكة العربية السعودية يُدرج في قائمة التراث العالمي لليونسكو. هذا الموقع الأثري الاستثنائي يضم أكثر من 130 مقبرة منحوتة في الصخر، تعود إلى الحضارة النبطية التي ازدهرت بين القرن الأول قبل الميلاد والقرن الأول الميلادي.</p>
      
      <h3>جبل الفيل: تحفة طبيعية</h3>
      <p>يُعد جبل الفيل من أشهر المعالم الطبيعية في العلا، حيث تشكل عبر ملايين السنين ليأخذ شكل الفيل الضخم. هذا التكوين الصخري الفريد يقف شامخاً في الصحراء، ويُعتبر من أفضل المواقع لمشاهدة غروب الشمس.</p>
      
      <h3>البلدة القديمة: رحلة في الزمن</h3>
      <p>تحكي البلدة القديمة في العلا قصة الحياة في الواحة عبر القرون. بيوتها الطينية المهجورة والأزقة الضيقة تنقلك إلى عالم آخر، حيث يمكنك تخيل الحياة اليومية للسكان الذين عاشوا هنا لأكثر من 800 عام.</p>
      
      <h3>نصائح للزيارة</h3>
      <ul>
        <li>أفضل وقت للزيارة: من أكتوبر إلى مارس</li>
        <li>احجز جولاتك مسبقاً عبر موقع "تجربة العلا"</li>
        <li>لا تنس إحضار كاميرا لتوثيق هذه التجربة الفريدة</li>
        <li>ارتدِ ملابس مريحة ومناسبة للمشي</li>
      </ul>
    `,
    image: "/alula-hidden-gems.png",
    author: "فريق جادوا",
    date: "2024-01-15",
    category: "وجهات سياحية",
    tags: ["العلا", "تاريخ", "آثار", "طبيعة"],
    readTime: "5 دقائق",
  },
  // Add more blog posts here...
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "المقال غير موجود - جادوا للسياحة",
    }
  }

  return {
    title: `${post.title} - مدونة جادوا`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="py-4 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-jado-orange">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-jado-orange">
              المدونة
            </Link>
            <span>/</span>
            <span className="text-jado-navy font-medium">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-jado-orange text-white mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-jado-navy mb-6">{post.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString("ar-SA")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={`/abstract-geometric-shapes.png?height=400&width=800&query=${encodeURIComponent(post.title)}`}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-3">
                <div
                  className="prose prose-lg max-w-none text-right prose-headings:text-jado-navy prose-a:text-jado-orange prose-strong:text-jado-navy"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-jado-navy mb-4">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        <Tag className="w-3 h-3 ml-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-jado-navy mb-4">شارك المقال</h3>
                  <Button
                    variant="outline"
                    className="border-jado-orange text-jado-orange hover:bg-jado-orange hover:text-white bg-transparent"
                  >
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </Button>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Author Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-jado-navy mb-2">الكاتب</h3>
                    <p className="text-gray-600 mb-4">{post.author}</p>
                    <p className="text-sm text-gray-500">
                      خبير سياحي في فريق جادوا، متخصص في استكشاف الوجهات السعودية الفريدة
                    </p>
                  </div>

                  {/* Related Categories */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-jado-navy mb-4">فئات ذات صلة</h3>
                    <div className="space-y-2">
                      <Link
                        href="/blog?category=وجهات-سياحية"
                        className="block text-sm text-gray-600 hover:text-jado-orange"
                      >
                        وجهات سياحية
                      </Link>
                      <Link
                        href="/blog?category=تراث-وثقافة"
                        className="block text-sm text-gray-600 hover:text-jado-orange"
                      >
                        تراث وثقافة
                      </Link>
                      <Link
                        href="/blog?category=مغامرات"
                        className="block text-sm text-gray-600 hover:text-jado-orange"
                      >
                        مغامرات
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-jado-navy text-center mb-12">مقالات ذات صلة</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=200&width=400&query=${encodeURIComponent(relatedPost.title)}`}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <Badge className="bg-jado-orange text-white mb-3">{relatedPost.category}</Badge>

                    <h3 className="text-lg font-bold text-jado-navy mb-3 group-hover:text-jado-orange transition-colors">
                      {relatedPost.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>

                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button size="sm" className="bg-jado-navy hover:bg-jado-navy/90 group">
                        اقرأ المزيد
                        <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-jado-orange text-jado-orange hover:bg-jado-orange hover:text-white bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للمدونة
              </Button>
            </Link>

            <Link href="/packages">
              <Button className="bg-jado-orange hover:bg-jado-orange/90">
                استكشف باقاتنا السياحية
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
