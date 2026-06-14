"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * next-themes 로 다크/라이트 모드를 제어합니다.
 * HeroUI v3 는 자체 Provider 가 필요 없으며, html 의 .dark 클래스만 읽습니다.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
