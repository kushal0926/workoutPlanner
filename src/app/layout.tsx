import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppProvider";

export const metadata: Metadata = {
  title: "Pulse Plan",
  description: "Create you workout plan through AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
