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
  {
    id: 2,
    slug: "riyadh-modern-attractions",
    title: "الرياض الحديثة: معالم لا تفوت",
    excerpt: "دليلك الشامل لاستكشاف أحدث المعالم والمرافق الترفيهية في العاصمة الرياض",
    content: `
      <h2>الرياض: مدينة الحداثة والتطور</h2>
      <p>تشهد العاصمة الرياض تحولاً عمرانياً وثقافياً هائلاً، حيث تجمع بين القدم والحداثة في مزيج فريد. من ناطحات السحاب الشاهقة إلى المراكز الترفيهية العالمية، تقدم الرياض تجربة سياحية لا تُنسى.</p>
      
      <h3>برج المملكة: أيقونة الرياض</h3>
      <p>يُعد برج المملكة من أشهر معالم الرياض، حيث يرتفع 302 متراً ويوفر إطلالة بانورامية رائعة على المدينة من جسر المشاهدة في الطابق 99. يضم البرج مركز تسوق فاخر ومطاعم عالمية.</p>
      
      <h3>بوليفارد الرياض: وجهة ترفيهية متكاملة</h3>
      <p>بوليفارد الرياض هو أكبر وجهة ترفيهية في المنطقة، يجمع بين المطاعم العالمية، دور السينما، المسارح، والفعاليات الموسمية. يمتد على مساحة شاسعة ويوفر تجربة ترفيهية متنوعة للعائلات والشباب.</p>
      
      <h3>مركز الملك عبدالله المالي: عجائب معمارية</h3>
      <p>يضم المركز مجموعة من ناطحات السحاب المذهلة بتصاميم معمارية فريدة، ويُعتبر من أهم المراكز المالية في المنطقة. التصاميم الحديثة والمساحات الخضراء تجعله وجهة مثالية للتصوير والتنزه.</p>
      
      <h3>نصائح للزيارة</h3>
      <ul>
        <li>استخدم تطبيقات النقل مثل أوبر وكريم للتنقل بسهولة</li>
        <li>قم بزيارة المعالم في المساء لتجنب حرارة النهار</li>
        <li>احجز تذاكر الفعاليات مسبقاً عبر الإنترنت</li>
        <li>استكشف المطاعم المحلية لتجربة الأطباق السعودية الأصيلة</li>
      </ul>
    `,
    image: "/riyadh-modern-skyline-with-kingdom-tower-at-night.jpg",
    author: "سارة أحمد",
    date: "2024-01-12",
    category: "مدن سعودية",
    tags: ["الرياض", "معالم", "حداثة", "ترفيه"],
    readTime: "7 دقائق",
  },
  {
    id: 3,
    slug: "jeddah-historical-balad",
    title: "جدة التاريخية: رحلة في البلد",
    excerpt: "استكشف عبق التاريخ في البلد التاريخية بجدة وتعرف على قصص الماضي العريق",
    content: `
      <h2>جدة التاريخية: عروس البحر الأحمر</h2>
      <p>البلد التاريخية في جدة هي قلب المدينة النابض، حيث تروي الأزقة الضيقة والبيوت التراثية قصصاً عن ماضٍ عريق امتد لقرون. تم إدراج البلد في قائمة التراث العالمي لليونسكو في 2014.</p>
      
      <h3>البيوت التراثية: معمار فريد</h3>
      <p>تتميز بيوت جدة التاريخية بالرواشين الخشبية الجميلة والمعمار الحجازي التقليدي. بيت نصيف وبيت باعشن من أشهر هذه البيوت التي تحولت إلى متاحف تحكي قصة المدينة.</p>
      
      <h3>الأسواق القديمة: تجربة تسوق أصيلة</h3>
      <p>سوق الندى وسوق البدو والعلوي من أعرق الأسواق في جدة، حيث يمكنك شراء البهارات والعطور والحرف اليدوية التقليدية. الأسواق تعكس التنوع الثقافي الذي ميز جدة عبر التاريخ.</p>
      
      <h3>المساجد التاريخية: روحانية وجمال</h3>
      <p>يضم البلد العديد من المساجد التاريخية مثل مسجد الشافعي ومسجد عكاش، التي تتميز بمآذنها الفريدة والزخارف التقليدية.</p>
      
      <h3>نصائح للزيارة</h3>
      <ul>
        <li>أفضل وقت للزيارة: المساء بعد غروب الشمس</li>
        <li>استأجر مرشداً محلياً للتعرف على قصص البيوت والأزقة</li>
        <li>جرب الأكلات الشعبية في المطاعم التراثية</li>
        <li>ارتدِ أحذية مريحة للمشي في الأزقة الضيقة</li>
      </ul>
    `,
    image: "/jeddah-al-balad-historic-district-with-traditional.jpg",
    author: "محمد الغامدي",
    date: "2024-01-10",
    category: "تراث وثقافة",
    tags: ["جدة", "تاريخ", "تراث", "معمار"],
    readTime: "6 دقائق",
  },
  {
    id: 4,
    slug: "abha-mountains-adventure",
    title: "مغامرة في جبال عسير",
    excerpt: "دليل شامل لأفضل مسارات التسلق والمشي في جبال عسير الخلابة",
    content: `
      <h2>عسير: جنة المملكة الخضراء</h2>
      <p>منطقة عسير تقدم تجربة سياحية فريدة بطبيعتها الجبلية الخلابة، حيث تكسو الخضرة قمم الجبال وتنتشر القرى التراثية في أحضان الطبيعة.</p>
      
      <h3>جبل السودة: أعلى قمة في المملكة</h3>
      <p>يرتفع جبل السودة 3015 متراً فوق سطح البحر، ويوفر إطلالات بانورامية خلابة. يمكنك ركوب التلفريك للاستمتاع بمناظر الجبال والوديان من الأعلى.</p>
      
      <h3>قرية رجال ألمع: تراث حي</h3>
      <p>قرية تراثية ساحرة بمعمارها الحجري الفريد، تضم متحفاً للتراث وتعرض الحرف اليدوية التقليدية. القرية محاطة بمدرجات زراعية خضراء رائعة الجمال.</p>
      
      <h3>مسارات المشي والتسلق</h3>
      <p>توفر عسير العديد من مسارات المشي الجبلية المناسبة لجميع المستويات. من المسارات السهلة حول البحيرات إلى التسلق الجبلي للمحترفين.</p>
      
      <h3>نصائح للزيارة</h3>
      <ul>
        <li>أفضل وقت للزيارة: الصيف للطقس المعتدل</li>
        <li>أحضر ملابس دافئة حتى في الصيف</li>
        <li>احجز الفنادق والشاليهات مسبقاً في موسم الذروة</li>
        <li>جرب العسل المحلي والمنتجات الزراعية</li>
      </ul>
    `,
    image: "/abha-green-mountains-terraces-traditional-village-.jpg",
    author: "فاطمة القحطاني",
    date: "2024-01-08",
    category: "مغامرات",
    tags: ["عسير", "جبال", "طبيعة", "مغامرة"],
    readTime: "8 دقائق",
  },
  {
    id: 5,
    slug: "taif-rose-season",
    title: "موسم الورد في الطائف",
    excerpt: "تجربة فريدة في مزارع الورد وتعرف على صناعة العطور التقليدية",
    content: `
      <h2>الطائف: عروس المصايف</h2>
      <p>تشتهر الطائف بمناخها المعتدل ومزارعها الخضراء، وخاصة مزارع الورد الطائفي الذي يُعتبر من أجود أنواع الورد في العالم.</p>
      
      <h3>موسم الورد: تجربة لا تُنسى</h3>
      <p>خلال شهري مارس وأبريل، تزدهر مزارع الورد وتعبق الأجواء بالروائح العطرة. يمكنك المشاركة في قطف الورد والتعرف على صناعة العطور التقليدية.</p>
      
      <h3>مصانع العطور التقليدية</h3>
      <p>زر المصانع التقليدية لاستخراج دهن الورد بالطرق القديمة، واشتر العطور الأصلية مباشرة من المصدر.</p>
      
      <h3>المعالم السياحية</h3>
      <p>تضم الطائف العديد من المعالم مثل قصر شبرا التاريخي، سوق عكاظ، وتلفريك الهدا الذي يوفر إطلالات خلابة على المدينة.</p>
      
      <h3>نصائح للزيارة</h3>
      <ul>
        <li>قم بزيارة الطائف في موسم الورد لتجربة فريدة</li>
        <li>احجز جولة في مزارع الورد مسبقاً</li>
        <li>اشترِ العطور من المصانع المعتمدة</li>
        <li>جرب الفواكه المحلية الطازجة</li>
      </ul>
    `,
    image: "/taif-rose-gardens-mountains-saudi-arabia.jpg",
    author: "نورا الدوسري",
    date: "2024-01-05",
    category: "طبيعة",
    tags: ["الطائف", "ورد", "عطور", "طبيعة"],
    readTime: "5 دقائق",
  },
  {
    id: 6,
    slug: "eastern-province-coast",
    title: "سواحل المنطقة الشرقية",
    excerpt: "اكتشف جمال الشواطئ والكورنيش في الدمام والخبر",
    content: `
      <h2>المنطقة الشرقية: لؤلؤة الخليج</h2>
      <p>تمتد سواحل المنطقة الشرقية على الخليج العربي، وتوفر شواطئ رملية جميلة وكورنيش حديث ومرافق ترفيهية متنوعة.</p>
      
      <h3>كورنيش الدمام: متعة العائلات</h3>
      <p>يمتد كورنيش الدمام لأكثر من 4 كيلومترات، ويضم مناطق ألعاب للأطفال، مطاعم ومقاهي، ومناطق للجلوس والاسترخاء.</p>
      
      <h3>نصف القمر: شاطئ الهدوء</h3>
      <p>يُعتبر شاطئ نصف القمر من أجمل الشواطئ في المنطقة، حيث يوفر مياه نقية وأنشطة مائية متنوعة مثل الغوص والتجديف.</p>
      
      <h3>جزيرة المرجان: وجهة عصرية</h3>
      <p>جزيرة صناعية حديثة في الخبر، تضم مطاعم فاخرة، مقاهي عصرية، وإطلالات رائعة على البحر.</p>
      
      <h3>نصائح للزيارة</h3>
      <ul>
        <li>أفضل وقت للزيارة: الشتاء والربيع</li>
        <li>احضر واقي شمس في فصل الصيف</li>
        <li>جرب المأكولات البحرية الطازجة</li>
        <li>استمتع بالتنزه في المساء</li>
      </ul>
    `,
    image: "/dammam-corniche-modern-cityscape-saudi-arabia.jpg",
    author: "أحمد السلمي",
    date: "2024-01-03",
    category: "سواحل",
    tags: ["الدمام", "الخبر", "شواطئ", "كورنيش"],
    readTime: "6 دقائق",
  },
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
