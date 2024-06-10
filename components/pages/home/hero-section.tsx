"use client";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import sky from "@/public/assets/sky.jpg";
import mountains from "@/public/assets/mountains.png";
import buildings from "@/public/assets/buildings.png";
import students from "@/public/assets/students.png";
import blurBg from "@/public/assets/blurbg.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

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
            {!hidePanel && (
              <div
                ref={panelElement}
                className={cn(
                  "top-0 c-fade-in select-none fixed flex-col w-[99vw] translate-x-[0.5vw] mx-auto max-w-2560 bg-transparent aspect-video flex items-center justify-start space-y-5",
                  sendToBack ? "z-0" : "z-40"
                )}
              >
                <section
                  className={cn(
                    " flex flex-col items-center w-fit transition-all duration-300",
                    devicePixelRatio <= 1
                      ? "scale-100  translate-y-[60%] lg:translate-y-[100%] 3xl:translate-y-[200%]"
                      : "sm:scale-75 lg:scale-90 translate-y-[40%] lg:translate-y-[80%] 3xl:translate-y-[200%]"
                  )}
                >
                  <h1 className=" text-4xl xl:text-6xl font-bold text-foreground">
                    Sample Text Sample Text
                  </h1>
                  <p className=" text-xs text-muted-foreground font-semibold xl:text-lg">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Veritatis, labore.
                  </p>

                  <section className=" relative w-fit p-1 mt-5 rounded-full bg-background flex items-center space-x-2">
                    <Select>
                      <SelectTrigger className="w-[100px] font-bold text-green-700 space-x-3 rounded-full bg-green-200 focus:ring-green-600">
                        <SelectValue placeholder="Variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className=" text-xs">
                            Variant
                          </SelectLabel>
                          <SelectItem className=" text-xs" value="inside">
                            Inside
                          </SelectItem>
                          <SelectItem className=" text-xs" value="outside">
                            Outside
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[100px]  font-bold text-green-700 rounded-full space-x-3 bg-green-200 focus:ring-green-600">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className=" text-xs">Gender</SelectLabel>
                          <SelectItem className=" text-xs" value="male">
                            Male
                          </SelectItem>
                          <SelectItem className=" text-xs" value="female">
                            Female
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[150px] font-bold text-green-700 rounded-full space-x-3 bg-green-200 focus:ring-green-600">
                        <SelectValue placeholder="Acedamic Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className=" text-xs">
                            Acedamic Year
                          </SelectLabel>
                          <SelectItem className=" text-xs" value="1st">
                            First Year
                          </SelectItem>
                          <SelectItem className=" text-xs" value="2nd">
                            Second Year
                          </SelectItem>
                          <SelectItem className=" text-xs" value="3rd">
                            Third Year
                          </SelectItem>
                          <SelectItem className=" text-xs" value="4th">
                            Final Year
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <button className=" cursor-pointer hover:bg-green-600 transition-colors duration-300  rounded-full aspect-square h-full flex items-center justify-center bg-green-700 p-1">
                      <Search className=" w-4 h-4 text-white hover:scale-105 transition-all duration-300" />
                    </button>
                  </section>
                </section>
              </div>
            )}

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
