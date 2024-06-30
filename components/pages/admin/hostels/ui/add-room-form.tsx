"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useHostels } from "@/hooks/client/hostels";
import { createRooms } from "@/lib/actions/rooms";
import { cn } from "@/lib/utils";
import { Room } from "@prisma/client";
import { Loader } from "lucide-react";
import { FC, Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RoomBody extends Pick<Room, "beds" | "capacity"> {
  roomsPerUnit: number;
}

export const AddRoom: FC<{ hostelId: number; name: string }> = ({
  hostelId,
  name,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoomBody>();

  const { updateHostelById } = useHostels();
  const [load, setLoad] = useState(false);

  const onSubmit: SubmitHandler<RoomBody> = async (data) => {
    setLoad(true);
    const rooms: Omit<Room, "id">[] = Array.from(
      { length: parseInt(data.roomsPerUnit.toString()) },
      () => ({
        capacity: parseInt(data.capacity.toString()),
        beds: parseInt(data.beds.toString()),
        hostelId: parseInt(hostelId.toString()),
      })
    );

    const res = await createRooms(rooms);
    updateHostelById(hostelId, res);
    setLoad(false);
    reset();
  };

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Add new Room / Rooms</DialogTitle>
        <DialogDescription>
          add new room / rooms to the {name} hostel
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className=" space-x-2 flex items-center">
          <Input
            type="number"
            step={0.01}
            {...register("beds", {
              required: "bed count is required!",
            })}
            className={cn(
              " w-full focus-visible:ring-transparent text-xs",
              errors.beds && " border-red-500"
            )}
            placeholder="Beds count per room"
          />
          <Input
            type="number"
            step={0.01}
            {...register("capacity", {
              required: "bed count is required!",
            })}
            className={cn(
              " w-full focus-visible:ring-transparent text-xs",
              errors.capacity && " border-red-500"
            )}
            placeholder="Capacity per Room"
          />
        </div>
        <div className=" space-x-2 flex items-center">
          <Input
            type="number"
            step={0.01}
            {...register("roomsPerUnit", {
              required: "bed count is required!",
            })}
            className={cn(
              " w-full focus-visible:ring-transparent text-xs",
              errors.beds && " border-red-500"
            )}
            placeholder="Quantity of rooms with this facilities"
          />
          <Button
            variant={"ghost"}
            disabled={load}
            className=" bg-green-700 text-white hover:bg-green-600 hover:text-white"
          >
            {load ? (
              <span className=" flex items-center animate-pulse ">
                <Loader className=" size-4 mr-1 animate-spin" />
                please wait...
              </span>
            ) : (
              "Add Room/Rooms"
            )}
          </Button>
        </div>
      </form>
    </Fragment>
  );
};
