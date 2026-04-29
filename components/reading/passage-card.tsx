import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PassageCardProps = {
  title: string;
  body: string;
};

export function PassageCard({ title, body }: PassageCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/40 pb-5">
        <CardTitle className="text-[1.125rem] font-semibold leading-snug tracking-[-0.02em]">
          {title}
        </CardTitle>
        <CardDescription className="text-[11px] uppercase tracking-[0.18em]">
          Đoạn văn
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-7">
        <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-foreground/93">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}
