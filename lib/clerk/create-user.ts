"use server";

import { ExtdUser, UserBody } from "@/types";
import { UserJSON, currentUser } from "@clerk/nextjs/server";

export async function CreateStandardUser({
  body,
  hostel,
  room,
}: {
  body: Pick<UserBody, "username">;
  hostel: number | undefined;
  room: number | undefined;
}): Promise<UserJSON | undefined> {
  const user = (await currentUser()) as ExtdUser | null;
  if (!user || (user && user.privateMetadata.role !== "WARDEN")) {
    return undefined;
  }

  const CLERK_BASE_URL = process.env.CLERK_BASE_URL;
  const CLERK_SECRET = process.env.CLERK_SECRET_KEY;

  const reqBody: Pick<
    UserBody,
    | "email_address"
    | "username"
    | "password"
    | "skip_password_checks"
    | "private_metadata"
    | "created_at"
    | "public_metadata"
  > = {
    email_address: [
      `${body.username.replace(/[^a-zA-Z0-9 ]/g, "")}@std.uwu.ac.lk`,
    ],
    username: body.username,
    password: `${body.username}@123`,
    skip_password_checks: true,
    private_metadata: {
      role: "STANDARD_USER",
    },
    public_metadata: {
      hostel: hostel,
      room: room,
    },
    created_at: new Date().toISOString(),
  };

  const res = await fetch(`${CLERK_BASE_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLERK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) {
    return data;
  } else {
    console.log(res.status);
    return undefined;
  }
}