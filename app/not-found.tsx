"use client";
import Image from "next/image";
import Img from "@/public/assets/404-bg.avif";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="isolate min-h-screen w-full fixed z-50 bg-background max-w-2560">
      <Image
        src={Img}
        width={1920}
        height={1080}
        placeholder="blur"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          Sorry, we could not find the page you are looking for.
        </p>

        <div className=" flex items-center space-x-4 justify-center">
          <div className="mt-10 flex justify-center">
            <a href="/" className="text-sm font-semibold leading-7 text-white">
              <span aria-hidden="true">&larr;</span> Go back
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <Button onClick={() => router.back()} variant={"default"}>
              Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
