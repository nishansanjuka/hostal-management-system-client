"use client";
import Image from "next/image";
import { FC } from "react";
import bg from "@/public/assets/mobile.png";
import { FilterSection } from "@/components/common/ui/filter-section";
import Link from "next/link";

export const MobileHeroSection: FC = () => {
  return (
    <section className=" h-screen w-full sm:hidden block relative">
      <Image
        src={bg}
        width={1920}
        height={1080}
        alt="bg"
        className=" h-screen object-cover object-bottom"
      />
      <div className=" absolute top-0 left-0 w-full bottom-0 flex flex-col items-center  justify-center translate-y-[-15vh] ">
        <FilterSection redirect className=" bg-transparent" />
        <div className=" w-[60%] flex justify-between items-center mt-2">
          <Link className=" font-extrabold text-green-700" href={"/hostels"}>
            Apply Hostal
          </Link>
          <Link className=" font-extrabold text-green-700" href={"/swap-hostels"}>
            Swap Hostal
          </Link>
        </div>
      </div>
    </section>
  );
};
