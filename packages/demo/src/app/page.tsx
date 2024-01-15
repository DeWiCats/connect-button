"use client";

import ConnectButton from "@dewicats/connect-button";

export default function Home() {
  return (
    <main>
      <h1>Wallet Button</h1>
      <ConnectButton compresedView={true} disableMagicLink={true} />
    </main>
  );
}
