import { FC, RefObject } from "react";
import { cn } from "@/lib/utils";
import { FilterSection } from "@/components/common/ui/filter-section";

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
            <FilterSection redirect />
          </section>
        </div>
      )}
    </>
  );
};
