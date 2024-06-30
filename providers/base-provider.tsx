import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { HostelsProvider } from "./hostels-provider";
import { HostlersProvider } from "./hostlers-provider";
import { ExchangeRequestProvider } from "./exchanges-provider";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HostelsProvider>
        <HostlersProvider>
          <ExchangeRequestProvider>
            <ClerkProvider>{children}</ClerkProvider>
          </ExchangeRequestProvider>
        </HostlersProvider>
      </HostelsProvider>
    </>
  );
};
