"use client";
import { getAllHostels } from "@/lib/actions/hostels";
import { HostelContext } from "@/providers/hostels-provider";
import { Hostel, Room } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

export interface ExtHostel extends Hostel {
  rooms: Room[];
}

export const HostelsContext = () => {
  const [hostels, setHostels] = useState<ExtHostel[]>([]);

  const getHostels = () => hostels;

  const setAllHostels = (newHostel: ExtHostel[]) => {
    setHostels(newHostel);
  };

  const updateHostelById = (id: number, updatedData: Partial<ExtHostel>) => {
    console.log("first");
    setHostels((prevHostels) =>
      prevHostels.map((hostel) =>
        hostel.id === id ? { ...hostel, ...updatedData } : hostel
      )
    );
  };

  const addHostel = (newHostel: ExtHostel) => {
    setHostels((prevHostels) => [...prevHostels, newHostel]);
  };

  const addRoomToHostel = (newRoom: Room) => {
    setHostels((prevHostels) =>
      prevHostels.map((hostel) =>
        hostel.id === newRoom.hostelId
          ? { ...hostel, rooms: [...hostel.rooms, newRoom] }
          : hostel
      )
    );
  };

  useEffect(() => {
    async function getHostels() {
      const res = await getAllHostels();
      if (res) {
        setHostels(res);
      }
    }
    getHostels();
  }, []);

  return {
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
