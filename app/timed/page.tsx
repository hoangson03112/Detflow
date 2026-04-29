import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { TimedPracticeMock } from "@/components/timed/timed-practice-mock";

export const metadata = {
  title: "Luyện giờ",
};

export default function TimedPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Timed pressure"
        title="Áp lực giống giờ thi"
        description="Đồng hồ chỉ báo không phải trang ngắt — chừa chỗ một lần ôn không mơ hồ: khi countdown gắn đề và tự submit, không còn cảnh viết không kịp chỉnh."
      />
      <TimedPracticeMock />
    </ContentShell>
  );
}
