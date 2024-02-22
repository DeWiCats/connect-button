import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "../components/ProviderWrapper";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Button",
  description: "Created by DewiCats",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
