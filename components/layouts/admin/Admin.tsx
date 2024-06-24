import { AdminProvider } from "@/providers/admin-provider";
import { FC, PropsWithChildren } from "react";
import { Container } from "./ui/container";

export const AdminContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AdminProvider>
      <Container>{children}</Container>
    </AdminProvider>
  );
};
