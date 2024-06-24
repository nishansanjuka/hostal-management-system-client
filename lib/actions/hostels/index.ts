"use server";
import { ExtHostel } from "@/hooks/client/hostels";
import { HostelBody } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { Hostel, Room } from "@prisma/client";

export async function createHostel(
  hostel: HostelBody
): Promise<Hostel | undefined> {
  const user = currentUser();
  if (!user) {
    return undefined;
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/hostels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hostel),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return undefined;
  }
}



export async function getAllHostels(): Promise<ExtHostel[] | undefined> {
  const user = currentUser();
  if (!user) {
    return undefined;
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/hostels`, {
      method: "GET",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return undefined;
  }
}