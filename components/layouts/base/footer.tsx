"use client";
import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import logoLight from "@/public/assets/logo-light.svg";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useHostels } from "@/hooks/client/hostels";
import { useUser } from "@clerk/nextjs";

export const FooterSection: FC = () => {
  const pathName = usePathname();
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const { isLoading } = useHostels();
  const { isLoaded } = useUser();
  useMemo(() => setScrollTop(isLoading), [isLoading]);

  useEffect(() => {
    const onScrolling = () => {
      setScrollTop(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScrolling);

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, []);

  return (
    <footer
      className={cn(
        !isLoaded
          ? "hidden"
          : "w-full select-none h-fit mt-20 bg-green-700 rounded-t-[60px] p-10 text-xs text-white",
        ["/sign-in", "/hostels", "/swap-hostels", "/me"].includes(pathName) ||
          pathName.startsWith("/admin")
          ? "hidden"
          : "block"
        // pathName.startsWith("/hostels") && !scrollTop && "absolute bottom-0",
        // pathName.startsWith("/swap-hostels") &&
        //   !scrollTop &&
        //   "absolute bottom-0"
      )}
    >
      <div className=" flex items-center w-full border-b border-b-white">
        <div className=" space-y-4 flex-[0.8] pb-5">
          <Image src={logoLight} alt="logo" className=" w-20" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            aperiam consequatur doloremque commodi temporibus voluptas ratione
            exercitationem nisi magni. Assumenda repudiandae illo nihil
            consequatur sed fugit? Alias quas odit rem neque nobis illum
            excepturi illo porro commodi,
          </p>
        </div>
      </div>
      <div className=" w-full flex justify-between items-center pt-2">
        <p>Copyright: © 2024 | All Rights Reserved</p>
        <p>Privacy Policy | Trms & Condition</p>
      </div>
    </footer>
  );
};
