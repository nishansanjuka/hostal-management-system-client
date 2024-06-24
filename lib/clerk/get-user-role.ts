"use server";
import { ExtdUserJson } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export async function getUserRole(): Promise<Role | undefined> {
  const user = await currentUser();
  if (!user) {
    return undefined;
  }

  const CLERK_BASE_URL = process.env.CLERK_BASE_URL;
  const CLERK_SECRET = process.env.CLERK_SECRET_KEY;

  const res = await fetch(`${CLERK_BASE_URL}/users/${user.id}`, {
    headers: {
      Authorization: `Bearer ${CLERK_SECRET}`,
    },
  });

  if (res.ok) {
    const {
      private_metadata: { role },
    } = (await res.json()) as ExtdUserJson;
    return role;
  } else {
    return undefined;
  }
}
