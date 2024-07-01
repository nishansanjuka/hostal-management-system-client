"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useHostlers } from "@/hooks/client/hostlers";
import { getAllStudents } from "@/lib/actions/hostlers";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

export const Hsotlers: FC = () => {
  const { hostlers, setAllHostlers } = useHostlers();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setHostlers() {
      setLoading(true);
      setAllHostlers(await getAllStudents());
      setLoading(false);
    }
    setHostlers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Student Id
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Hostel Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {loading && (
                <tbody>
                  {Array.from({ length: 8 }).map((skeleton) => (
                    <tr key={`hostler-${skeleton}`}>
                      <td
                        className={cn(
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        <Skeleton className=" w-full h-6 " />
                      </td>
                      <td
                        className={cn(
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        <Skeleton className=" w-full h-6 " />
                      </td>
                      <td
                        className={cn(
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        <Skeleton className=" w-full h-6 " />
                      </td>
                      <td
                        className={cn(
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        <Skeleton className=" w-full h-6 " />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

              {!loading && (
                <tbody>
                  {hostlers &&
                    hostlers.map((hostler, index) => (
                      <tr key={`hostler-${index}`}>
                        <td
                          className={cn(
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {hostler.user?.username}
                        </td>
                        <td
                          className={cn(
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                          )}
                        >
                          {hostler.user?.email}
                        </td>
                        <td
                          className={cn(
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                          )}
                        >
                          {hostler.user?.student.room?.hostel.name}
                        </td>
                        <td
                          className={cn(
                            "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell capitalize"
                          )}
                        >
                          {hostler.user?.student.room?.hostel &&
                            `${hostler.user?.student.room.hostel.year.toLocaleLowerCase()} Year`}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
