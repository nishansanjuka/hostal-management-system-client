"use server";
import { ExtHostel } from "@/hooks/client/hostels";
import { currentUser } from "@clerk/nextjs/server";
import { Room } from "@prisma/client";

export async function createRooms(
  rooms: Omit<Room, "id">[]
): Promise<ExtHostel> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized!");
  }

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/hostels/${rooms[0].hostelId}/rooms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rooms),
      }
    );

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
