import { NavHeader } from "@/components/pages/admin/hostlers";
import { Hsotlers } from "@/components/pages/admin/hostlers/table";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <NavHeader />
      <Hsotlers />
    </div>
  );
}
