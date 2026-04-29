import Link from "next/link";

import { ContentShell } from "@/components/layout/content-shell";
import { PageIntro } from "@/components/layout/page-intro";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Speaking",
};

export default function SpeechPlaceholderPage() {
  return (
    <ContentShell>
      <PageIntro
        eyebrow="Speaking"
        title="Phần Speaking (chưa dựng kỹ)"
        description="Sẽ bao gồm đọc to, chỉnh phát âm, mock interview DET — đây là chỗ giữ roadmap trước khi làm sâu."
      />
      <Link href="/practice" className={buttonVariants({ variant: "outline" })}>
        Quay về luyện tập
      </Link>
    </ContentShell>
  );
}
