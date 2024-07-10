// app/providers.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import uiConfig from "@/configs/ui";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme={uiConfig.defaultThemePalette}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
