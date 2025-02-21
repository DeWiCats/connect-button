"use client";

import ConnectButton, { useSolana } from "@dewicats/connect-button";
import logo from "../assets/surprised-cat.jpeg";
import Image from "next/image";
import { useState } from "react";
import { useAsync } from "react-async-hook";

export default function Home() {
  const Logo = () => (
    <Image src={logo} alt="surprised cat" width={70} height={70} />
  );

  return (
    <main className="container">
      <h1>Wallet Connect Button Yo</h1>
      <ConnectButton enableGoogle compresedView logo={Logo} disableMagicLink />
      <SignMessageComponent />
    </main>
  );
}

const SignMessageComponent = () => {
  const { signMessage, disconnect, connected, publicKey } = useSolana();
  const [msgSigned, setMsgSigned] = useState<boolean>(false);

  useAsync(async () => {
    if (!signMessage || !disconnect) return;
    const date = new Date();
    // make date message and create it into a uint8array
    const message = new TextEncoder().encode(date.toISOString());
    try {
      const signature = await signMessage(message);
      const messageAsArrayOfNumbers = Array.from(message);
      const signatureAsArrayOfNumbers = Array.from(signature);
      const res = await fetch("api/verifyHolder", {
        method: "POST",
        body: JSON.stringify({
          message: messageAsArrayOfNumbers,
          signature: signatureAsArrayOfNumbers,
          publicAddress: publicKey?.toBase58(),
        }),
      });
      // check for 200 status
      if (!res.ok) {
        setMsgSigned(false);
        return;
      }

      setMsgSigned(true);
    } catch (error) {
      setMsgSigned(false);
      disconnect();
    }
  }, [connected]);

  return (
    <>{connected && msgSigned && <p>Connected: {publicKey?.toBase58()}</p>}</>
  );
};
