import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";

const items = [
  {
    value: "adaptive",
    title: "5. Adaptive — học theo trình độ",
    pill: "Sau MVP",
    body:
      "Làm tốt thì passage dài / câu khó hơn; sai nhiều thì shorten task + gợi ý chủ điểm ôn.",
  },
  {
    value: "error",
    title: "6. Error-based learning — học từ lỗi",
    pill: "Một phần",
    body:
      "Highlight lỗi theo vocab / grammar / comprehension; tab Ôn sai và phân nhánh chủ đề đang là bước đầu; phần annotate lỗi chi tiết (AI/rules) là bước sau.",
  },
  {
    value: "srs",
    title: "7. Spaced repetition (SRS)",
    pill: "Sắp tới",
    body:
      "Câu sai lên queue 1 / 3 / 7 ngày trong app như Anki — lưu trữ cloud + due date UI.",
  },
  {
    value: "guided",
    title: "8. Guided writing",
    pill: "Sau MVP",
    body:
      "Không để học viết “viết mù”: outline cố định intro — body — conclusion + checklist trước khi AI duyệt.",
  },
  {
    value: "contextual",
    title: "9. Contextual learning",
    pill: "Sau MVP",
    body:
      "Click từ trong passage để nhận nghĩa + highlight keyword được gắn với chủ đề ôn.",
  },
  {
    value: "paraphrase",
    title: "10. Paraphrasing training",
    pill: "Giai đoạn beta",
    body:
      "Viết lại câu, so similarity với mẫu; phần mẫu minh họa đã có khung tại Active recall → Viết lại câu.",
  },
  {
    value: "timed",
    title: "11. Timed practice — áp lực giờ thi",
    pill: "Có prototype",
    body:
      "Countdown và auto-submit: màn /timed đã có countdown mock — gắn đề và tự chấp điểm sau khi hết giờ là bước kế tiếp.",
  },
  {
    value: "goals",
    title: "12. Goal-based learning — target score DET",
    pill: "Có prototype",
    body:
      "Đặt mục tiêu Production (ước lượng) và roadmap theo level: ô nhập và thanh tiến độ minh họa tại /goals (đồng bộ account sau).",
  },
];

export const metadata = {
  title: "Phương pháp",
};

export default function MethodsPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Product differentiation"
        title="Phương pháp nâng cao (sau MVP nhưng rất đáng làm)"
        description="Đây là lộ trình dài để Detflow khác app chỉ có đề nhàm — xem và ưu tiên theo bạn và feedback người dùng."
      />

      <Accordion className="w-full divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-[var(--shadow-surface-xs)]">
        {items.map((it) => (
          <AccordionItem key={it.value} value={it.value} className="border-0 px-5">
            <AccordionTrigger className="py-5 text-[15px] font-medium tracking-[-0.02em] hover:no-underline">
              <span className="flex flex-1 flex-wrap items-center gap-3 text-left">
                {it.title}
                <Badge variant="outline">{it.pill}</Badge>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[13px] leading-relaxed text-muted-foreground">
              {it.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-center text-xs text-muted-foreground">
        Cần học các màn đã dựng? Xem{" "}
        <Link href="/timed" className="text-primary/80 underline underline-offset-4 transition-colors duration-200 hover:text-primary">
          Luyện giờ
        </Link>
        {" · "}
        <Link href="/goals" className="text-primary/80 underline underline-offset-4 transition-colors duration-200 hover:text-primary">
          Mục tiêu
        </Link>
        .
      </p>
    </ContentShell>
  );
}
