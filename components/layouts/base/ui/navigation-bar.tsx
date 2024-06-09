"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import logoDark from "@/public/assets/logo-dark.svg";
import logoLight from "@/public/assets/logo-light.svg";
import { Button } from "@/components/ui/button";
import { navigationRoutesData } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavigationBar: FC = () => {
  const pathName = usePathname();
  const isHome = pathName === "/";
  const [primaryNavigation, setPrimaryNavigation] = useState(false);
  const [secondaryNavigation, setSetsecondaryNavigation] = useState(false);
  const [showNavigationBar, setShowNavigationBar] = useState<boolean>(false);

  useEffect(() => {
    const handleNavigationBar = () => {
      setPrimaryNavigation(window.scrollY > 5);
      setSetsecondaryNavigation(
        window.scrollY >= window.innerWidth * (9 / 16) - 100
      );
      setShowNavigationBar(true);
    };

    const onScrolling = () => {
      handleNavigationBar();
    };

    handleNavigationBar();

    window.addEventListener("scroll", onScrolling);

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, []);

  return (
    <>
      {showNavigationBar && (
        <header
          className={cn(
            " c-fade-in z-50 flex items-center max-w-2560 h-fit  px-10 py-6 justify-center transition-colors duration-300",
            isHome
              ? "bg-transparent fixed w-[99vw]"
              : "bg-green-700 fixed w-full",
            primaryNavigation && "bg-white w-full",
            secondaryNavigation && "bg-green-700 w-full"
          )}
        >
          <Image
            alt="logo"
            src={
              isHome ? (!secondaryNavigation ? logoDark : logoLight) : logoLight
            }
            className=" absolute left-10"
          />
          <section className=" flex items-center w-fit space-x-10">
            {navigationRoutesData.map(({ name, href }) => (
              <Link
                key={`nav-route-${name}`}
                href={href}
                className={cn(
                  " select-none",
                  pathName === href && "border-b",
                  isHome
                    ? "hover:text-green-700 hover:border-b-green-700 text-muted-foreground border-muted-foreground"
                    : "text-white hover:text-green-100 hover:border-b-green-100 border-white",
                  secondaryNavigation &&
                    "text-white hover:text-green-100 hover:border-b-green-100 border-white"
                )}
              >
                {name}
              </Link>
            ))}
          </section>
          <Button
            variant={"ghost"}
            className={cn(
              " absolute right-10 font-extrabold",
              isHome
                ? "text-muted-foreground"
                : "text-white hover:text-green-600",
              secondaryNavigation && "text-white hover:text-green-600"
            )}
          >
            login
          </Button>
        </header>
      )}
    </>
  );
};
