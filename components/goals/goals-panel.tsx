"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const KEY = "detflow-goal-det-v1";

function loadTarget(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? Math.min(160, Math.max(10, n)) : null;
}

export function GoalsPanel() {
  const [input, setInput] = useState("115");
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    const v = loadTarget();
    if (v !== null) {
      setSaved(v);
      setInput(String(v));
    }
  }, []);

  const percent = useMemo(() => {
    if (saved === null) return 0;
    return Math.min(100, Math.round((72 / saved) * 100));
  }, [saved]);

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Mục tiêu điểm DET (ví dụ Production)</CardTitle>
          <CardDescription>
            Gắn roadmap theo mục tiêu (110–160): đây chỉ là ô nhập + thanh minh hoạ; định nghĩa level & khuyến nghị bài tập theo từng cụm điểm sẽ nối vào sau.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <label htmlFor="det-target" className="text-sm font-medium">
                Điểm mục tiêu (ước lượng Production)
              </label>
              <Input
                id="det-target"
                inputMode="numeric"
                className="max-w-[120px]"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\D/g, "").slice(0, 3))}
              />
            </div>
            <Button
              type="button"
              onClick={() => {
                const v = Number.parseInt(input || "0", 10);
                const clamped = Math.min(160, Math.max(10, v));
                localStorage.setItem(KEY, String(clamped));
                setSaved(clamped);
              }}
            >
              Lưu trên máy này
            </Button>
          </div>

          {saved !== null ? (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Giả định điểm hiện tại ~72 (placeholder) so với mục tiêu {saved}:
                </p>
                <Progress value={percent} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Thanh minh họa — thật sẽ lấy từ bài thi mẫu / mock test.
                </p>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-dashed shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Roadmap theo level</CardTitle>
          <CardDescription>
            Bản đồ theo mức A1 → C1, gợi ý bài Đọc/Viết/Pronun theo thang DET — nội dung nội dung sẽ gắn với adaptive learning (làm tốt thì tăng độ khó).
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
