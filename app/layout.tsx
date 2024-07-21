import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/fira-mono";

import brandConfig from "@/configs/brand";
import uiConfig from "@/configs/ui";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: brandConfig.name,
  description: brandConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={uiConfig.defaultThemePalette}
      suppressHydrationWarning={true}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
