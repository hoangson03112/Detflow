"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const FILL_SENTENCE =
  "Many cities are investing in parks and _____ streets for public health.";
const ACCEPT = ["tree-lined", "treelined", "tree lined"];

export function ActiveRecallTabs() {
  return (
    <Tabs defaultValue="blank" className="gap-6">
      <TabsList className="h-auto w-full flex-wrap justify-start">
        <TabsTrigger value="blank">Điền chỗ trống</TabsTrigger>
        <TabsTrigger value="rewrite">Viết lại câu</TabsTrigger>
      </TabsList>
      <TabsContent value="blank" className="flex flex-col outline-none">
        <FillBlankPanel />
      </TabsContent>
      <TabsContent value="rewrite" className="flex flex-col outline-none">
        <RewritePanel />
      </TabsContent>
    </Tabs>
  );
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[-–—]/g, "-");
}

function FillBlankPanel() {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const norm = normalize(value);
  const correct = ACCEPT.some((a) => normalize(a) === norm);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Điền vào chỗ trống</CardTitle>
        <CardDescription>
          Không nhìn đáp án — tự gõ lại từ/cụm vào chỗ “____”. Dù demo ngắn, sau này sẽ lấy từ bài đọc bạn làm sai.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="rounded-lg border border-border bg-muted/30 p-4 text-[15px] leading-relaxed">
          {FILL_SENTENCE}
        </p>
        <div className="space-y-2">
          <label htmlFor="gap-answer" className="text-sm font-medium">
            Đáp án của bạn
          </label>
          <Input
            id="gap-answer"
            placeholder="Điền một cụm từ (tiếng Anh)"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setChecked(false);
            }}
            autoComplete="off"
          />
        </div>
        {checked ? (
          <p
            className={cn(
              "text-sm font-medium",
              correct ? "text-foreground/85" : "text-destructive/80"
            )}
            role="status"
          >
            {correct
              ? "Đúng — gợi nhớ chủ động giúp bạn không xem đáp án là hiểu hết."
              : `Chưa đúng — gợi ý đáp án kiểu DET: "${ACCEPT[0]}".`}
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 border-t border-border/60 bg-muted/20">
        <Button type="button" onClick={() => setChecked(true)}>
          Kiểm tra
        </Button>
      </CardFooter>
    </Card>
  );
}

function RewritePanel() {
  const [rewrite, setRewrite] = useState("");
  const source =
    "The challenge is ensuring fair access—not every neighborhood receives equal funding.";

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Viết lại bằng lời bạn</CardTitle>
        <CardDescription>
          Đọc câu gốc, không nhìn lại trong lúc gõ — tự tái hiện ý bằng tiếng Anh của bạn. Phiên đầy đủ sẽ có so sánh với mẫu (similarity scoring).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Câu gốc</p>
          <p className="mt-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm leading-relaxed">
            {source}
          </p>
        </div>
        <Separator />
        <div className="space-y-2">
          <label htmlFor="rewrite" className="text-sm font-medium">
            Viết lại của bạn
          </label>
          <Textarea
            id="rewrite"
            rows={6}
            value={rewrite}
            onChange={(e) => setRewrite(e.target.value)}
            placeholder="Paraphrase the idea in English…"
          />
          <p className="text-xs text-muted-foreground">
            Từ:{" "}
            <span className="tabular-nums text-foreground">
              {rewrite.trim() ? rewrite.trim().split(/\s+/).filter(Boolean).length : 0}
            </span>
          </p>
        </div>
        <Card className="bg-muted/30">
          <CardHeader className="py-4">
            <CardTitle className="text-sm">Sample (tham khảo — sau này bật từng bước)</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Officials must balance maintenance costs with equal access across communities.
            </CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
}
