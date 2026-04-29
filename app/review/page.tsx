import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { ReviewMistakesClient } from "@/components/review/review-mistakes-client";

export const metadata = {
  title: "Ôn câu sai",
};

export default function ReviewPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Lặp lại có kiểm soát"
        title="Ôn các câu đã sai"
        description="Xem lại chính chỗ bạn trượt — phân loại theo kỹ năng. Trên thiết bị này, dữ liệu lưu cục bộ; đồng bộ nhiều máy sẽ tới sau để đúng lúc vẫn giữ được chỗ bạn yếu nhất."
      />
      <ReviewMistakesClient />
    </ContentShell>
  );
}
