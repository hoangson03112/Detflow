import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { ActiveRecallTabs } from "@/components/recall/active-recall-tabs";

export const metadata = {
  title: "Gợi nhớ chủ động",
};

export default function ActiveRecallPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Active recall"
        title="Tự nhớ lại — không chỉ đọc lại"
        description="Điền chỗ trống và viết lại câu: hai dạng tối giản trong MVP; sau có thể gắn với chỗ ôn trong «Ôn sai»."
      />
      <ActiveRecallTabs />
    </ContentShell>
  );
}
