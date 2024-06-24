import { FC, LegacyRef, RefObject } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const FilterPanel: FC<{
  hidePanel: boolean;
  sendToBack: boolean;
  panelElement: RefObject<HTMLDivElement> | undefined;
}> = ({ hidePanel, sendToBack, panelElement }) => {
  return (
    <>
      {" "}
      {!hidePanel && (
        <div
          ref={panelElement}
          className={cn(
            "top-0 c-fade-in select-none fixed flex-col w-[99vw] translate-x-[0.5vw] mx-auto max-w-2560 bg-transparent aspect-video flex items-center justify-start space-y-5",
            sendToBack ? "z-0" : "z-40"
          )}
        >
          <section
            className={cn(
              " flex flex-col items-center w-fit transition-all duration-300",
              devicePixelRatio <= 1
                ? "scale-100  translate-y-[60%] lg:translate-y-[100%] 3xl:translate-y-[200%]"
                : "sm:scale-75 lg:scale-90 translate-y-[40%] lg:translate-y-[80%] 3xl:translate-y-[200%]"
            )}
          >
            <h1 className=" text-4xl xl:text-6xl font-bold text-foreground">
              Sample Text Sample Text
            </h1>
            <p className=" text-xs text-muted-foreground font-semibold xl:text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Veritatis, labore.
            </p>

            <section className=" relative w-fit p-1 mt-5 rounded-full bg-background flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[100px] font-bold text-green-700 space-x-3 rounded-full bg-green-200 focus:ring-green-600">
                  <SelectValue placeholder="Variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className=" text-xs">Variant</SelectLabel>
                    <SelectItem className=" text-xs" value="inside">
                      Inside
                    </SelectItem>
                    <SelectItem className=" text-xs" value="outside">
                      Outside
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[100px]  font-bold text-green-700 rounded-full space-x-3 bg-green-200 focus:ring-green-600">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className=" text-xs">Gender</SelectLabel>
                    <SelectItem className=" text-xs" value="male">
                      Male
                    </SelectItem>
                    <SelectItem className=" text-xs" value="female">
                      Female
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[150px] font-bold text-green-700 rounded-full space-x-3 bg-green-200 focus:ring-green-600">
                  <SelectValue placeholder="Acedamic Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className=" text-xs">
                      Acedamic Year
                    </SelectLabel>
                    <SelectItem className=" text-xs" value="1st">
                      First Year
                    </SelectItem>
                    <SelectItem className=" text-xs" value="2nd">
                      Second Year
                    </SelectItem>
                    <SelectItem className=" text-xs" value="3rd">
                      Third Year
                    </SelectItem>
                    <SelectItem className=" text-xs" value="4th">
                      Final Year
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <button className=" cursor-pointer hover:bg-green-600 transition-colors duration-300  rounded-full aspect-square h-full flex items-center justify-center bg-green-700 p-1">
                <Search className=" w-4 h-4 text-white hover:scale-105 transition-all duration-300" />
              </button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
