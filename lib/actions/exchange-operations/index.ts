"use server";
import { ExtExchangeRequest } from "@/hooks/client/exchange-requests";
import { ExtHostel } from "@/hooks/client/hostels";
import { currentUser } from "@clerk/nextjs/server";
import { ExchangeRequest, PrismaClient } from "@prisma/client";
import { ExtStudent } from "../hostlers";

export async function getAllExchnageRequestsByHostelId(): Promise<
  ExtHostel[] | undefined
> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const hostels = await prisma.hostel.findMany({
      include: {
        rooms: {
          where: {
            students: {
              some: {
                exchangeRequestsFromUser: {
                  some: {
                    status: "PENDING",
                  },
                },
              },
            },
          },
          include: {
            students: {
              include: {
                exchangeRequestsFromUser: true,
              },
            },
          },
        },
      },
    });
    return hostels as any;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllPendingExchnageRequests(): Promise<
  ExtExchangeRequest[] | undefined
> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const hostels = await prisma.exchangeRequest.findMany({
      where: {
        status: "PENDING",
        toUserId: {
          not: null,
        },
      },
    });
    console.log(hostels);
    return hostels;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function ApproveExchange({
  fromStudent,
  toStudent,
  requestId,
}: {
  fromStudent: ExtStudent;
  toStudent: ExtStudent;
  requestId: number;
}): Promise<ExtExchangeRequest> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();

  try {
    await prisma.room.update({
      where: { id: fromStudent.room.id },
      data: {
        students: {
          disconnect: {
            studentId: fromStudent.studentId,
          },
          connect: {
            studentId: toStudent.studentId,
          },
        },
      },
    });

    await prisma.room.update({
      where: { id: toStudent.room.id },
      data: {
        students: {
          disconnect: {
            studentId: toStudent.studentId,
          },
          connect: {
            studentId: fromStudent.studentId,
          },
        },
      },
    });

    const res = await prisma.exchangeRequest.delete({
      where: { id: requestId },
    });

    return res;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function RejectExchangeRequest({
  requestId,
}: {
  requestId: number;
}): Promise<ExchangeRequest | undefined> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const rejected = await prisma.exchangeRequest.delete({
      where: {
        id: requestId,
      },
    });
    return rejected;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
