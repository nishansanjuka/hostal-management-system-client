"use client";
import { ExtHostel, HostelsContext } from "@/hooks/client/hostels";
import { Room } from "@prisma/client";
import React, { createContext, ReactNode } from "react";

interface HostelContextType {
  hostels: ExtHostel[];
  getHostels: () => ExtHostel[];
  addHostel: (newEvent: ExtHostel) => void;
  setAllHostels: (newhostel: ExtHostel[]) => void;
  updateHostelById: (id: number, updatedData: Partial<ExtHostel>) => void;
  addRoomToHostel: (room: Room) => void;
}

export const HostelContext = createContext<HostelContextType | undefined>(
  undefined
);

export const HostelsProvider = ({ children }: { children: ReactNode }) => {
  const {
    hostels,
    getHostels,
    setAllHostels,
    updateHostelById,
    addHostel,
    addRoomToHostel,
  } = HostelsContext();

  return (
    <HostelContext.Provider
      value={{
        hostels,
        getHostels,
        setAllHostels,
        updateHostelById,
        addHostel,
        addRoomToHostel,
      }}
    >
      {children}
    </HostelContext.Provider>
  );
};
