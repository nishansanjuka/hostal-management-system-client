"use client";
import { FC, useEffect, useRef, useState } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Skeleton } from "@/components/ui/skeleton";

export const MapDrawer: FC = () => {
  const mapContainer = useRef<HTMLHeadingElement>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

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
      const coordinate = evt.coordinate;
      console.log("Map clicked at:", coordinate);
    });

    map.on("loadend", () => {
      setIsMapLoaded(true);
    });

    window.addEventListener("resize", onResizing);

    return () => {
      window.removeEventListener("resize", onResizing);
      map.setTarget(undefined);
    };
  }, []);

  return (
    <section ref={mapContainer} className=" w-full h-full mt-20">
      <header className=" w-full h-fit flex flex-col mb-10 space-y-1 justify-center items-center">
        <h1 className=" text-green-600 text-4xl xl:text-6xl font-bold">
          Sample Text
        </h1>
        <p className=" text-muted-foreground text-xs font-semibold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta,
          incidunt.
        </p>
      </header>

      <div className=" relative w-full lg:w-fit mx-auto overflow-x-hidden lg:rounded-2xl lg:aspect-[16/6] max-h-[1440px] overflow-hidden ">
        <section className=" w-full h-full">
          <div id="map" tabIndex={10} className=" w-full h-full "></div>
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
