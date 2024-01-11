import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConnectButtonProvider from "src/provider/ConnectButtonProvider";
import { clusterApiUrl } from "@solana/web3.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Button",
  description: "Created by DewiCats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rpcHost =
    process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ??
    clusterApiUrl("devnet");

  const MAGIC_KEY = "";

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectButtonProvider magicKey={MAGIC_KEY} solanaRpcHost={rpcHost}>
          {children}
        </ConnectButtonProvider>
      </body>
    </html>
  );
}
