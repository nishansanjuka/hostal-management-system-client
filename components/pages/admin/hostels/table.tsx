"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHostels } from "@/hooks/client/hostels";
import { getAllHostels } from "@/lib/actions/hostels";
import {
  Edit,
  EllipsisVertical,
  Plus,
  Trash,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { AddRoom } from "./ui/add-room-form";

export const Hostels: FC = () => {
  const { setAllHostels, hostels } = useHostels();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function getHostels() {
      setLoad(true);
      const res = await getAllHostels();

      if (res) {
        setAllHostels(res);
      }
      setLoad(false);
    }
    getHostels();
  }, []);

  return (
    <div className="mt-8 flow-root px-5">
      {load ? <>pleae wait...</> : <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Distance
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Gendar Type
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Batch
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Rooms
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {hostels.map((hostel, index) => (
                <tr
                  key={`hostel-data${index}`}
                  className="divide-x divide-gray-200"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                    {hostel.name}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                    {`${Intl.NumberFormat().format(hostel.distance)} km`}
                  </td>
                  <td className="whitespace-nowrap capitalize p-4 text-sm text-gray-500">
                    {hostel.genderType.toLocaleLowerCase()}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500 capitalize">
                    {`${hostel.year.toLocaleLowerCase()} year`}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500 capitalize break-words">
                    {`${
                      JSON.parse(atob(hostel.location as string))["location"]
                    } year`}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          size={"default"}
                          variant={"ghost"}
                          className=" border hover:text-green-100 hover:bg-green-500 text-xs"
                        >
                          {hostel.rooms
                            ? Intl.NumberFormat().format(hostel.rooms.length)
                            : 0}
                          <Plus className=" size-4 ml-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <AddRoom hostelId={hostel.id} name={hostel.name} />
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant={"ghost"} size={"icon"}>
                          <EllipsisVertical className=" size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem className=" h-fit p-0">
                            <Button
                              variant={"ghost"}
                              className=" hover:text-green-700 hover:bg-green-100 text-xs w-full flex justify-start"
                            >
                              <Edit className=" size-4 mr-2" />
                              Update hostel details
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className=" h-fit p-0">
                            <Button
                              variant={"ghost"}
                              className=" hover:text-red-700 hover:bg-red-100 text-xs w-full flex justify-start"
                            >
                              <Trash className=" size-4 mr-2" />
                              Remove hostel
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
};
