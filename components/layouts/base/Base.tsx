import { FC, PropsWithChildren } from "react";
import { NavigationBar } from "./ui";
import { Provider } from "@/providers/provider";

export const BaseContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider>
      <NavigationBar />
      {children}
    </Provider>
  );
};
