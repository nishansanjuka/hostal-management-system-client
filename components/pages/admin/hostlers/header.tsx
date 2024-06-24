"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useHostels } from "@/hooks/client/hostels";
import { useHostlers } from "@/hooks/client/hostlers";
import { getHostlerForHostel } from "@/lib/actions/hostlers";
import { CreateStandardUser } from "@/lib/clerk/create-user";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import React, { FC, useState } from "react";

export const NavHeader: FC = () => {
  const [username, setUsername] = useState("");
  const [load, setLoad] = useState(false);
  const [openHostels, setopenHostels] = React.useState(false);
  const [hostelValue, sethostelValue] = React.useState("");
  const [openRooms, setopenRooms] = React.useState(false);
  const [roomValue, setroomValue] = React.useState("");
  const [refresh, setRefresh] = useState(false);

  const { hostels } = useHostels();
  const { setAllHostlers, hostlers } = useHostlers();

  const handleCreate = async () => {
    setLoad(true);
    const user = await CreateStandardUser({
      body: {
        username,
      },
      hostel: hostels.find((hostel) => hostel.name === hostelValue)?.id,
      room: parseInt(roomValue),
    });
    setAllHostlers(
      await getHostlerForHostel({
        id: hostels.find((hostel) => hostel.name === hostelValue)?.id || 1,
      })
    );
    setLoad(false);
  };

  return (
    <nav className="sm:flex sm:items-center">
      <Card>
        <CardHeader>
          <CardTitle className=" text-foreground">Hostlers</CardTitle>
          <CardDescription>
            The list of all the hostlers in your system.
          </CardDescription>
        </CardHeader>
        <CardContent className=" space-y-2">
          <div className=" flex w-fit items-center space-x-2">
            <Popover open={openHostels} onOpenChange={setopenHostels}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openHostels}
                  className="w-[200px] justify-between"
                >
                  {hostelValue
                    ? hostels.find((hostel) => hostel.name === hostelValue)
                        ?.name
                    : "Select hostel..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search hostel..." />
                  <CommandList>
                    <CommandEmpty>No hostel found.</CommandEmpty>
                    <CommandGroup>
                      {hostels.map((hostel) => (
                        <CommandItem
                          key={hostel.name}
                          value={hostel.name}
                          onSelect={async (currentname) => {
                            sethostelValue(
                              currentname === hostelValue ? "" : currentname
                            );
                            setopenHostels(false);
                            setRefresh(true);
                            setAllHostlers(
                              await getHostlerForHostel({
                                id: hostel.id,
                              })
                            );
                            setRefresh(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              hostelValue === hostel.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {hostel.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover open={openRooms} onOpenChange={setopenRooms}>
              <PopoverTrigger asChild>
                <Button
                  disabled={hostelValue === "" || refresh}
                  variant="outline"
                  role="combobox"
                  aria-expanded={openRooms}
                  className="w-[200px] justify-between"
                >
                  {roomValue
                    ? `Room No: ${
                        hostels
                          .find((hostel) => hostel.name === hostelValue)
                          ?.rooms.find(
                            (room) => room.id.toString() === roomValue
                          )?.id
                      }`
                    : "Select room..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search room..." />
                  <CommandList>
                    <CommandEmpty>No hostel found.</CommandEmpty>
                    <CommandGroup>
                      {hostels
                        .find((hostel) => hostel.name === hostelValue)
                        ?.rooms.map((room) => {
                          if (hostlers.length < room.capacity) {
                            return (
                              <CommandItem
                                key={room.id}
                                value={room.id.toString()}
                                onSelect={(currentname) => {
                                  setroomValue(
                                    currentname === roomValue ? "" : currentname
                                  );
                                  setopenRooms(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    roomValue === room.id.toString()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`Room No: ${room.id}`}
                              </CommandItem>
                            );
                          }
                        })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex w-full items-center space-x-2">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              className=" w-full"
              placeholder="ict22007"
            />
            <Button
              onClick={handleCreate}
              disabled={!hostelValue || !roomValue || !username || load}
            >
              {load ? (
                <span className=" flex items-center animate-pulse">
                  <Loader className=" size-4 animate-spin mr-1" /> please wait
                  ...
                </span>
              ) : (
                "New Hostler"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </nav>
  );
};
