import { FC, PropsWithChildren } from "react";
import { HostelsProvider } from "./hostels-provider";
import { HostlersProvider } from "./hostlers-provider";

export const AdminProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* <HostlersProvider> */}
      {/* <HostelsProvider> */}
      {children}
      {/* </HostelsProvider> */}
      {/* </HostlersProvider> */}
    </>
  );
};
