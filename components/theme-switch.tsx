"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // SSR 시에는 테마를 알 수 없으므로, 마운트 이후에만 아이콘/라벨을 확정해
  // hydration 불일치를 막습니다. (next-themes 표준 패턴)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = mounted
    ? isDark
      ? "라이트 모드로 전환"
      : "다크 모드로 전환"
    : "테마 전환";

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label={label}
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : (
        <span className="size-5" />
      )}
    </Button>
  );
}
