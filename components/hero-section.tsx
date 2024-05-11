"use client";

import Image from "next/image";
import ImgSky from "@/public/assets/sky.jpg";
import Mountains from "@/public/assets/mountains.png";
import Ground from "@/public/assets/buildings.png";
import Students from "@/public/assets/students.png";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [hideSky, setHideSky] = useState<boolean>(false);

  useEffect(() => {
    const onScrolling = () => {
      const scrollY = window.scrollY;
      if (window.innerHeight > scrollY) {
        setScrollY(scrollY);
      }
      if (window.innerWidth <= 768) {
        if (scrollY > window.innerHeight / 3 - 40 && hideSky === false) {
          setHideSky(true);
        } else {
          setHideSky(false);
        }
      } else if (window.innerWidth >= 1024) {
        if (scrollY > window.innerWidth / 3 - 200 && hideSky === false) {
          setHideSky(true);
        } else {
          setHideSky(false);
        }
      } else if (window.innerWidth >= 769) {
        if (scrollY > window.innerWidth / 3 - 50 && hideSky === false) {
          setHideSky(true);
        } else {
          setHideSky(false);
        }
      }
    };

    window.addEventListener("scroll", onScrolling);
    window.scroll({ behavior: "smooth" });

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, []);

  return (
    <section className="relative w-full xl:h-screen  overflow-hidden">
      {!hideSky && (
        <Image
          // style={{ scale: 1.5 - scrollY / 800 }}
          className=" object-cover fixed top-0 left-0"
          src={ImgSky}
          alt="ImgSky"
        />
      )}
      <div className=" relative flex justify-center overflow-hidden">
        <Image className="object-cover" src={Mountains} alt="ImgSky" />
        {!hideSky && (
          <div className=" fixed top-[5%] xl:top-[20%] left-0 right-0 bottom-0 flex flex-col w-full items-center space-y-5">
            <h1 className=" font-extrabold text-4xl 2xl:text-7xl capitalize text-foreground">
              sample text Sample Simple text
            </h1>
            <p className=" font-bold text-panel_foreground text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, blanditiis.
            </p>
            <div className=" w-[40%] 2xl:w-[30%] h-[6%] 2xl:h-[8%] flex space-x-2 rounded-full py-3 justify-center items-center bg-white">
              <div className=" h-full flex-[0.3] bg-panel rounded-full"></div>
              <div className=" h-full flex-[0.3] bg-panel rounded-full"></div>
              <div className=" h-full flex-[0.3] bg-panel rounded-full"></div>
              <div className=" h-full bg-panel_background rounded-full aspect-square"></div>
            </div>
          </div>
        )}
        <Image
          style={{ scale: 1 + scrollY / 10000 }}
          className="object-cover absolute left-0 top-0 right-0 bottom-0"
          src={Ground}
          alt="ImgSky"
        />
        <Image
          style={{ scale: 1 + scrollY / 1000 }}
          className="object-cover absolute w-[60%] xl:w-[50%] bottom-0 xl:bottom-20"
          src={Students}
          alt="ImgSky"
        />
      </div>
    </section>
  );
}
