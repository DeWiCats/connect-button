"use client";

import ConnectButton, { useSolana } from "@dewicats/connect-button";

export default function Home() {
  const { publicAddress, magicAuthenticationStatus, connected, connecting } = useSolana();

  return (
    <main>
      <h1>Wallet Button</h1>
      <ol>
        <li>publicAddress: {publicAddress}</li>
        <li>status: {magicAuthenticationStatus}</li>
        <li>connected: {connected}</li>
        <li>connecting: {connecting}</li>
      </ol>
      <ConnectButton compresedView={true} disableMagicLink={true} />
    </main>
  );
}
