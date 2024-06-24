import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ExtdUserJson } from "./types";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  const userId = auth().userId;
  const CLERK_BASE_URL = process.env.CLERK_BASE_URL;
  const CLERK_SECRET = process.env.CLERK_SECRET_KEY;

  const res = await fetch(`${CLERK_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${CLERK_SECRET}`,
    },
  });

  if (res.ok) {
    const {
      private_metadata: { role },
    } = (await res.json()) as ExtdUserJson;

    if (role === "WARDEN") {
      if (
        !req.nextUrl.pathname.includes("/admin")
      ) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      }
    } else if (role === "STANDARD_USER") {
      if (
        req.nextUrl.pathname.includes("/admin") &&
        req.nextUrl.pathname !== "/"
      ) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  }
  if (isProtectedRoute(req)) auth().protect();

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
