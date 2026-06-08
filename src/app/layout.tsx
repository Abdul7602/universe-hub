import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Universe Hub",
  description: "Interactive Universe Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
