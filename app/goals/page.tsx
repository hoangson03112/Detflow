import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { GoalsPanel } from "@/components/goals/goals-panel";

export const metadata = {
  title: "Mục tiêu",
};

export default function GoalsPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Goal-based learning"
        title="Học theo mục tiêu DET"
        description="Đặt một điểm Production mục tiêu. Roadmap theo cụm điểm và độ khó ôn được nối dần — chỉ báo, không chỉ một slogan."
      />
      <GoalsPanel />
    </ContentShell>
  );
}
