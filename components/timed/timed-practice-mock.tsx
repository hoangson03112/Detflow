"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TimedPracticeMock() {
  const [seconds, setSeconds] = useState(180);
  const [running, setRunning] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, []);

  function start() {
    if (tick.current) clearInterval(tick.current);
    setRunning(true);
    tick.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          if (tick.current) clearInterval(tick.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function reset() {
    if (tick.current) clearInterval(tick.current);
    setRunning(false);
    setSeconds(180);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <Card className="border-border/45">
      <CardHeader className="border-b border-border/40 pb-5">
        <CardTitle className="text-[1.0625rem] font-medium tracking-[-0.02em]">Luyện theo đồng hồ (mock)</CardTitle>
        <CardDescription className="text-[13px] leading-relaxed">
          Countdown 3 phút; hết giờ tự dừng. Gắn đề và auto submit là bước sau — đây chỉ là chỉ báo thời gian.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        <p
          className="inline-block rounded-2xl border border-border/50 bg-muted/25 px-9 py-7 font-mono text-[2.5rem] leading-none tabular-nums tracking-tight text-foreground/90 shadow-[var(--shadow-surface-xs)]"
          aria-live="polite"
        >
          {mm}:{ss}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={start} disabled={running || seconds === 0}>
            Bắt đầu
          </Button>
          <Button type="button" variant="outline" onClick={reset}>
            Đặt lại 3 phút
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
