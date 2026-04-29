import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { ProgressDashboard } from "@/components/progress/progress-dashboard";

export const metadata = {
  title: "Tiến độ",
};

export default function ProgressPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Progress tracking"
        title="Tiến độ — biết mình đang ở đâu"
        description="Điểm và lịch sử làm Reading gần đây; báo cáo theo chủ đề sẽ dày khi có thêm tagging bài sai và writing history sync đa thiết bị."
      />
      <ProgressDashboard />
    </ContentShell>
  );
}
