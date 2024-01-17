"use client";

import ConnectButton, { useSolana } from "@dewicats/connect-button";
import logo from "../assets/surprised-cat.jpeg";
import Image from "next/image";

export default function Home() {
  const { publicKey } = useSolana();

  const Logo = () => (
    <Image src={logo} alt="surprised cat" width={70} height={70} />
  );

  return (
    <main className="container">
      <h1>Wallet Connect Button</h1>
      <ConnectButton compresedView logo={Logo} />
    </main>
  );
}
