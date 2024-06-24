"use client";
import { ExtHostler, HostlersContext } from "@/hooks/client/hostlers";
import React, { createContext, ReactNode } from "react";

interface HostlerContextType {
  hostlers: ExtHostler[];
  getHostlers: () => ExtHostler[];
  addHostler: (newHostler: ExtHostler) => void;
  setAllHostlers: (newHostlers: ExtHostler[]) => void;
  updateHostlerById: (id: string, updatedData: Partial<ExtHostler>) => void;
}

export const HostlerContext = createContext<HostlerContextType | undefined>(
  undefined
);

export const HostlersProvider = ({ children }: { children: ReactNode }) => {
  const {
    hostlers,
    getHostlers,
    setAllHostlers,
    updateHostlerById,
    addHostler,
  } = HostlersContext();

  return (
    <HostlerContext.Provider
      value={{
        hostlers,
        getHostlers,
        setAllHostlers,
        updateHostlerById,
        addHostler,
      }}
    >
      {children}
    </HostlerContext.Provider>
  );
};
