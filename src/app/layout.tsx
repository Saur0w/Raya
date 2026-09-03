import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const suisseIntlCond = localFont({
  src: "../../public/fonts/SuisseIntlCondTrial.otf",
  variable: "--font-suisse",
  display: "swap",
});

const suisseWorkTrial = localFont({
  src: "../../public/fonts/SuisseWorksTrial-Regular.otf",
  variable: "--font-suisseWorks",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Essesi Studio — Raya",
  description: "Built for stillness. Designed to last in rooms that mean something.",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html lang="en" className={`${suisseIntlCond.variable} ${suisseWorkTrial.variable}`}>
        <body>{children}</body>
      </html>
  );
}
