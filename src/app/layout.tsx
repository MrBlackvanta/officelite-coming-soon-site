import { siteName, siteUrl } from "@/data";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  display: "swap",
});

const homeTitle = `${siteName} | Collaboration platform launching soon`;
const description =
  "Say goodbye to juggling multiple apps, teams and projects. A new collaboration platform with an intuitive interface, built to improve productivity.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: homeTitle,
    shareTitle: homeTitle,
    description,
    path: "/",
  }),
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: `%s | ${siteName}` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kumbhSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
