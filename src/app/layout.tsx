import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "AI Political Poster Maker",
  description:
    "Create professional posters with AI-assisted layouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}