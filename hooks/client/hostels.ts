"use client";
import { getAllHostels } from "@/lib/actions/hostels";
import { HostelContext } from "@/providers/hostels-provider";
import { ExchangeRequest, Hostel, Room, Student } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

export interface ExtStudent extends Student {
  exchangeRequestsFromUser: ExchangeRequest[];
  exchangeRequestsToUser: ExchangeRequest[];
  
}

export interface ExtRoom extends Room {
  students?: ExtStudent[];
}

export interface ExtHostel extends Hostel {
  rooms: ExtRoom[];
}

export const HostelsContext = () => {
  const [hostels, setHostels] = useState<ExtHostel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getHostels = () => hostels;

  const setAllHostels = (newHostel: ExtHostel[]) => {
    setIsLoading(true);
    setHostels(newHostel);
    setIsLoading(false);
  };

  const updateHostelById = (id: number, updatedData: Partial<ExtHostel>) => {
    setIsLoading(true);
    setHostels((prevHostels) =>
      prevHostels.map((hostel) =>
        hostel.id === id ? { ...hostel, ...updatedData } : hostel
      )
    );
    setIsLoading(false);
  };

  const addHostel = (newHostel: ExtHostel) => {
    setIsLoading(true);

    if (hostels.length > 0) {
      setHostels((prevHostels) => [...prevHostels, newHostel]);
    } else {
      setHostels([newHostel]);
    }
    setIsLoading(false);
  };

  const addRoomToHostel = (newRoom: Room) => {
    setIsLoading(true);
    setHostels((prevHostels) =>
      prevHostels.map((hostel) =>
        hostel.id === newRoom.hostelId
          ? { ...hostel, rooms: [...hostel.rooms, newRoom] }
          : hostel
      )
    );
    setIsLoading(false);
  };

  useEffect(() => {
    async function getHostels() {
      setIsLoading(true);
      const res = await getAllHostels();
      if (res) {
        setHostels(res);
      }
      setIsLoading(false);
    }
    getHostels();
  }, []);

  return {
    isLoading,
    setIsLoading,
    hostels,
    getHostels,
    addHostel,
    setAllHostels,
    updateHostelById,
    addRoomToHostel,
  };
};

export const useHostels = () => {
  const context = useContext(HostelContext);
  if (!context) {
    throw new Error("useHostelContext must be used within an HostelsProvider");
  }
  return context;
};
