import type { Metadata } from "next";
import "./globals.css";

import brandConfig from "@/config/brand";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
