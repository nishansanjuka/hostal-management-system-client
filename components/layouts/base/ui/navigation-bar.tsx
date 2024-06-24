"use client";
import Image from "next/image";
import { FC, use, useCallback, useEffect, useMemo, useState } from "react";
import logoDark from "@/public/assets/logo-dark.svg";
import logoLight from "@/public/assets/logo-light.svg";
import { Button } from "@/components/ui/button";
import { navigationRoutesData } from "@/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Role } from "@prisma/client";
import { getUserRole } from "@/lib/clerk/get-user-role";

export const NavigationBar: FC = () => {
  const pathName = usePathname();
  const isHome = pathName === "/";
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [role, setRole] = useState<Role | undefined>(undefined);

  const { signOut } = useClerk();
  const [primaryNavigation, setPrimaryNavigation] = useState(false);
  const [secondaryNavigation, setSetsecondaryNavigation] = useState(false);
  const [showNavigationBar, setShowNavigationBar] = useState<boolean>(false);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      setRole(role);
      setShowNavigationBar(true);
    };
    fetchRole();
    const handleNavigationBar = () => {
      setPrimaryNavigation(window.scrollY > 5);
      setSetsecondaryNavigation(
        window.scrollY >= window.innerWidth * (9 / 16) - 100
      );
      // setShowNavigationBar(true);
    };

    const onScrolling = () => {
      handleNavigationBar();
    };

    handleNavigationBar();

    window.addEventListener("scroll", onScrolling);

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, [isSignedIn]);

  return (
    <>
      {isLoaded && (
        <>
          {showNavigationBar && (
            <header
              className={cn(
                " c-fade-in z-50 flex items-center max-w-2560 h-fit  px-10 py-6 justify-center transition-all duration-500",
                isHome
                  ? "bg-transparent fixed w-full"
                  : "bg-green-700 fixed w-full",
                primaryNavigation && "bg-white w-full",
                secondaryNavigation && "bg-green-700 w-full",
                ["/sign-in", "/admin/dashboard", "/admin/dashboard/hostels"].includes(pathName)
                  ? "hidden"
                  : "flex"
              )}
            >
              <Image
                alt="logo"
                src={
                  isHome
                    ? !secondaryNavigation
                      ? logoDark
                      : logoLight
                    : logoLight
                }
                className=" absolute left-10"
              />
              <section className={cn(" flex items-center w-fit space-x-10")}>
                {role &&
                role !== "STANDARD_USER" &&
                role &&
                role === "WARDEN" ? (
                  <>
                    <Link
                      href="/"
                      className={cn(
                        " select-none",
                        pathName === "/" && "border-b",
                        isHome
                          ? "hover:text-green-700 hover:border-b-green-700 text-muted-foreground border-muted-foreground"
                          : "text-white hover:text-green-100 hover:border-b-green-100 border-white",
                        secondaryNavigation &&
                          "text-white hover:text-green-100 hover:border-b-green-100 border-white"
                      )}
                    >
                      Home
                    </Link>
                    <Link
                      href="/admin/dashboard"
                      className={cn(
                        " select-none",
                        pathName === "/admin/dashboard" && "border-b",
                        isHome
                          ? "hover:text-green-700 hover:border-b-green-700 text-muted-foreground border-muted-foreground"
                          : "text-white hover:text-green-100 hover:border-b-green-100 border-white",
                        secondaryNavigation &&
                          "text-white hover:text-green-100 hover:border-b-green-100 border-white"
                      )}
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  navigationRoutesData.map(({ name, href }) => (
                    <Link
                      key={`nav-route-${name}`}
                      href={href}
                      className={cn(
                        " select-none",
                        pathName === href && "border-b",
                        isHome
                          ? "hover:text-green-700 hover:border-b-green-700 text-muted-foreground border-muted-foreground"
                          : "text-white hover:text-green-100 hover:border-b-green-100 border-white",
                        secondaryNavigation &&
                          "text-white hover:text-green-100 hover:border-b-green-100 border-white"
                      )}
                    >
                      {name}
                    </Link>
                  ))
                )}
              </section>

              {isSignedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className=" absolute right-10 font-extrabold flex items-center space-x-2 outline-none select-none ">
                    <p
                      className={cn(
                        "text-muted-foreground font-medium text-sm min-w-fit",
                        isHome
                          ? "text-muted-foreground"
                          : "text-white hover:text-green-600",
                        secondaryNavigation && "text-white hover:text-green-600"
                      )}
                    >
                      {`${user.emailAddresses[0].emailAddress}`}
                    </p>
                    <button
                      className={cn(
                        " flex items-center space-x-1 hover:text-white hover:bg-green-500 transition-colors duration-300 p-1 rounded-full text-muted-foreground",
                        secondaryNavigation && "text-white"
                      )}
                    >
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
                          <LogOut className=" h-4 w-4 mr-1" /> Log Out
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => router.push("/sign-in")}
                  variant={"ghost"}
                  className={cn(
                    " absolute right-10 font-extrabold",
                    isHome
                      ? "text-muted-foreground"
                      : "text-white hover:text-green-600",
                    secondaryNavigation && "text-white hover:text-green-600"
                  )}
                >
                  login
                </Button>
              )}
            </header>
          )}
        </>
      )}
    </>
  );
};
