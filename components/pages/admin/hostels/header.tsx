"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HostelBody } from "@/types";
import { GenderType, Hostel, Year } from "@prisma/client";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MapDrawer } from "./ui/map";
import { Coordinate } from "ol/coordinate";
import { cn } from "@/lib/utils";
import { createHostel } from "@/lib/actions/hostels";
import { Loader } from "lucide-react";
import { ExtHostel, useHostels } from "@/hooks/client/hostels";

export const NavHeader: FC = () => {
  const [locationCoordinates, setLocationCoordinates] = useState<
    Coordinate | undefined
  >(undefined);
  const [load, setLoad] = useState(false);
  const { addHostel } = useHostels();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Omit<HostelBody, "rooms">>();

  const onSubmit: SubmitHandler<Omit<HostelBody, "rooms">> = async ({
    name,
    distance,
    genderType,
    year,
    location,
  }) => {
    setLoad(true);
    const body: HostelBody = {
      name,
      distance,
      genderType,
      year,
      location: btoa(
        JSON.stringify({
          location: location,
          cords: locationCoordinates ? locationCoordinates : null,
        })
      ),
      rooms: [],
    };

    const res = await createHostel(body);

    if (res) {
      addHostel(res as ExtHostel);
    }
    setLoad(false);
    setOpen(false);
  };

  const handleYear = (value: string) => {
    setValue("year", value as Year);
  };
  const handlegenderType = (value: string) => {
    setValue("genderType", value as GenderType);
  };

  return (
    <nav className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xs font-semibold leading-6 text-gray-900">
          Hostels
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          The list of all the hostels in your system.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button>New Hostel</Button>
          </DialogTrigger>
          <DialogContent className="xl:max-w-[50%] sm:max-w-[90%]">
            <DialogHeader>
              <DialogTitle>Add New Hostel</DialogTitle>
              <DialogDescription>
                add new hostel to the system
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-full space-y-2 "
            >
              <div className=" space-x-2 flex items-center">
                <Input
                  {...register("name", { required: "name is required!" })}
                  className={cn(
                    " w-full focus-visible:ring-transparent text-xs",
                    errors.name && " border-red-500"
                  )}
                  placeholder="Name"
                />
                <Input
                  type="number"
                  step={0.01}
                  {...register("distance", {
                    required: "distance is required!",
                  })}
                  className={cn(
                    " w-full focus-visible:ring-transparent text-xs",
                    errors.distance && " border-red-500"
                  )}
                  placeholder="Approximately distance from university in km"
                />
              </div>
              <Input
                type="text"
                step={0.01}
                {...register("location", {
                  required: "address is required!",
                })}
                className={cn(
                  " w-full focus-visible:ring-transparent text-xs",
                  errors.distance && " border-red-500"
                )}
                placeholder="Address or lane name"
              />
              <div className=" space-x-2 flex items-center">
                <Select
                  onValueChange={handleYear}
                  {...register("year", { required: "Year is required" })}
                >
                  <SelectTrigger
                    className={cn(
                      " w-full capitalize text-xs",
                      errors.year && " border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Choose year" className="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className=" text-xs">Years</SelectLabel>
                      {Object.values(Year).map((year, index) => (
                        <SelectItem
                          key={`year-${index}`}
                          value={year}
                          className=" capitalize text-xs "
                        >
                          {year.toLocaleLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={handlegenderType}
                  {...register("genderType", {
                    required: "Gendar is required",
                  })}
                >
                  <SelectTrigger
                    className={cn(
                      " w-full capitalize text-xs",
                      errors.genderType && " border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Choose gender type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className=" text-xs">Genders</SelectLabel>
                      {Object.values(GenderType).map((gender, index) => (
                        <SelectItem
                          key={`gender-${index}`}
                          value={gender}
                          className=" capitalize text-xs"
                        >
                          {gender.toLocaleLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <MapDrawer setLocation={setLocationCoordinates} />
              <DialogFooter>
                <Button disabled={load} className=" w-full" type="submit">
                  {load ? (
                    <span className=" flex items-center animate-pulse">
                      <Loader className=" size-4 mr-2 animate-spin" />
                      Please wait...
                    </span>
                  ) : (
                    "Add Hostel"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};
