"use server";
import { ExtHostler } from "@/hooks/client/hostlers";
import { currentUser } from "@clerk/nextjs/server";
import { Hostel, PrismaClient, Room, Student, User } from "@prisma/client";

interface ExtRoom extends Room {
  hostel: Hostel;
}

export interface ExtStudent extends Student {
  room: ExtRoom;
  user: User;
}

export async function getHostlerForHostel({
  id,
}: {
  id: number;
}): Promise<ExtHostler[]> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized!");
  }

  const prisma = new PrismaClient();

  try {
    const hostlers = await prisma.student.findMany({
      where: { AND: { room: { hostelId: id } } },
      include: {
        user: {
          include: {
            student: {
              include: {
                room: {
                  include: {
                    hostel: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return hostlers as ExtHostler[];
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllStudents(): Promise<ExtHostler[]> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized!");
  }

  const prisma = new PrismaClient();

  try {
    const hostlers = await prisma.student.findMany({
      where: {
        user: {
          role: "STANDARD_USER",
        },
      },
      include: {
        user: {
          include: {
            student: {
              include: {
                room: {
                  include: {
                    hostel: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return hostlers as ExtHostler[];
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStudentById({
  studentId,
}: {
  studentId: string;
}): Promise<ExtStudent> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized!");
  }

  const prisma = new PrismaClient();

  try {
    const student = await prisma.student.findUnique({
      where: {
        studentId,
      },
      include: {
        room: {
          include: {
            hostel: true,
          },
        },
        user: true,
      },
    });
    console.log(student);
    return student as ExtStudent;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}