"use server";
import { ExtHostel } from "@/hooks/client/hostels";
import { HostelBody } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import {
  GenderType,
  Hostel,
  PrismaClient,
  Variant,
  Year,
} from "@prisma/client";

export async function createHostel(
  hostel: HostelBody
): Promise<Hostel | undefined> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
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
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAllHostels(): Promise<ExtHostel[] | undefined> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/hostels`, {
      method: "GET",
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function filterHostels({
  variant,
  gendar,
  year,
}: {
  variant: Variant;
  gendar: GenderType;
  year: Year;
}): Promise<ExtHostel[]> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const hostels = await prisma.hostel.findMany({
      where: {
        variant,
        year,
        genderType: gendar,
      },
      include: {
        rooms: {
          include: {
            students: {
              include: {
                exchangeRequestsFromUser: {
                  where: {
                    status: "PENDING",
                  },
                },
                exchangeRequestsToUser: {
                  where: {
                    status: "PENDING",
                  },
                },
              },
            },
          },
        },
      },
    });

    return hostels;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getHostelByStudentId({
  studentId,
}: {
  studentId: string;
}): Promise<Hostel | null> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const student = await prisma.student.findUnique({
      where: { studentId },
      include: {
        room: { include: { hostel: true } },
      },
    });

    if (student && student.room) {
      const hostel = await prisma.hostel.findUnique({
        where: { id: student.room.hostelId },
        include: {
          rooms: {
            include: {
              students: true,
            },
          },
        },
      });

      return hostel;
    } else {
      throw new Error("Student not found");
    }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getHostelById({
  id,
}: {
  id: number;
}): Promise<ExtHostel> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/hostels/${id}`, {
      method: "GET",
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function connectUserToRoom(studentId: string, roomId: number) {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const student = await prisma.student.findUnique({
      where: { studentId },
    });

    if (!student) {
      throw new Error(`No student found with userId: ${studentId}`);
    }

    const updatedStudent = await prisma.student.update({
      where: { studentId },
      data: { roomId },
    });

    return updatedStudent;
  } catch (error) {
    console.error("Error connecting user to room:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
