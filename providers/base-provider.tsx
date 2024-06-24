import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { HostelsProvider } from "./hostels-provider";
import { HostlersProvider } from "./hostlers-provider";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HostelsProvider>
        <HostlersProvider>
          <ClerkProvider>{children}</ClerkProvider>
        </HostlersProvider>
      </HostelsProvider>
    </>
  );
};
