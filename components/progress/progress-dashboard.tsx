"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { loadProgress, type ReadingAttempt } from "@/lib/local/mistakes-progress";

export function ProgressDashboard() {
  const [avgRecent, setAvgRecent] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<ReadingAttempt[]>([]);

  useEffect(() => {
    const prog = loadProgress().readingAttempts;
    setAttempts(prog);
    const r = prog.slice(0, 8);
    if (r.length === 0) {
      setAvgRecent(null);
      return;
    }
    const avg = Math.round(r.reduce((s, x) => s + x.scorePercent, 0) / r.length);
    setAvgRecent(avg);
  }, []);

  const topicStats = useMemo(
    () => [
      { label: "Đọc hiểu (tổng quan passage)", value: avgRecent ?? 0, dim: avgRecent === null },
      { label: "Từ vựng trong ngữ cảnh", value: 62, dim: true },
      { label: "Grammar / cấu trúc câu", value: 71, dim: true },
    ],
    [avgRecent]
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Điểm Đọc (8 lần gần nhất)</CardTitle>
            <CardDescription>
              {avgRecent !== null
                ? `Trung bình ${avgRecent}% — cập nhật mỗi lần làm bài.`
                : "Làm bài Đọc hiểu ít nhất một lần để thấy chỉ số trung bình."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">
              {avgRecent !== null ? `${avgRecent}%` : "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Viết — lịch sử</CardTitle>
            <CardDescription>
              Bản ghi lưu trên Supabase khi nhấn Nộp; bản tóm tắt sẽ liệt kê ở đây trong bản đồ đồng bộ đa thiết bị sau.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nguồn: bảng <code className="text-xs">writing_submissions</code>. UI lịch sử chi tiết — sắp tới.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Đúng / sai gần đúng theo “chủ đề ôn”</CardTitle>
          <CardDescription>
            Phiên MVP: chỉ ô “Đọc hiểu tổng quan” dùng điểm thật; các nhánh kỹ năng chỉ là giao diện minh họa cho báo cáo sau (
            vocab / grammar / comprehension).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {topicStats.map((t) => (
            <div key={t.label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className={t.dim ? "text-muted-foreground" : undefined}>{t.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {t.dim ? `${t.value}% (demo)` : `${t.value}%`}
                </span>
              </div>
              <Progress value={t.value} className={t.dim ? "opacity-70" : ""} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Nhật ký làm Reading (thiết bị này)</CardTitle>
          <CardDescription>Mỗi lần nộp bài Đọc hiểu thành công được ghi lại cục bộ.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {attempts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có phiên làm Reading.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {attempts.slice(0, 12).map((a) => (
                <li
                  key={`${a.at}-${a.passageId}`}
                  className="flex flex-wrap justify-between gap-2 rounded-lg border border-border/70 px-3 py-2"
                >
                  <span className="truncate text-muted-foreground">{a.passageTitle}</span>
                  <span className="tabular-nums font-medium">{a.scorePercent}%</span>
                  <span className="w-full text-xs text-muted-foreground">
                    {new Date(a.at).toLocaleString("vi-VN")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Separator className="opacity-50" />

      <p className="text-xs text-muted-foreground">
        Adaptive học theo điểm, học sai theo vocab/grammar, SRS nhắc ôn và luyện theo đồng hồ sẽ bổ sung khi vào các màn
        tương ứng.
      </p>
    </div>
  );
}
