"use client";
import { FC } from "react";
import { FeedBackCard } from "./ui/feed-back-card";

export const FeedBackSection: FC = () => {
  return (
    <section className="w-full h-full min-h-fit mt-40">
      <header className=" w-full h-fit flex flex-col mb-10 space-y-1 justify-center items-center">
        <h1 className=" text-green-600 text-4xl xl:text-6xl font-bold">
          Sample Text
        </h1>
        <p className=" text-muted-foreground text-xs font-semibold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta,
          incidunt.
        </p>
      </header>

      <section className=" lg:max-w-[70%] mx-auto flex justify-center">
        <FeedBackCard />
      </section>
    </section>
  );
};
