"use client";

import { FC } from "react";

export const NavHeader: FC = () => {
  return (
    <nav className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xs font-semibold leading-6 text-gray-900">
          Hostels
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          The list of all the hostels in your system.
        </p>
      </div>
    </nav>
  );
};
