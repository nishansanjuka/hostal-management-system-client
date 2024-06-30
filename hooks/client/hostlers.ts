"use client";
import { HostlerContext } from "@/providers/hostlers-provider";
import { ExchangeRequest, Hostel, Room, Student, User } from "@prisma/client";
import { useContext, useState } from "react";

interface ExRoom extends Room {
  hostel: Hostel;
}

interface ExStudent extends Student {
  room: ExRoom;
}

interface ExtUser extends User {
  student: ExStudent;
}

export interface ExtHostler extends Student {
  exchangeRequestsFromUser?: ExchangeRequest[];
  exchangeRequestsToUser?: ExchangeRequest[];
  user?: ExtUser;
}

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

  const addHostler = (newHostler: ExtHostler) => {
    setHostlers((prevhostlers) => [...prevhostlers, newHostler]);
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
    throw new Error(
      "useHostlerContext must be used within an HostlersProvider"
    );
  }
  return context;
};
