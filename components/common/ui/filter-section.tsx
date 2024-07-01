"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Search } from "lucide-react";
import { GenderType, Variant, Year } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useHostels } from "@/hooks/client/hostels";
import { filterHostels } from "@/lib/actions/hostels";
import { cn } from "@/lib/utils";

export interface HostelFilters {
  variant: Variant;
  year: Year;
  gendar: GenderType;
}

export const FilterSection = ({
  redirect,
  className,
  defaultValues,
}: {
  redirect: boolean;
  className?: string;
  defaultValues?: HostelFilters;
}) => {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [gendar, setGendar] = useState<GenderType | null>(null);
  const [year, setYear] = useState<Year | null>(null);
  const [load, setLoad] = useState(false);

  const router = useRouter();

  const { setAllHostels, setIsLoading } = useHostels();

  useMemo(() => {
    if (defaultValues) {
      setVariant(defaultValues.variant);
      setGendar(defaultValues.gendar);
      setYear(defaultValues.year);
    }
  }, [defaultValues]);

  const handleFilter = async () => {
    setLoad(true);
    setIsLoading(true);
    if (variant && gendar && year) {
      setAllHostels(await filterHostels({ gendar, year, variant }));
      if (redirect)
        router.push(
          `/hostels?variant=${variant}&gendar=${gendar}&year=${year}`
        );
    }
    !redirect && setLoad(false);
    setIsLoading(false);
  };

  return (
    <section
      className={cn(
        " relative w-[60vw] sm:w-fit p-1 mt-5 rounded-full bg-background flex items-center space-x-0 space-y-2 sm:space-x-2 sm:space-y-0 flex-col sm:flex-row",
        className
      )}
    >
      <Select
        defaultValue={defaultValues ? defaultValues.variant : undefined}
        onValueChange={(e: Variant) => setVariant(e)}
      >
        <SelectTrigger className=" w-full sm:w-[100px] font-bold text-green-700 space-x-3 rounded-full bg-green-200 focus:ring-green-600">
          <SelectValue placeholder="Variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className=" text-xs">Variant</SelectLabel>
            {Object.values(Variant).map((variant) => (
              <SelectItem
                key={`select-${variant}`}
                className=" text-xs capitalize"
                value={variant}
              >
                {variant.toLocaleLowerCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={defaultValues ? defaultValues.gendar : undefined}
        onValueChange={(e: GenderType) => setGendar(e)}
      >
        <SelectTrigger className=" w-full sm:w-[100px]  font-bold text-green-700 rounded-full space-x-3 bg-green-200 focus:ring-green-600">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className=" text-xs">Gender</SelectLabel>
            {Object.values(GenderType).map((gendar) => (
              <SelectItem
                key={`select-${gendar}`}
                className=" text-xs capitalize"
                value={gendar}
              >
                {gendar.toLocaleLowerCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={defaultValues ? defaultValues.year : undefined}
        onValueChange={(e: Year) => setYear(e)}
      >
        <SelectTrigger className=" w-full sm:w-[150px] font-bold text-green-700 rounded-full space-x-3 bg-green-200 focus:ring-green-600">
          <SelectValue placeholder="Acedamic Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(Year).map((year) => (
              <SelectItem
                key={`select-${year}`}
                className=" text-xs capitalize"
                value={year}
              >
                {`${year.toLocaleLowerCase()} year`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        disabled={!variant || !gendar || !year || load}
        onClick={handleFilter}
        className="hover:bg-green-700 transition-colors duration-300 disabled:bg-green-700 text-white  rounded-full bg-green-700 hover:text-white"
        size={"icon"}
        variant={"ghost"}
      >
        {load ? (
          <Loader className=" animate-spin duration-1000 w-4 h-4 hover:scale-105 transition-all" />
        ) : (
          <Search className=" w-4 h-4 hover:scale-105 transition-all duration-300" />
        )}
      </Button>
    </section>
  );
};
