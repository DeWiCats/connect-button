import ConnectButton from "@components/ConnectButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-white text-2xl">Wallet Button</h1>
      <ConnectButton />
    </main>
  );
}
