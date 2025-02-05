import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression, LatLngTuple, Icon } from "leaflet";
import { Link as TransitionLink } from "next-transition-router";

export type MapItem = {
  title: string;
  position: LatLngExpression | LatLngTuple;
  path: string[];
  zoom?: number;
};

export type MapProps = {
  places: MapItem[];
};

export default function Map({ places }: MapProps) {
  const defaultZoom = 8;

  const greenIcon = new Icon({
    iconUrl: "/marker-icon-2x-green.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={places.length === 1 ? places[0].position : [52.238846, 4.820189]}
      zoom={places.length === 1 ? places[0].zoom : defaultZoom}
      className="z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place, index) => {
        return (
          <Marker
            key={place.title || index}
            position={place.position}
            icon={greenIcon}
          >
            <Popup>
              <TransitionLink href={`/${place.path[0]}/${place.path[1]}`}>
                {place.title}
              </TransitionLink>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
