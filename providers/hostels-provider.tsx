"use client";
import { ExtHostel, HostelsContext } from "@/hooks/client/hostels";
import { Room } from "@prisma/client";
import React, { createContext, ReactNode } from "react";

interface HostelContextType {
  hostels: ExtHostel[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
    isLoading,
    setIsLoading,
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
        isLoading,
        setIsLoading,
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
