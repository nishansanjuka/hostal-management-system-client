"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminRoutes } from "@/data/admin-routes";
import { ChevronDown, Home, LogOut, Menu, Settings } from "lucide-react";
import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";
import { icons } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  const pathName = usePathname();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6" />
              <span className="">Dashboard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {AdminRoutes.map(({ name, href, icon }, index) => (
                <Link
                  key={`admin-routes-${index}`}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathName === href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {React.createElement(icons[icon], {
                    className: cn("h-4 w-4"),
                  })}
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {AdminRoutes.map(({ name, href, icon }, index) => (
                  <Link
                    key={`admin-routes-${index}`}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                      pathName === href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {React.createElement(icons[icon], {
                      className: cn("h-4 w-4"),
                    })}
                    {name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          {isSignedIn && user && (
            <DropdownMenu>
              <DropdownMenuTrigger className=" font-extrabold flex items-center outline-none ">
                <p
                  className={cn(
                    "text-muted-foreground font-medium text-sm min-w-fit"
                  )}
                >
                  {`${user.emailAddresses[0].emailAddress}`}
                </p>
                <button className=" flex items-center space-x-1 hover:bg-slate-100 transition-colors duration-300 p-1 rounded-full text-muted-foreground">
                  <Image
                    src={user.imageUrl}
                    alt="usr"
                    width={500}
                    height={500}
                    className=" max-w-8 max-h-8 aspect-square rounded-full border bg-slate-200"
                  ></Image>
                  <ChevronDown className=" h-4 w-4 relative right-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className=" text-xs uppercase tracking-tight">
                  User Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      href={"/dashboard/settings"}
                      className=" flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Settings className=" h-4 w-4 mr-2" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className=" flex items-center space-x-2  hover:text-red-500 text-muted-foreground w-full p-[0.5] rounded-sm transition-colors duration-200"
                    >
                      <LogOut className=" h-4 w-4 mr-1" /> Sign Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
