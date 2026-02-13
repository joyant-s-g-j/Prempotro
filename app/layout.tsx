import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prempotro 💕 | A Digital Love Letter",
  description: "Send a timeless, digital love letter that feels like a warm embrace. Write your heart out, add memories, and let your beloved experience a magical reading journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" >
        {children}
      </body>
    </html>
  );
}
