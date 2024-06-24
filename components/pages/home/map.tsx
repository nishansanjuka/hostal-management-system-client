"use client";
import { FC, useEffect, useRef, useState } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import { Feature, Overlay } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Skeleton } from "@/components/ui/skeleton";
import { ExtHostel, useHostels } from "@/hooks/client/hostels";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import { OGCMapTile } from "ol/source";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const MapDrawer: FC = () => {
  const mapContainer = useRef<HTMLHeadingElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<ExtHostel | null>(null);

  const { hostels } = useHostels();

  useEffect(() => {
    const initialCoordinates = [9025483.996372394, 779238.512212571];

    const map = new Map({
      view: new View({
        center: initialCoordinates,
        zoom: 16,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
    });

    hostels.map((hostel) => {
      if (hostel.location) {
        const { cords } = JSON.parse(atob(hostel.location)) as {
          location: string;
          cords: number[];
        };

        if (cords) {
          const pitLamp = new VectorLayer({
            source: new VectorSource({
              features: [
                new Feature({
                  id: hostel.id,
                  name: hostel.name,
                  geometry: new Point(cords),
                }),
              ],
            }),
            style: new Style({
              image: new Icon({
                src: "/assets/hostal.png",
                scale: 0.3,
              }),
              text: new Text({
                text: hostel.name,
                font: "12px inter",
                textAlign: "center",
                scale: 0.8,
                fill: new Fill({
                  color: "white",
                }),
                backgroundFill: new Fill({
                  color: "green",
                }),
                padding: [5, 5, 5, 5],
                offsetX: 0,
                offsetY: 30,
              }),
            }),
          });

          map.addLayer(pitLamp);
        }
      }
    });

    function arrangeMap() {
      if (mapContainer.current) {
        const headerElement = mapContainer.current
          .childNodes[0] as HTMLHeadingElement;
        const mapElement = mapContainer.current.childNodes[1] as HTMLDivElement;

        if (headerElement && mapElement) {
          mapElement.style.height = `${
            (window.innerHeight -
              headerElement.getBoundingClientRect().height) *
            (70 / 100)
          }px`;
        }
      }
    }
    arrangeMap();
    const onResizing = () => {
      arrangeMap();
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(initialCoordinates),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: "/assets/location.png",
          scale: 0.3,
        }),
      }),
    });

    map.addLayer(vectorLayer);

    map.on("click", function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });

      if (feature && feature.get("id")) {
        const selected = hostels.find(
          (hostel) => hostel.id === feature.get("id")
        );
        if (selected) setSelectedHostel(selected);
        setOpen(true);
      }
    });

    map.on("loadend", () => {
      setIsMapLoaded(true);
    });

    map.on("pointermove", function (e) {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);

      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    window.addEventListener("resize", onResizing);

    return () => {
      window.removeEventListener("resize", onResizing);
      map.setTarget(undefined);
    };
  }, [hostels]);

  return (
    <section ref={mapContainer} className=" w-full h-full mt-20 ">
      <header className=" w-full h-fit flex flex-col mb-10 space-y-1 justify-center items-center">
        <h1 className=" text-green-600 text-4xl xl:text-6xl font-bold">
          Sample Text
        </h1>
        <p className=" text-muted-foreground text-xs font-semibold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta,
          incidunt.
        </p>
      </header>

      <div className=" relative w-full lg:w-fit mx-auto overflow-x-hidden lg:rounded-2xl lg:aspect-[16/6] max-h-[1440px] overflow-hidden max-w-2560">
        <section className=" w-full h-full">
          <div id="map" tabIndex={10} className=" w-full h-full ">
            {selectedHostel && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className=" max-w-fit">
                  <DialogHeader>
                    <DialogTitle>{selectedHostel.name}</DialogTitle>
                    <DialogDescription>
                      {
                        JSON.parse(atob(selectedHostel.location as string))[
                          "location"
                        ]
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant={'ghost'} className=" bg-green-700 text-white hover:bg-green-600 hover:text-white">
                      <Link href={"#"}>
                        Go checkout this hostel details here
                      </Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </section>
        {!isMapLoaded && (
          <section className="absolute top-0 left-0 bg-slate-200 w-full h-full">
            <Skeleton className=" w-full h-full z-10 rounded-none lg:rounded-2xl bg-slate-100" />
          </section>
        )}
      </div>
    </section>
  );
};
