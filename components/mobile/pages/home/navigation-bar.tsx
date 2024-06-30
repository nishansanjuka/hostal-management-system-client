import { FC } from "react";
import logo from "@/public/assets/logo-dark.svg";
import Image from "next/image";
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
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const MobileNavigationBar: FC = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <header className=" w-full flex items-center bg-transparent absolute top-0 z-50 left-0 p-4 justify-between c-fade-in">
      <Image src={logo} alt="" width={80} height={80} />

      {isSignedIn && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="font-extrabold flex items-center space-x-2 outline-none select-none ">
            <p
              className={cn(
                "text-muted-foreground font-medium text-sm min-w-fit"
              )}
            >
            </p>
            <button
              className={cn(
                " flex items-center space-x-2 hover:text-white hover:bg-green-500 transition-colors duration-300 p-1 rounded-full text-muted-foreground"
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
          className={cn(" font-extrabold")}
        >
          login
        </Button>
      )}
    </header>
  );
};
