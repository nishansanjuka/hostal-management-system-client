"use client";
import { Button } from "@/components/ui/button";
import { getHostelByStudentId } from "@/lib/actions/hostels";
import {
  createExchangeRequest,
  getExchangeStatusById,
  removeExchangeRequest,
} from "@/lib/actions/swapping-operations";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ExchangeRequest, Hostel } from "@prisma/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

export default function AccountPage() {
  const { isLoaded, user, isSignedIn } = useUser();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [load, setLoad] = useState(false);
  const [exchangeRequestStatus, setExchangeRequestStatus] =
    useState<ExchangeRequest | null>(null);
  const [pleaseWait, setPleaseWait] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoad(true);
      if (user) {
        setExchangeRequestStatus(
          await getExchangeStatusById({ studentId: user.id })
        );
        setHostel(await getHostelByStudentId({ studentId: user.id }));
      }
      setLoad(false);
    }
    getData();
  }, [user]);

  const handleExchangeStatus = async () => {
    setPleaseWait(true);
    if (user) {
      if (exchangeRequestStatus === null) {
        setExchangeRequestStatus(
          await createExchangeRequest({ fromUserId: user.id })
        );
      } else {
        if (await removeExchangeRequest({ id : exchangeRequestStatus.id })) {
          setExchangeRequestStatus(null);
        }
      }
    }
    setPleaseWait(false);
  };

  return (
    <Fragment>
      {isLoaded && isSignedIn && (
        <div className=" w-full px-5 h-screen flex flex-col justify-center items-center max-w-[500px] mx-auto space-y-2">
          {load ? (
            <>please wait ...</>
          ) : (
            <div className=" c-fade-in w-full bg-white rounded-b-3xl drop-shadow-lg translate-y-[-25vh]">
              <div className=" w-full flex justify-between items-center drop-shadow-lg p-5">
                <Image
                  src={user.imageUrl}
                  alt=""
                  width={100}
                  height={100}
                  className=" size-20 rounded-full"
                />
                <div className=" w-fit">
                  <h1 className=" text-3xl tracking-tight font-extrabold text-green-700">
                    Account overview
                  </h1>
                  <p className=" text-muted-foreground w-full text-right">
                    {user.username}
                  </p>
                </div>
              </div>
              {hostel && (
                <div className=" w-full flex justify-between px-5">
                  <div className="w-full px-5 pb-5 text-sm h-fit text-muted-foreground">
                    <p className=" text-xs text-foreground font-medium capitalize">
                      {`${hostel.name}`}
                    </p>
                    <p className=" text-xs capitalize">
                      {`${hostel.year.toLocaleLowerCase()} year`}
                    </p>
                  </div>
                  <Button
                    disabled={load || pleaseWait}
                    onClick={handleExchangeStatus}
                    className={cn(
                      "rounded-full font-extrabold",
                      exchangeRequestStatus !== null
                        ? "bg-red-200 text-red-700 hover:bg-red-600 hover:text-white"
                        : "bg-green-200 text-green-700 hover:bg-green-600 hover:text-white"
                    )}
                  >
                    {pleaseWait ? (
                      <span className=" flex items-center animate-pulse">
                        <Loader className=" size-4 animate-spin duration-500 mr-1" />
                        please wait ...
                      </span>
                    ) : exchangeRequestStatus !== null ? (
                      `I don't want to swap`
                    ) : (
                      "I want to swap"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}
