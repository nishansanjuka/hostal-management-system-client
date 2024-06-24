import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { HostelsProvider } from "./hostels-provider";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HostelsProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </HostelsProvider>
    </>
  );
};
