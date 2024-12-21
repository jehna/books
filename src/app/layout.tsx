import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

const font = Amiri({
  variable: "--font-main",
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Books",
  description: "The books I've read",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>{children}</body>
    </html>
  );
}
