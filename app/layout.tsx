import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "FitNexus - 헬스장 PT 회원 관리 시스템",
  description: "헬스장 PT 회원 관리 및 트레이너 평가 시스템",
  keywords: ["헬스장", "PT", "회원관리", "트레이너", "평가", "피트니스"],
  authors: [{ name: "FitNexus" }],
  openGraph: {
    title: "FitNexus - 헬스장 PT 회원 관리 시스템",
    description: "헬스장 PT 회원 관리 및 트레이너 평가 시스템",
    url: "https://fitnexus.vercel.app",
    siteName: "FitNexus",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FitNexus - 헬스장 PT 회원 관리 시스템",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitNexus - 헬스장 PT 회원 관리 시스템",
    description: "헬스장 PT 회원 관리 및 트레이너 평가 시스템",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={notoSansKR.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
