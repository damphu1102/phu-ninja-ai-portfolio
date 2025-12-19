import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const Contact = () => {
  const { toast } = useToast();

  // Application form state (moved from NinjaAI)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvFile: null as File | null,
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError("");
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setFileError("File vượt quá 10MB");
        if (e.target) e.target.value = "";
        setFormData((prev) => ({ ...prev, cvFile: null }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, cvFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulation of submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({ title: 'Gửi thành công', description: 'Chúng tôi đã nhận được đơn ứng tuyển của bạn.' });
      setFormData({ fullName: '', email: '', phone: '', cvFile: null, motivation: '' });
      setFileError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error('Submit error:', err);
      toast({ title: 'Lỗi gửi', description: err.message || 'Có lỗi xảy ra khi gửi đơn.' , variant: 'destructive'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 relative bg-[url('https://res.cloudinary.com/dcoviwlpx/image/upload/v1755529390/pngtree-technology-futuristic-light-dot-hexagon-stereo-luxury-green-abstract-background-picture-image_1451871_kpm6hq.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header (shared NinjaAI background) */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden mb-12">

          <div className="relative z-10 text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Đăng ký & Liên hệ với tôi
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Tôi luôn sẵn sàng lắng nghe và trao đổi về các dự án, cơ hội hợp tác 
              hoặc đơn giản là chia sẻ về công nghệ. Hãy liên hệ với tôi!
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-card border-none card-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">damphu207@gmail.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-none card-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center text-white">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Điện thoại</h3>
                  <p className="text-muted-foreground">+84 123 456 789</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-none card-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center text-secondary-dark">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Địa chỉ văn phòng</h3>
                  <p className="text-muted-foreground">Toà nhà BMC Số 5 Mạc Thị Bưởi, Vĩnh Tuy, Hai Bà Trưng, Hà Nội, Việt Nam</p>
                </div>
              </div>
            </Card>

            {/* <Card className="p-6 bg-gradient-hero border-none">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Đặt lịch hẹn</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Muốn trao đổi trực tiếp? Hãy đặt lịch meeting với tôi.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Chọn thời gian phù hợp
                </Button>
              </div>
            </Card> */}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-card border-none shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Đăng ký tham gia</h2>
              </div>

              <form id="application-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Họ và tên *</label>
                    <Input name="fullName" value={(formData as any).fullName} onChange={handleInputChange} placeholder="Nguyễn Văn A" required className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input name="email" type="email" value={(formData as any).email} onChange={handleInputChange} placeholder="your.email@example.com" required className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại *</label>
                    <Input name="phone" value={(formData as any).phone} onChange={handleInputChange} placeholder="0123456789" required className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CV / Portfolio</label>
                    <div className="relative">
                      <Input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full file:mr-1 file:py-0.5 file:px-1 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer" />
                      <div className="mt-1 text-xs text-muted-foreground">Chấp nhận file PDF, DOC, DOCX (tối đa 10MB)</div>
                      {fileError && <div className="mt-1 text-xs text-red-500 font-medium">{fileError}</div>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Cảm nhận về chương trình TTS Ninja AI *</label>
                  <Textarea name="motivation" value={(formData as any).motivation} onChange={handleInputChange} placeholder="Chia sẻ về mong muốn tham gia chương trình và mục tiêu nghề nghiệp của bạn..." rows={5} required className="w-full resize-none" />
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" disabled={isSubmitting || !!fileError} aria-busy={isSubmitting} className="bg-gradient-primary text-white hover:bg-primary-dark btn-scale btn-ripple shadow-green px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Đang gửi...' : 'Gửi CV & Đơn ứng tuyển'}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                  {fileError && <div className="mt-2 text-sm text-red-500">Vui lòng chọn file có kích thước nhỏ hơn 10MB để tiếp tục</div>}
                </div>
              </form>

              <div className="mt-8 p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Thời gian phản hồi</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Email thông thường: 24-48 giờ</li>
                  <li>• Dự án khẩn cấp: Trong vòng 12 giờ</li>
                  <li>• Cuối tuần: Phản hồi vào thứ 2</li>
                </ul>
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8 p-8 bg-gradient-card border-none">
              <h3 className="text-xl font-bold text-foreground mb-6">Câu hỏi thường gặp</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Bạn có nhận làm dự án freelance không?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Có, tôi nhận các dự án phù hợp với lịch trình. Hãy chia sẻ chi tiết dự án để tôi có thể tư vấn tốt nhất.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Làm thế nào để tham gia chương trình Ninja AI?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Bạn có thể đăng ký tại trang Ninja AI hoặc liên hệ trực tiếp với tôi để được tư vấn chi tiết.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Bạn có nhận mentor cá nhân không?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Tùy vào thời gian và mức độ phù hợp. Hãy liên hệ để thảo luận về nhu cầu học tập của bạn.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;