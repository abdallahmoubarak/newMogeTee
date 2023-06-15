import Image from "next/image";

export default function LogoFade() {
  return (
    <div className="flex flex-col items-center justify-center absolute min-h-screen w-full animate-fade-out opacity-0 z-[-1] bg-white">
      <Image src="/img/MögeTeeLogo.png" alt="hero" width={350} height={350} />
    </div>
  );
}
