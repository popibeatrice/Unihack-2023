// images
import Image from "next/image";
import heroImg from "./assets/landingHeroImage.png";

export default function Home() {
  return (
    <main className="relative mx-auto grid min-h-[calc(100vh_-_175px)] w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-5 px-2 sm:grid-cols-2 sm:gap-0">
      <div className="flex flex-col items-center justify-end gap-2 self-end sm:items-start sm:justify-center sm:self-auto sm:justify-self-start">
        <h1 className="text-center text-xl font-extralight uppercase min-[350px]:text-2xl min-[475px]:text-3xl sm:text-start sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl">
          Learning made by <br className="sm:hidden" />{" "}
          <span className="font-medium">people</span>, <br />
          enhanced by <br className="sm:hidden" />
          <span className="font-medium">AI</span>
        </h1>
        <p className="hidden max-w-lg text-zinc-400 sm:block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          obcaecati?
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center self-start sm:self-auto">
        <Image
          src={heroImg}
          className="w-full max-w-[275px] opacity-30 min-[350px]:max-w-[300px] sm:max-w-2xl sm:self-auto"
          alt="Landing Image"
          priority
        ></Image>
        <p className="block max-w-sm text-center text-zinc-400 sm:hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          obcaecati?
        </p>
      </div>
    </main>
  );
}
