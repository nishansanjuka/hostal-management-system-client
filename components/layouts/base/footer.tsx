"use client";
import Image from "next/image";
import { FC } from "react";
import logoLight from "@/public/assets/logo-light.svg";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const FooterSection: FC = () => {
  const pathName = usePathname();
  return (
    <footer
      className={cn(
        "w-full select-none h-full min-h-fit mt-20 bg-green-700 rounded-t-[60px] p-10 text-xs text-white",
        ["/sign-in","/admin/dashboard"] ? "hidden" : "block"
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
