"use client";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import img from "@/public/assets/hostel.png";
import { Button } from "@/components/ui/button";
import { ExtHostel } from "@/hooks/client/hostels";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { connectUserToRoom } from "@/lib/actions/hostels";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export const HostelCard: FC<{ hostel: ExtHostel }> = ({ hostel }) => {
  const bedsCount = useMemo(() => getFreeBedsCountByHostelId(hostel), [hostel]);
  const swapCount = useMemo(() => getSwapCountByHostelId(hostel), [hostel]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  function getFreeBedsCountByHostelId(hostel: ExtHostel): number {
    let freeBedsCount = 0;

    hostel.rooms.forEach((room) => {
      if (room.students) {
        freeBedsCount += room.beds - room.students.length;
      }
    });

    return freeBedsCount;
  }

  function getSwapCountByHostelId(hostel: ExtHostel): number {
    let swapCount = 0;
    hostel.rooms.forEach((room) => {
      room.students &&
        room.students.forEach((student) => {
          swapCount += student.exchangeRequestsFromUser.length;
        });
    });
    return swapCount;
  }

  const handleApply = async () => {
    setLoading(true);
    const freeRoom = hostel.rooms.find((room) => room.beds >= 1);
    if (user && freeRoom) {
      await connectUserToRoom(user.id, freeRoom.id);
    }
    setLoading(false);
  };

  return (
    <div className=" w-fit  flex items-center space-x-6 sm:space-x-10 h-fit">
      <Image src={img} alt="img" className=" size-20 sm:size-40" />

      <div className=" h-full flex flex-col w-full">
        <h1 className=" text-2xl font-bold text-green-700 capitalize">
          {hostel.name}
        </h1>
        <div className=" my-1">
          <p className=" text-xs sm:text-sm text-muted-foreground">
            {hostel.location && JSON.parse(atob(hostel.location))["location"]}
          </p>
          <p className=" text-xs sm:text-sm text-muted-foreground">
            {`Distance from university : ${hostel.distance} km`}
          </p>
        </div>
        <div className=" flex items-center space-x-2">
          <div className=" flex items-center">
            <span
              className={cn(
                " size-2 rounded-full mr-1",
                bedsCount === 0 ? "bg-red-500" : "bg-green-500"
              )}
            ></span>
            <p className=" text-xs text-muted-foreground">
              {`${Intl.NumberFormat().format(bedsCount)} available for new`}
            </p>
          </div>
          <div className=" flex items-center">
            <span
              className={cn(
                " size-2 rounded-full mr-1",
                swapCount === 0 ? "bg-red-500" : "bg-blue-500"
              )}
            ></span>
            <p className=" text-xs text-muted-foreground">
              {`${Intl.NumberFormat().format(
                swapCount
              )} available swap hostlers`}
            </p>
          </div>
        </div>
        <div className=" flex items-center space-x-2 mt-4">
          <Button
            disabled={loading || hostel.id !== undefined || hostel.id !== null}
            onClick={handleApply}
            className=" bg-green-200 text-green-600 rounded-full font-extrabold hover:bg-green-600 hover:text-white"
          >
            {loading ? (
              <span className=" flex items-center animate-pulse">
                <Loader className=" size-4 animate-spin mr-1 duration-700" />
                please wait...
              </span>
            ) : (
              "Apply Now"
            )}
          </Button>
          <Button className=" bg-white border-2 border-green-600 text-green-600 rounded-full font-extrabold hover:bg-green-600 hover:text-white">
            <Link href={`/swap-hostels?id=${hostel.id}`}>To Swap</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
