import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className={uiConfig.defaultThemePalette}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
