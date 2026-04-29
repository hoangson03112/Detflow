"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  clearMistakes,
  loadMistakes,
  type SavedMistake,
} from "@/lib/local/mistakes-progress";

const skillLabel: Record<SavedMistake["skill"], string> = {
  comprehension: "Đọc hiểu",
  vocab: "Từ vựng",
  inference: "Suy luận",
};

export function ReviewMistakesClient() {
  const [list, setList] = useState<SavedMistake[]>([]);

  useEffect(() => {
    setList(loadMistakes());
  }, []);

  const refresh = () => setList(loadMistakes());

  const vocabCount = useMemo(() => list.filter((m) => m.skill === "vocab").length, [list]);
  const compCount = useMemo(
    () => list.filter((m) => m.skill === "comprehension").length,
    [list]
  );
  const infCount = useMemo(
    () => list.filter((m) => m.skill === "inference").length,
    [list]
  );

  const handleClear = () => {
    clearMistakes();
    refresh();
  };

  return (
    <div className="space-y-8">
      <Card className="border-dashed shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Luồng ôn sai</CardTitle>
          <CardDescription>
            Sau khi làm Đọc hiểu, các câu sai được lưu tự động trên máy bạn để ôn đúng chỗ sai — bước
            không thể thiếu để không “học mãi không lên”.
            <Separator className="my-4" />
            <span className="font-medium text-foreground">
              Chuẩn bị SRS (ôn spaced repetition):{" "}
            </span>
            cùng một câu sẽ nhắc lại sau{" "}
            <strong className="text-foreground">1 / 3 / 7 ngày</strong> như Anki trong app — sắp tới.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="gap-4">
        <TabsList className="h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="all">Tất cả ({list.length})</TabsTrigger>
          <TabsTrigger value="comprehension">Đọc hiểu ({compCount})</TabsTrigger>
          <TabsTrigger value="vocab">Từ vựng ({vocabCount})</TabsTrigger>
          <TabsTrigger value="inference">Suy luận ({infCount})</TabsTrigger>
        </TabsList>

        {(["all", "comprehension", "vocab", "inference"] as const).map((skill) => (
          <TabsContent key={skill} value={skill} className="mt-0 flex flex-col gap-4 outline-none">
            <MistakeList
              items={
                skill === "all"
                  ? list
                  : list.filter((m) => m.skill === skill)
              }
              onRefresh={refresh}
              onClear={handleClear}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function MistakeList({
  items,
  onRefresh,
  onClear,
}: {
  items: SavedMistake[];
  onRefresh: () => void;
  onClear: () => void;
}) {
  if (items.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-muted-foreground">Chưa có câu sai</CardTitle>
          <CardDescription>
            Làm bài Đọc hiểu — khi sai, câu đó hiện ở đây để bạn ôn có kiểm soát (lặp lại chỗ sai).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" variant="outline" size="sm" onClick={() => onRefresh()}>
            Tải lại danh sách
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" size="sm" onClick={() => onRefresh()}>
          Làm mới
        </Button>
        <Button type="button" variant="destructive" size="sm" onClick={() => onClear()}>
          Xoá tất cả (máy bạn)
        </Button>
      </div>

      <ul className="space-y-4">
        {items.map((m) => (
          <li key={m.id}>
            <Card className="shadow-sm">
              <CardHeader className="space-y-2 border-b border-border/60 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{skillLabel[m.skill]}</Badge>
                  <span className="text-xs text-muted-foreground">{m.passageTitle}</span>
                </div>
                <CardTitle className="text-base font-normal leading-snug tracking-normal">
                  {m.prompt || "Câu hỏi"}
                </CardTitle>
                <CardDescription className="text-xs">
                  {new Date(m.recordedAt).toLocaleString("vi-VN")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-4 text-sm leading-relaxed">
                <div>
                  <span className="text-muted-foreground">Bạn đã chọn: </span>
                  <span className="text-destructive line-through">
                    {m.wrongIndex !== null ? m.choices[m.wrongIndex] : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Đáp án đúng: </span>
                  <span className="font-medium text-primary">
                    {m.choices[m.correctIndex]}
                  </span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
