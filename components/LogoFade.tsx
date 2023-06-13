import Image from "next/image";

export default function LogoFade() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 animate-fade-out opacity-0 bg-white">
      <Image src="/img/MögeTeeLogo.png" alt="hero" width={350} height={350} />
    </div>
  );
}
