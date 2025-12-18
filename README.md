# Phu Ninja AI Portfolio

Dự án Portfolio cá nhân chuyên nghiệp được xây dựng với các công nghệ web hiện đại nhất, tích hợp AI và các tính năng tương tác cao. Website giới thiệu về hành trình, kỹ năng, dự án và chương trình "Ninja AI" độc đáo.

![Project Preview](https://placehold.co/1200x600/png?text=Project+Preview)

## 🚀 Tính năng nổi bật

- **Giao diện hiện đại**: Thiết kế Responsive, Dark mode, hiệu ứng mượt mà với Framer Motion.
- **Hệ thống nội dung**:
  - **Giới thiệu**: Hồ sơ năng lực chi tiết (Kỹ năng, Học vấn, Dự án cá nhân).
  - **Chương trình Ninja AI**: Thông tin chi tiết về chương trình đào tạo/sản phẩm AI.
  - **Tin tức & Sự kiện**: Cập nhật thông tin mới nhất.
- **Tương tác**: Form liên hệ tích hợp, tối ưu trải nghiệm người dùng.
- **Hiệu năng cao**: Tối ưu hóa SEO và tốc độ tải trang nhờ Vite và React.

## 🛠 Công nghệ sử dụng

Dự án được xây dựng dựa trên nền tảng vững chắc của các công nghệ hàng đầu:

- **Core**: [React](https://react.dev/) (v18), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework & Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [Shadcn UI](https://ui.shadcn.com/) - Bộ component UI chất lượng cao.
  - [Radix UI](https://www.radix-ui.com/) - Headless UI primitives.
- **State Management & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query).
- **Backend / Database**: [Supabase](https://supabase.com/).
- **Animation**: [Framer Motion](https://www.framer.com/motion/), [Lottie React](https://lottiefiles.com/).
- **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) (Validation).
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/).

## 📦 Hướng dẫn cài đặt

Để chạy dự án ở môi trường local, bạn cần cài đặt [Node.js](https://nodejs.org/) (khuyên dùng phiên bản LTS).

1. **Clone repository**:

   ```bash
   git clone <YOUR_GIT_URL>
   cd phu-ninja-ai-portfolio
   ```

2. **Cài đặt dependencies**:

   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường**:
   Tạo file `.env` ở thư mục gốc (nếu cần) và cấu hình các key kết nối Supabase hoặc API khác.

4. **Khởi chạy ứng dụng**:
   ```bash
   npm run dev
   ```
   Truy cập `http://localhost:8080` để xem kết quả.

## 📂 Cấu trúc dự án

```
src/
├── components/     # Các component tái sử dụng (UI, Layout, v.v.)
│   ├── ui/         # Shadcn UI components
│   └── layout/     # Layout chính của trang
├── pages/          # Các trang chính (Index, About, Contact, v.v.)
├── hooks/          # Custom Hooks
├── lib/            # Tiện ích bổ trợ (Utils)
├── integrations/   # Tích hợp dịch vụ bên thứ 3 (Supabase)
└── App.tsx         # Routing và cấu hình chính
```

## 🤝 Đóng góp

Mọi sự đóng góp đều được hoan nghênh! Nếu bạn muốn cải thiện dự án:

1. Fork dự án.
2. Tạo nhánh tính năng mới (`git checkout -b feature/AmazingFeature`).
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`).
4. Push lên nhánh (`git push origin feature/AmazingFeature`).
5. Tạo Pull Request.

## 📝 License

Dự án này được phát hành dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

Được phát triển với ❤️ tại Việt Nam.
