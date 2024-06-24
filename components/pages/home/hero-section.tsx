"use client";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import sky from "@/public/assets/sky.jpg";
import mountains from "@/public/assets/mountains.png";
import buildings from "@/public/assets/buildings.png";
import students from "@/public/assets/students.png";
import blurBg from "@/public/assets/blurbg.png";
import { FilterPanel } from "./ui/panel";

export const HeroSection: FC = () => {
  const [hidePanel, setHidePanel] = useState<boolean>(false);
  const [sendToBack, setSendToBack] = useState<boolean>(false);
  const studentsElement = useRef<HTMLDivElement>(null);
  const panelElement = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(0);
  const [IntTop, setIntTop] = useState<boolean>(false);

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "instant",
    // });
    function handleHeroSection() {
      setScrollY(window.scrollY);
      if (studentsElement.current && panelElement.current) {
        const studentsBottom =
          studentsElement.current.getBoundingClientRect().bottom;
        const panelBottom = panelElement.current.getBoundingClientRect().bottom;
        setHidePanel(studentsBottom < panelBottom / 2);
      } else {
        if (window.innerWidth < 1000) {
          setHidePanel(window.scrollY > innerHeight / 4);
        } else {
          setHidePanel(window.scrollY > innerHeight / 2);
        }
      }

      if (window.innerWidth > 1000) {
        setSendToBack(window.scrollY > 20);
      } else {
        setSendToBack(window.scrollY > 10);
      }
    }

    setDevicePixelRatio(window.devicePixelRatio);

    handleHeroSection();
    setIntTop(true);

    const onScrolling = () => {
      handleHeroSection();
      setIntTop(true);
    };

    const onResizing = () => {
      setDevicePixelRatio(window.devicePixelRatio);
    };

    window.addEventListener("scroll", onScrolling);
    window.addEventListener("resize", onResizing);
    window.scroll({ behavior: "smooth" });

    return () => {
      window.removeEventListener("scroll", onScrolling);
      window.removeEventListener("resize", onResizing);
    };
  }, []);

  return (
    <section className="relative aspect-video max-h-screen w-full c-fade-in">
      {devicePixelRatio > 0 && IntTop ? (
        <div className=" absolute from-popover top-0 left-0 right-0 bottom-0">
          <div className=" relative w-full max-h-full h-full">
            {/* sky */}
            <Image
              className=" select-none"
              placeholder="blur"
              src={sky}
              alt="sky"
              width={2560}
              height={1440}
            />
            {/* mountains */}
            <div className=" select-none absolute sm:top-0 lg:top-auto lg:bottom-0 3xl:bottom-auto 3xl:top-0 object-cover object-bottom">
              <Image src={mountains} alt="sky" width={2560} height={1440} />
            </div>

            {/* panel */}
            <FilterPanel
              hidePanel={hidePanel}
              panelElement={panelElement}
              sendToBack={sendToBack}
            />

            {/* buildings */}
            <div className=" select-none overflow-hidden absolute sm:top-0 lg:top-auto lg:bottom-0 3xl:bottom-auto 3xl:top-0 object-cover object-bottom">
              <Image
                style={{ scale: 1 + scrollY / 10000 }}
                src={buildings}
                alt="sky"
                width={2560}
                height={1440}
              />
            </div>

            {/* students */}
            <div
              ref={studentsElement}
              className=" select-none absolute overflow-hidden w-full top-0 flex items-end justify-center aspect-video max-h-screen"
            >
              <Image
                style={{ scale: 1 + scrollY / 4000 }}
                src={students}
                alt="sky"
                className=" w-[60%]"
                width={2560}
                height={1440}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className=" absolute top-0 left-0 right-0 bottom-0">
          <div className=" relative w-full max-h-full h-full">
            <Image
              className=" select-none"
              placeholder="blur"
              src={blurBg}
              alt="sky"
              width={2560}
              height={1440}
            />
          </div>
        </div>
      )}
    </section>
  );
};
