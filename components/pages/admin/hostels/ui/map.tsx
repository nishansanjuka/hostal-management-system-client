"use client";
import React, { FC, useEffect, useRef, useState } from "react";

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
import { Coordinate } from "ol/coordinate";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import { LampFloor } from "lucide-react";

export const MapDrawer: FC<{
  setLocation: React.Dispatch<React.SetStateAction<Coordinate | undefined>>;
}> = ({ setLocation }) => {
  const mapContainer = useRef<HTMLHeadingElement>(null);
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
          mapElement.style.height = "300px";
        }
      }
    }
    arrangeMap();
    const onResizing = () => {
      arrangeMap();
    };

    const uniLayer = new VectorLayer({
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
        text: new Text({
          text: "University",
          font: "12px inter",
          textAlign: "center",
          scale: 0.8,
          fill: new Fill({
            color: "#E7E7E7",
          }),
          backgroundFill: new Fill({
            color: "black",
          }),
          padding: [5, 5, 5, 5],
          offsetX: 0,
          offsetY: 30,
        }),
      }),
    });

    const hoverLamp = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([8910947.79216299, 1094132.3443962107]),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: "/assets/pin.png",
          scale: 0.3,
        }),
      }),
    });

    const pitLamp = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([8910947.79216299, 1094132.3443962107]),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: "/assets/hostal.png",
          scale: 0.3,
        }),
        text: new Text({
          text: "location",
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

    map.addLayer(uniLayer);
    map.addLayer(pitLamp);
    map.addLayer(hoverLamp);

    map.on("click", function (evt) {
      pitLamp.setSource(
        new VectorSource({
          features: [
            new Feature({
              geometry: new Point(evt.coordinate),
            }),
          ],
        })
      );
      setLocation(evt.coordinate);
    });

    map.on("loadend", () => {
      setIsMapLoaded(true);
    });

    map.on("pointermove", function (evt) {
      hoverLamp.setSource(
        new VectorSource({
          features: [
            new Feature({
              geometry: new Point(evt.coordinate),
            }),
          ],
        })
      );
    });

    window.addEventListener("resize", onResizing);

    return () => {
      window.removeEventListener("resize", onResizing);
      map.setTarget(undefined);
    };
  }, [setLocation]);

  return (
    <section ref={mapContainer} className=" w-full h-fit ">
      <header className=" w-full h-fit flex flex-col mb-5 space-y-1 justify-center items-center"></header>

      <div className=" relative w-full mx-auto overflow-x-hidden lg:aspect-[16/6] max-h-[1440px] overflow-hidden max-w-2560">
        <section className=" w-full h-full">
          <div id="map" className=" w-full h-full "></div>
        </section>
        {!isMapLoaded && (
          <section className="absolute top-0 left-0 bg-slate-200 w-full h-full">
            <Skeleton className=" w-full h-full z-10 bg-slate-100" />
          </section>
        )}
      </div>
    </section>
  );
};
