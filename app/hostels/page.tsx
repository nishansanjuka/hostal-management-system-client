"use client";
import {
  FilterSection,
  HostelFilters,
} from "@/components/common/ui/filter-section";
import { HostelCard } from "@/components/pages/hostels/ui/hostel-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useHostels } from "@/hooks/client/hostels";
import { Frown } from "lucide-react";
import React from "react";

export default function HostelsPage({
  searchParams: { variant, year, gendar },
}: {
  searchParams: HostelFilters;
}) {
  const { hostels, isLoading } = useHostels();

  return (
    <main className=" w-[80vw] mx-auto ">
      <section className=" pt-36 w-full flex flex-col items-center">
        <h1 className="text-4xl text-green-700 font-bold text-foreground text-center">
          Available Hostels
        </h1>
        <FilterSection
          defaultValues={{ variant, year, gendar }}
          redirect={false}
          className=" sm:bg-white sm:drop-shadow-md mt-10 text-base"
        />
      </section>

      <section className=" my-20 w-full flex flex-col items-center space-y-6">
        {!isLoading ? (
          hostels.map((hostel, index) => (
            <HostelCard hostel={hostel} key={`hostel-card-${index}`} />
          ))
        ) : (
          <div className=" space-y-4 w-fit">
            {Array.from({ length: 3 }).map((skeleton) => (
              <div
                key={`skeleton-${skeleton}`}
                className="w-full  flex items-center space-x-10 h-fit"
              >
                <Skeleton className=" w-80 aspect-square rounded-2xl" />
                <div className=" h-full flex flex-col w-full">
                  <Skeleton className=" size-8 w-full mb-4" />
                  <div className=" my-1 w-full space-y-1">
                    <Skeleton className=" size-3 w-[110%]" />
                    <Skeleton className=" size-3 w-[60%]" />
                  </div>
                  <div className=" flex items-center w-[130%]">
                    <div className=" flex items-center">
                      <Skeleton className=" size-2 w-full" />
                      <Skeleton className=" size-2 w-full" />
                    </div>
                    <div className=" flex items-center w-full space-x-2">
                      <Skeleton className=" size-4 w-full" />
                      <Skeleton className=" size-4 w-full" />
                    </div>
                  </div>
                  <div className=" flex items-center space-x-2 mt-2 w-[120%]">
                    <Skeleton className=" size-10 rounded-full w-full" />
                    <Skeleton className=" size-10 rounded-full w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && hostels.length === 0 && (
          <p className=" text-muted-foreground text-sm flex items-center">
            oops! nothing found <Frown className=" size-4 ml-1" />
          </p>
        )}
      </section>
    </main>
  );
}
