"use client";
import { HostlerCard } from "@/components/pages/hostels/ui/hostler-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExtHostel } from "@/hooks/client/hostels";
import { getAllExchnageRequestsByHostelId } from "@/lib/actions/exchange-operations";
import { getAllHostels, getHostelById } from "@/lib/actions/hostels";
import { useUser } from "@clerk/nextjs";
import { Frown } from "lucide-react";
import React, { use, useEffect, useState } from "react";
interface Props {
  searchParams: {
    id: string;
  };
}
export default function Hostlers({ searchParams: { id } }: Props) {
  const { user } = useUser();
  const [hoseles, setHostels] = useState<ExtHostel[] | undefined>(undefined);
  useEffect(() => {
    async function getHostelData() {
      if (id) {
        const newHostel = await getHostelById({ id: parseInt(id) });
        setHostels([newHostel]);
      } else {
        setHostels(await getAllExchnageRequestsByHostelId());
      }
    }
    getHostelData();
  }, [id]);

  return (
    <main className=" w-[80vw] mx-auto ">
      <section className=" pt-36 w-full flex flex-col items-center space-y-4">
        {hoseles && hoseles.length > 0 ? (
          <>
            {id
              ? hoseles[0].rooms?.map((room) =>
                  room.students?.map((hostler, index) => (
                    <div key={`hoslter-${index}`}>
                      {hostler.studentId !== user?.id && (
                        <HostlerCard
                          hostelId={parseInt(id)}
                          hostler={hostler}
                        />
                      )}
                    </div>
                  ))
                )
              : hoseles.map((hostel) =>
                  hostel.rooms.map((room) =>
                    room.students?.map((hostler, index) => (
                      <div key={`hoslter-${index}`}>
                        {hostler.studentId !== user?.id && (
                          <HostlerCard
                            hostelId={hostel.id}
                            hostler={hostler}
                          />
                        )}
                      </div>
                    ))
                  )
                )}
          </>
        ) : (
          <div className=" space-y-4">
            {Array.from({ length: 6 }).map((skeleton) => (
              <div
                key={`skeleton-${skeleton}`}
                className=" w-fit min-w-[400px] flex items-center space-y-4 h-fit"
              >
                <Skeleton className=" size-20 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className=" size-5 w-full" />
                  <Skeleton className=" size-3 w-[80%]" />
                  <Skeleton className=" size-3 w-[50%]" />
                </div>
                <Skeleton className=" size-10 rounded-full w-[25%]" />
              </div>
            ))}
          </div>
        )}

        {hoseles && hoseles.find((hostel) => hostel.rooms === undefined) && (
          <p className=" text-muted-foreground text-sm flex items-center">
            oops! nothing found <Frown className=" size-4 ml-1" />
          </p>
        )}
      </section>
    </main>
  );
}
