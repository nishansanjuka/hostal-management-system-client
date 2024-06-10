import { FC, PropsWithChildren } from "react";
import { NavigationBar } from "./ui";
import { Provider } from "@/providers/provider";
import { FooterSection } from "./footer";

export const BaseContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider>
      <NavigationBar />
      {children}
      <FooterSection />
    </Provider>
  );
};
