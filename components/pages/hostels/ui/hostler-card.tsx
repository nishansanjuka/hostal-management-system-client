"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHostels } from "@/hooks/client/hostels";
import { ExtHostler } from "@/hooks/client/hostlers";
import { confirmExchangeRequest } from "@/lib/actions/swapping-operations";
import { getUser } from "@/lib/clerk/get-user";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ExchangeRequest } from "@prisma/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

export const HostlerCard: FC<{
  hostler: ExtHostler;
  hostelId: number;
}> = ({ hostler, hostelId }) => {
  const [userData, setuserData] = useState<{
    imageUrl: string;
    username: string;
    emailAddress: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [exchangeRequest, setExchangeRequest] = useState<
    ExchangeRequest[] | null
  >(null);

  const { user } = useUser();

  useEffect(() => {
    async function getUserData() {
      if (hostler && hostler.userId && hostler.exchangeRequestsFromUser) {
        setuserData(await getUser({ userId: hostler.studentId }));
        setExchangeRequest(hostler.exchangeRequestsFromUser);
      }
    }
    getUserData();
  }, [hostler]);

  const handleRequest = async () => {
    setLoading(true);
    if (hostler.exchangeRequestsFromUser) {
      const request: ExchangeRequest | undefined =
        hostler.exchangeRequestsFromUser.find(
          (req) => req.status === "PENDING"
        );

      if (userData && request && user) {
        const res = await confirmExchangeRequest({
          req: {
            ...request,
            toUserId: exchangeRequest?.find(
              (student) => student.toUserId === user.id
            )
              ? null
              : user.id,
          },
        });
        setExchangeRequest([res]);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {userData && hostler ? (
        <div className=" w-full translate-x-[-6%] sm:translate-x-0 sm:min-w-[400px] flex items-center space-x-4 h-fit">
          <Image
            src={userData.imageUrl}
            alt="img"
            width={80}
            height={80}
            className=" border rounded-full"
          />
          <div className="flex-1">
            <h1 className=" text-lg font-bold text-green-700 uppercase mb-1">
              {userData.username}
            </h1>
            <p className=" text-xs text-muted-foreground">
              {userData.emailAddress}
            </p>
            <p className=" text-xs text-muted-foreground">
              Room No : {hostler.roomId}
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className=" bg-green-200 text-green-700 rounded-full font-extrabold hover:bg-green-600 hover:text-white">
                Swap With
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will create an application
                  between you & this hostler and send it to the certian parties
                  to consider.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button
                    className={cn(
                      " bg-white border-2 px-8 border-red-600 text-red-600 rounded-full font-extrabold hover:bg-red-600 hover:text-white"
                    )}
                  >
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <Button
                  disabled={loading}
                  onClick={handleRequest}
                  className={cn(
                    "  rounded-full font-extrabold px-8",
                    user &&
                      exchangeRequest &&
                      exchangeRequest.find(
                        (student) => student.toUserId === user.id
                      )
                      ? "bg-orange-200 text-orange-700 hover:bg-orange-600 hover:text-white"
                      : " bg-green-200 text-green-700 hover:bg-green-600 hover:text-white"
                  )}
                >
                  {loading ? (
                    <span className=" animate-pulse flex items-center">
                      <Loader className=" size-4 animate-spin duration-500 mr-1" />
                      please wait...
                    </span>
                  ) : user &&
                    exchangeRequest &&
                    exchangeRequest.find(
                      (student) => student.toUserId === user.id
                    ) ? (
                    "Remove Request"
                  ) : (
                    "Request"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className=" w-fit min-w-[400px] flex items-center space-x-4 h-fit">
          <Skeleton className=" size-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className=" size-5 w-full" />
            <Skeleton className=" size-3 w-[80%]" />
            <Skeleton className=" size-3 w-[50%]" />
          </div>
          <Skeleton className=" size-10 rounded-full w-[25%]" />
        </div>
      )}
    </>
  );
};
