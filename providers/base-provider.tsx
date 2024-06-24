import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ClerkProvider>{children}</ClerkProvider>
    </>
  );
};