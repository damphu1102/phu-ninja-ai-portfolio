import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Code,
  Palette,
  TrendingUp,
  Bot,
  Video,
  ArrowRight,
  Star,
  Users,
  Award,
  Mail,
  MapPin,
  Heart,
  Phone,
  PhoneCall,
  Target,
  BookOpen,
  CheckCircle,
} from "lucide-react";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const strengthsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, strengthsRef, contactRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const strengths = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Full-Stack Development",
      description:
        "Thành thạo React, Node.js, Python,Java với khả năng xây dựng ứng dụng web hiện đại từ frontend đến backend.",
    },
    {
      icon: <Palette className="w-8 h-8 text-secondary-dark" />,
      title: "UI/UX Design",
      description:
        "Kết hợp nghệ thuật và khoa học để tạo ra những trải nghiệm người dùng đáng nhớ.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Digital Marketing",
      description:
        "Hiểu sâu về marketing số và tối ưu hóa trải nghiệm khách hàng trực tuyến.",
    },
    {
      icon: <Bot className="w-8 h-8 text-success" />,
      title: "AI Chatbot",
      description:
        "Phát triển và triển khai các giải pháp AI thông minh cho doanh nghiệp.",
    },
    {
      icon: <Video className="w-8 h-8 text-warning" />,
      title: "Content Creator",
      description:
        "Tạo nội dung chất lượng cao về công nghệ và lập trình cho cộng đồng.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 parallax-bg opacity-900"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dcoviwlpx/image/upload/v1755529390/pngtree-technology-futuristic-light-dot-hexagon-stereo-luxury-green-abstract-background-picture-image_1451871_kpm6hq.png)`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-left">
            <h1 className="mb-6 leading-tight">
              <span className="block text-center text-xl md:text-4xl lg:text-5xl font-bold text-white -mt-2 lg:-mt-4">
                Đàm Hữu Phú
              </span>

              <br></br>
              <span className="block text-center text-base md:text-2xl lg:text-3xl font-semibold text-gray-100">
                From Ninja Ai
              </span>
              <br></br>
              <span className="block text-center text-base md:text-lg lg:text-xl font-medium text-white">
                “Tương lai của AI không phải là thay thế con người, mà là tăng
                cường khả năng của con người.”
              </span>
              <span className="block mt-8 text-sm md:text-base lg:text-lg font-medium text-gray-100">
                Lập Trình Viên FrontEnd, BackEnd, Machine Learning và Ứng dụng
                AI-First với các công nghệ sử dụng: HTML5, CSS3, TailwindCSS,
                ReactJS, VueJS, NodeJS, ExpressJS, MongoDB, MySQL, Python.
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chuong-trinh/ninja-ai">
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 
               text-white font-semibold hover:from-green-600 hover:to-green-700 
               shadow-lg shadow-green-300/50 
               hover:shadow-xl hover:shadow-green-400/60 
               transition-all duration-300 ease-in-out 
               px-8 py-4 text-lg rounded-2xl overflow-hidden animate-breathe"
                  onClick={() =>
                    document
                      .getElementById("application-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="relative z-10 flex items-center">
                    Tìm hiểu chương trình TTS Ninja AI
                    <ArrowRight className="w-5 h-5 ml-2" />
                    <Zap className="w-5 h-5 ml-2 animate-pulse" />
                  </span>

                  {/* Hiệu ứng ánh sáng quét qua nút */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                     translate-x-[-100%] hover:translate-x-[100%] 
                     transition-transform duration-700 ease-in-out rounded-2xl"
                  />
                </Button>
              </Link>

              <Link to="/gioi-thieu/du-an">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white btn-scale px-8 py-4 text-lg"
                >
                  Xem dự án tiêu biểu
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-white">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="font-semibold">5+ năm kinh nghiệm</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold">100+ dự án thành công</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary-dark" />
                <span className="font-semibold">Mentor chuyên nghiệp</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-float ">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
                <img
                  src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1755523880/z6920425784374_e7b19a83e93b709eaff8b968e40fe219_rwq8lv.jpg"
                  alt="Đàm Hữu Phú - Professional Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section ref={strengthsRef} className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thế mạnh nổi bật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những lĩnh vực tôi đam mê và có thể mang lại giá trị cho dự án của
              bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {strengths.map((strength, index) => (
              <Card
                key={index}
                className="p-6 text-center card-hover-green bg-gradient-card border-none hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                    {strength.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {strength.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {strength.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-2">
              <Heart className="w-8 h-8 text-yellow-500 mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Đối tác tin tưởng
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những lãnh đạo công nghệ hàng đầu tin tưởng và đồng hành cùng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Card 1 */}
            <Card className="p-6 flex flex-col gap-3 items-start card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/cto-nguyen-huu-kien.png"
                    alt="Nguyễn Hữu Kiên"
                    className="w-20 h-20 rounded-full object-cover border-2"
                  />
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22C55E" />
                      <path
                        d="M4 8.5L7 11.5L12 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    Nguyễn Hữu Kiên
                  </div>
                  <div className="text-primary text-sm">CTO</div>
                  <div className="text-muted-foreground text-xs">
                    Rocket Global
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground font-semibold">
                  (5/5)
                </span>
              </div>
              <div className="text-yellow-700 text-sm mt-2 font-medium">
                "AI không chỉ là công nghệ, mà còn là động lực thúc đẩy sự sáng tạo và đổi mới không ngừng. 
                Ứng dụng AI giúp doanh nghiệp tối ưu hóa quy trình, nâng cao hiệu quả và tạo ra giá trị vượt trội. 
                Cùng AI, chúng ta mở ra những cơ hội mới, kiến tạo tương lai thông minh hơn cho cộng đồng."
              </div>
            </Card>
            {/* Card 2 */}
            <Card className="p-6 flex flex-col gap-3 items-start card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/ha-tuan-anh-locaith.jpg"
                    alt="Hà Tuấn Anh"
                    className="w-20 h-20 rounded-full object-cover border-2"
                  />
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22C55E" />
                      <path
                        d="M4 8.5L7 11.5L12 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    Hà Tuấn Anh
                  </div>
                  <div className="text-primary text-sm">CEO & Founder</div>
                  <div className="text-muted-foreground text-xs">
                    Locaith Solution Tech
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground font-semibold">
                  (5/5)
                </span>
              </div>
              <div className="text-yellow-700 text-sm mt-2 font-medium">
                "Kết nối tri thức toàn cầu, lan tỏa giá trị AI đến từng doanh nghiệp Việt Nam. 
                AI là cầu nối giữa con người và công nghệ, giúp mọi tổ chức phát triển bền vững và đột phá. 
                Hãy để AI đồng hành cùng bạn trên hành trình chuyển đổi số và vươn tới thành công."
              </div>
            </Card>
            {/* Card 3 */}
            <Card className="p-6 flex flex-col gap-3 items-start card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/le-thanh-chinh-leader.png"
                    alt="Lê Thành Chỉnh"
                    className="w-20 h-20 rounded-full object-cover border-2"
                  />
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22C55E" />
                      <path
                        d="M4 8.5L7 11.5L12 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    Lê Thành Chỉnh
                  </div>
                  <div className="text-primary text-sm">Technical Leader</div>
                  <div className="text-muted-foreground text-xs">Freelance</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground font-semibold">
                  (5/5)
                </span>
              </div>
              <div className="text-yellow-700 text-sm mt-2 font-medium">
                "AI là chìa khóa mở ra cánh cửa sáng tạo, giúp con người vượt qua mọi giới hạn truyền thống. 
                Sự kết hợp giữa trí tuệ nhân tạo và tư duy con người tạo nên những giải pháp đột phá cho tương lai. 
                Đầu tư vào AI là đầu tư cho sự phát triển lâu dài và bền vững."
              </div>
            </Card>
            {/* Card 4 */}
            <Card className="p-6 flex flex-col gap-3 items-start card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/ly-hoang-hai-ceo-bmc.jpg"
                    alt="Lý Hoàng Hải"
                    className="w-20 h-20 rounded-full object-cover border-2"
                  />
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22C55E" />
                      <path
                        d="M4 8.5L7 11.5L12 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    Lý Hoàng Hải
                  </div>
                  <div className="text-primary text-sm">CEO</div>
                  <div className="text-muted-foreground text-xs">BMC</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground font-semibold">
                  (5/5)
                </span>
              </div>
              <div className="text-yellow-700 text-sm mt-2 font-medium">
                "Ứng dụng AI giúp doanh nghiệp nâng cao năng lực cạnh tranh, tối ưu hóa nguồn lực và tăng trưởng mạnh mẽ. 
                AI mang lại sự chính xác, tốc độ và hiệu quả vượt trội trong mọi lĩnh vực hoạt động. 
                Đón đầu xu hướng AI để dẫn dắt thị trường và tạo dấu ấn riêng cho doanh nghiệp."
              </div>
            </Card>
            {/* Card 5 */}
            <Card className="p-6 flex flex-col gap-3 items-start card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://ftygorppzfiwxmoimzod.supabase.co/storage/v1/object/public/covers/nguyen-hoang-kien-leader.png"
                    alt="Nguyễn Hoàng Kiên"
                    className="w-20 h-20 rounded-full object-cover border-2"
                  />
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22C55E" />
                      <path
                        d="M4 8.5L7 11.5L12 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    Nguyễn Hoàng Kiên
                  </div>
                  <div className="text-primary text-sm">Leader & Mentor</div>
                  <div className="text-muted-foreground text-xs">Freelance</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground font-semibold">
                  (5/5)
                </span>
              </div>
              <div className="text-yellow-700 text-sm mt-2 font-medium">
                "AI thúc đẩy tư duy đổi mới, mở rộng giới hạn công nghệ Việt Nam, tạo ra những giá trị khác biệt. 
                Sự phát triển của AI là động lực cho các doanh nghiệp vươn lên mạnh mẽ trên thị trường quốc tế. 
                Hãy cùng AI kiến tạo những giải pháp thông minh, nâng tầm vị thế Việt Nam."
              </div>
            </Card>
            {/* Card 6 */}
            <Card className="p-6 flex flex-col gap-3 items-start card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="	https://huans-ai-stage.vercel.app/avt.png"
                    alt="Nguyễn Văn Huân"
                    className="w-20 h-20 rounded-full object-cover border-2"
                  />
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22C55E" />
                      <path
                        d="M4 8.5L7 11.5L12 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    Nguyễn Văn Huân
                  </div>
                  <div className="text-primary text-sm">HR</div>
                  <div className="text-muted-foreground text-xs">
                    Rocket Global
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground font-semibold">
                  (5/5)
                </span>
              </div>
              <div className="text-yellow-700 text-sm mt-2 font-medium">
                "AI là người bạn đồng hành tin cậy, hỗ trợ đắc lực cho sự phát triển của mỗi cá nhân và tổ chức. 
                Sự kết hợp giữa AI và con người tạo nên môi trường làm việc hiệu quả, sáng tạo và đầy cảm hứng. 
                Cùng AI, chúng ta xây dựng tương lai số hóa, nâng cao chất lượng cuộc sống và công việc."
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-8">
            <div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-muted-foreground mt-2 text-sm">
                Đối tác tin tưởng
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-muted-foreground mt-2 text-sm">
                Dự án thành công
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground mt-2 text-sm">
                Tỷ lệ hài lòng
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                5
                <Star className="inline w-5 h-5 text-yellow-400 ml-1 fill-yellow-400" />
              </div>
              <div className="text-muted-foreground mt-2 text-sm">
                Đánh giá trung bình
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Style Section */}
      <section ref={contactRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Phong cách <span className="text-primary">làm việc</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những nguyên tắc và giá trị mà tôi theo đuổi trong mỗi dự án và collaboration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="flex items-center gap-4 p-6 card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl">
                {/* Icon: Target */}
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-lg text-foreground mb-1">Định hướng mục tiêu</div>
                <div className="text-muted-foreground text-base">
                  Luôn tập trung vào kết quả cuối cùng và giá trị mang lại cho người dùng.
                </div>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-6 card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl">
                {/* Icon: Users */}
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-lg text-foreground mb-1">Làm việc nhóm hiệu quả</div>
                <div className="text-muted-foreground text-base">
                  Tin tưởng vào sức mạnh của collaboration và knowledge sharing.
                </div>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-6 card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl">
                {/* Icon: BookOpen */}
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-lg text-foreground mb-1">Đam mê học hỏi</div>
                <div className="text-muted-foreground text-base">
                  Không ngừng cập nhật công nghệ mới và chia sẻ kiến thức với cộng đồng.
                </div>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-6 card-hover-green bg-gradient-card shadow-md border hover:scale-105 transition-all duration-300 rounded-xl">
              <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl">
                {/* Icon: Code */}
                <Code className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-lg text-foreground mb-1">Chất lượng code cao</div>
                <div className="text-muted-foreground text-base">
                  Luôn tuân thủ các tiêu chuẩn và best practices trong lập trình.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
