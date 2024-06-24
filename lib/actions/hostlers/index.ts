"use server";
import { ExtHostler } from "@/hooks/client/hostlers";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

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
    });
    return hostlers;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
