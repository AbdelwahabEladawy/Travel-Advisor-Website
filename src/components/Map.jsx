import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../Hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const {
    isLoading: loadigPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [MapPosition, setMapPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition ? (
        <Button type="position" onClick={getPosition}>
          {loadigPosition ? "loading...." : "use Your Position "}
        </Button>
      ) : (
        ""
      )}
      <MapContainer
        center={MapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>🏳 {city.emoji} </span>
              {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangePos position={MapPosition}></ChangePos>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function ChangePos({ position }) {
  const MAP = useMap();
  MAP.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
