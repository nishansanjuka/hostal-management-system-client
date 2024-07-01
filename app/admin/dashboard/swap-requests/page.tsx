import {
  NavHeader,
  SwapRequests,
} from "@/components/pages/admin/swap-requests";
import React from "react";

export default function SwapRequestsPage() {
  return (
    <div className=" sm:max-w-[70vw] lg:max-w-full">
      <NavHeader />
      <SwapRequests />
    </div>
  );
}
