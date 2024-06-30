"use server";
import { User, clerkClient } from "@clerk/nextjs/server";

export async function getUser({ userId }: { userId: string }): Promise<{
  imageUrl: string;
  username: string;
  emailAddress: string;
}> {
  const { imageUrl, username, emailAddresses } =
    await clerkClient.users.getUser(userId);
  return { imageUrl, username, emailAddress : emailAddresses[0].emailAddress } as {
    imageUrl: string;
    username: string;
    emailAddress: string;
  };
}
