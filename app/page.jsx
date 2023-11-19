// images
import Image from "next/image";
import heroImg from "./assets/landingHeroImage.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import LogInButtonTrimitator from "@/components/client/LogInButtonTrimitator";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <main className="relative mx-auto grid min-h-[calc(100vh_-_175px)] w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-5 px-2 sm:grid-cols-2 sm:gap-0">
      <div className="flex flex-col items-center justify-end gap-3 self-end sm:items-start sm:justify-center sm:self-auto sm:justify-self-start">
        <h1 className="text-center text-xl font-extralight uppercase min-[350px]:text-2xl min-[475px]:text-3xl sm:text-start sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl">
          Learning made by <br className="sm:hidden" />{" "}
          <span className="font-medium">people</span>, <br />
          enhanced by <br className="sm:hidden" />
          <span className="font-medium">AI</span>
        </h1>
        <p className="hidden max-w-lg text-lg text-zinc-400 sm:block">
          Learn from the{" "}
          <span className="font-handwrite text-2xl font-semibold text-primary">
            best
          </span>
          , and let the AI do the{" "}
          <span className="font-handwrite text-2xl font-semibold text-primary">
            rest
          </span>
          . Get a personalized learning experience, tailored to your needs, in
          just{" "}
          <span className="font-handwrite text-2xl font-semibold text-primary">
            a few clicks
          </span>
          .
        </p>
        {!session ? (
          <LogInButtonTrimitator />
        ) : (
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/dashboard/gallery"
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center self-start sm:self-auto">
        <Image
          src={heroImg}
          className="w-full max-w-[275px] opacity-40 min-[350px]:max-w-[300px] sm:max-w-2xl sm:self-auto"
          alt="Landing Image"
          priority
        ></Image>
        <p className="block max-w-sm text-center text-zinc-400 sm:hidden">
          Learn from the{" "}
          <span className="font-handwrite text-xl font-semibold text-primary">
            best
          </span>
          , and let the AI do the{" "}
          <span className="font-handwrite text-xl font-semibold text-primary">
            rest
          </span>
          . Get a personalized learning experience, tailored to your needs, in
          just{" "}
          <span className="font-handwrite text-xl font-semibold text-primary">
            a few clicks
          </span>
          .
        </p>
      </div>
    </main>
  );
}
