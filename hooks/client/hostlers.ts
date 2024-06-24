"use client";
import { HostlerContext } from "@/providers/hostlers-provider";
import { Student } from "@prisma/client";
import { useContext, useState } from "react";

export interface ExtHostler extends Student {}

export const HostlersContext = () => {
  const [hostlers, setHostlers] = useState<ExtHostler[]>([]);

  const getHostlers = () => hostlers;

  const setAllHostlers = (newHostler: ExtHostler[]) => {
    setHostlers(newHostler);
  };

  const updateHostlerById = (id: string, updatedData: Partial<ExtHostler>) => {
    setHostlers((prevhostlers) =>
      prevhostlers.map((hostler) =>
        hostler.studentId === id ? { ...hostler, ...updatedData } : hostler
      )
    );
  };

  const addHostler = (newHostel: ExtHostler) => {
    setHostlers((prevhostlers) => [...prevhostlers, newHostel]);
  };

  return {
    hostlers,
    getHostlers,
    addHostler,
    setAllHostlers,
    updateHostlerById,
  };
};

export const useHostlers = () => {
  const context = useContext(HostlerContext);
  if (!context) {
    throw new Error("useHostlerContext must be used within an HostlersProvider");
  }
  return context;
};
