"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
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
import { useMediaQuery } from "react-responsive";
import { MobileNavigationBar } from "@/components/mobile/pages/home/navigation-bar";

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

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      setRole(role);
      setShowNavigationBar(true);
    };
    fetchRole();
    const handleNavigationBar = () => {
      if (pathName === "/") {
        setPrimaryNavigation(window.scrollY > 5);
        setSetsecondaryNavigation(
          window.scrollY >= window.innerWidth * (9 / 16) - 100
        );
        // setShowNavigationBar(true);
      }
    };

    const onScrolling = () => {
      handleNavigationBar();
    };

    handleNavigationBar();

    window.addEventListener("scroll", onScrolling);

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, [isSignedIn, pathName]);

  return (
    <div className=" hidden sm:block">
      {isLoaded && (
        <>
          {!isMobile && (
            <>
              {showNavigationBar && (
                <header
                  className={cn(
                    " c-fade-in z-50 flex items-center max-w-2560 h-fit  px-10 py-6 justify-center transition-all duration-500",
                    isHome
                      ? "bg-transparent fixed w-full"
                      : "bg-white fixed w-full",
                    primaryNavigation && "bg-white w-full",
                    secondaryNavigation && "bg-white w-full",
                    [
                      "/sign-in",
                      "/admin/dashboard",
                      "/admin/dashboard/hostels",
                      "/admin/dashboard/swap-requests",
                    ].includes(pathName)
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
                          : logoDark
                        : logoDark
                    }
                    className=" absolute left-10"
                  />
                  <section
                    className={cn(" flex items-center w-fit space-x-10")}
                  >
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
                              ? "hover:text-muted-foreground hover:border-b-white text-muted-foreground border-muted-foreground"
                              : "text-muted-foreground hover:text-muted-foreground hover:border-b-muted-foreground border-muted-foreground",
                            secondaryNavigation &&
                              "text-muted-foreground hover:text-muted-foreground hover:border-b-muted-foreground border-muted-foreground"
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
                              ? "hover:text-muted-foreground hover:border-b-muttext-muted-foreground text-muted-foreground border-muted-foreground"
                              : "text-muted-foreground hover:text-muted-foreground hover:border-b-muted-foreground border-muted-foreground",
                            secondaryNavigation &&
                              "text-muted-foreground hover:text-muted-foreground hover:border-b-muted-foreground border-muted-foreground"
                          )}
                        >
                          Dashboard
                        </Link>
                      </>
                    ) : (
                      navigationRoutesData.map(({ name, href, isHref }) => (
                        <div key={`nav-route-${name}`}>
                          {isHref ? (
                            <Link
                              href={href}
                              className={cn(
                                " select-none",
                                pathName === href && "border-b",
                                isHome
                                  ? "hover:text-muted-foreground hover:border-b-muttext-muted-foreground text-muted-foreground border-muted-foreground"
                                  : "text-muted-foreground hover:text-muted-foreground hover:border-b-muted-foreground border-muted-foreground",
                                secondaryNavigation &&
                                  "text-muted-foreground hover:text-muted-foreground hover:border-b-muted-foreground border-muted-foreground"
                              )}
                            >
                              {name}
                            </Link>
                          ) : (
                            <div
                              className={cn(
                                " select-none",
                                pathName.includes(href) &&
                                  pathName !== href &&
                                  "border-b",
                                isHome
                                  ? " text-muted-foreground border-muted-foreground"
                                  : "text-muted-foreground  border-muted-foreground",
                                secondaryNavigation &&
                                  "text-muted-foreground  border-muted-foreground"
                              )}
                            >
                              {name}
                            </div>
                          )}
                        </div>
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
                              : "text-muted-foreground hover:text-slate-600",
                            secondaryNavigation &&
                              "text-muted-foreground hover:text-slate-600"
                          )}
                        >
                          {`${user.emailAddresses[0].emailAddress}`}
                        </p>
                        <button
                          className={cn(
                            " flex items-center space-x-2 hover:text-muted-foreground hover:bg-green-500 transition-colors duration-300 p-1 rounded-full text-muted-foreground",
                            secondaryNavigation && "text-white"
                          )}
                        >
                          <Image
                            src={user.imageUrl}
                            alt="usr"
                            width={500}
                            height={500}
                            className=" max-w-8 max-h-8 aspect-square rounded-full border bg-blue-400"
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
                              href={"/me"}
                              className=" flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                              <Settings className=" h-4 w-4 mr-2" /> Account
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
                          : "text-black hover:text-green-600",
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

          {isMobile && <MobileNavigationBar />}
        </>
      )}
    </div>
  );
};
