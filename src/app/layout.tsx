import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import Grid from "@/components/Grid";

const suisseIntlCond = localFont({
    src: "../../public/fonts/SuisseIntlCondTrial.woff2",
    variable: "--font-suisse",
    display: "swap",
});

const suisseWorkTrial = localFont({
    src: "../../public/fonts/SuisseWorksTrial-Regular.woff2",
    variable: "--font-suisseWorks",
    display: "swap",
});


export const metadata: Metadata = {
    title: "Essesi Studio — Raya",
    description: "Built for stillness. Designed to last in rooms that mean something.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${suisseIntlCond.variable} ${suisseWorkTrial.variable}`}>
        <body>
        <Grid />
        {children}
        </body>
        </html>
    );
}