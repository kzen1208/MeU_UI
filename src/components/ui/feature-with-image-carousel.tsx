import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const platformSlides = [
  {
    label: "Landing Story",
    title: "Landing kể rõ giá trị của UI Hub",
    description:
      "Một trang mở đầu cho biết hub dùng để làm gì, dành cho ai và cách team bắt đầu sử dụng.",
    accent: "from-[#4264ff]",
    imageUrl:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2670&auto=format&fit=crop",
  },
  {
    label: "Component Store",
    title: "Component store có preview riêng",
    description:
      "Tài nguyên được tách theo category, có trạng thái, preview và hướng dẫn dùng rõ ràng.",
    accent: "from-[#7ea2ff]",
    imageUrl:
      "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2670&auto=format&fit=crop",
  },
  {
    label: "Training Docs",
    title: "Training docs cho member mới",
    description:
      "Quy chuẩn token, responsive, accessibility và ví dụ code được gom thành tài liệu dễ học.",
    accent: "from-[#9aaeff]",
    imageUrl:
      "https://images.unsplash.com/photo-1683803055067-1ca1c17cb2b9?q=80&w=2342&auto=format&fit=crop",
  },
  {
    label: "Package Path",
    title: "Đường dẫn lên package nội bộ",
    description:
      "Các component ổn định có thể được nâng cấp thành shared package cho nhiều sản phẩm.",
    accent: "from-[#5676ff]",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
  },
  {
    label: "Team Workflow",
    title: "Workflow thống nhất giữa design và dev",
    description:
      "Giảm thời gian hỏi lại, tránh lệch UI và giúp team ship giao diện nhất quán hơn.",
    accent: "from-[#263d9b]",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
  },
];

const platformStats = [
  { value: "05", label: "core flows" },
  { value: "84", label: "resources" },
  { value: "EN/VN", label: "language ready" },
];

function Feature() {
  return (
    <section className="w-full bg-[#f7f8ff] px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-[1720px] overflow-hidden rounded-[2rem] bg-[#172250] text-white shadow-[0_34px_90px_rgba(14,26,79,0.18)]">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:p-14 xl:p-16">
          <div className="flex min-h-[420px] flex-col justify-between">
            <div className="flex flex-col items-start">
              <Badge className="border border-white/12 bg-white/[0.08] text-[#aebcff] hover:bg-white/[0.08]">
                Platform Experience
              </Badge>
              <h2 className="mt-5 max-w-2xl text-[clamp(2.4rem,5vw,5.6rem)] font-bold leading-[0.94] tracking-normal text-white">
                Duyệt UI Hub như một workspace sản phẩm.
              </h2>
              <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-white/62 sm:text-lg">
                Mỗi khu vực có một vai trò rõ ràng: landing để kể câu chuyện,
                component store để tìm tài nguyên, training docs để học chuẩn và
                package path để mở rộng thành thư viện nội bộ.
              </p>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {platformStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                >
                  <div className="text-2xl font-black leading-none text-[#85a0ff]">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/46">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.055] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
            >
              <div className="mb-3 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/52">
                  meu-ui-hub.local
                </div>
              </div>
              <CarouselContent>
                {platformSlides.map((slide, index) => (
                  <CarouselItem key={slide.label}>
                    <article
                      className="relative flex aspect-[16/10] min-h-[360px] overflow-hidden rounded-[1.2rem] bg-cover bg-center p-6 sm:p-8"
                      style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-[#050936]/70" />
                      <div
                        className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${slide.accent} to-transparent opacity-80`}
                      />
                      <div className="relative z-10 flex w-full flex-col justify-between">
                        <div className="flex items-start justify-between gap-4">
                          <span className="rounded-full border border-white/14 bg-white/[0.12] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/78 backdrop-blur">
                            {slide.label}
                          </span>
                          <span className="font-mono text-3xl font-black text-white/80">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="max-w-xl">
                          <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                            {slide.title}
                          </h3>
                          <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/70 sm:text-base">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-7 right-7 z-20 flex gap-2">
                <CarouselPrevious className="static translate-y-0 border-white/14 bg-white/[0.12] text-white hover:bg-white/[0.18]" />
                <CarouselNext className="static translate-y-0 border-white bg-white text-[#172250] hover:bg-white/90" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Feature };
