"use server";

import { currentUser } from "@clerk/nextjs/server";
import { ExchangeRequest, PrismaClient } from "@prisma/client";

export async function getExchangeStatusById({
  studentId,
}: {
  studentId: string;
}): Promise<ExchangeRequest | null> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const prisma = new PrismaClient();
  try {
    const exChangeStatus = await prisma.exchangeRequest.findFirst({
      where: { fromUser: { studentId } },
    });

    console.log(exChangeStatus);
    return exChangeStatus;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createExchangeRequest({
  fromUserId,
}: {
  fromUserId: string;
}): Promise<ExchangeRequest | null> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/room-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromUserId }),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function removeExchangeRequest({
  id,
}: {
  id: number;
}): Promise<boolean> {
  const user = currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/room-requests/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function confirmExchangeRequest({
  req,
}: {
  req: ExchangeRequest;
}): Promise<ExchangeRequest> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/room-requests/${req.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
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
