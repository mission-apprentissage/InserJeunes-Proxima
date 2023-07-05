'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Typograhpy } from './MaterialUINext';
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size';

export default function FormationMap({ formations, postCodeDetail }: any) {
  const center = postCodeDetail.coordinate || [0, 0];
  const [width, height] = useWindowSize();

  useEffect(() => {}, [width, height]);

  return (
    <AutoSizer key={`${width}_${height}`}>
      {({ width, height }: any) => {
        return (
          <MapContainer
            key={`${width}_${height}`}
            style={{ width: width, height: height }}
            center={center}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {formations.map(
              (
                { lat, long, title, etablissement, postCode, city }: any,
                index: number
              ) => {
                return (
                  <Marker key={index} position={[lat, long]}>
                    <Popup>
                      {title} {etablissement}
                    </Popup>
                    <Tooltip>
                      <Typograhpy variant='h6'>{title}</Typograhpy>
                      <Typograhpy variant='body1'>{etablissement}</Typograhpy>
                      <Typograhpy variant='body2'>
                        {postCode} {city}
                      </Typograhpy>
                    </Tooltip>
                  </Marker>
                );
              }
            )}
          </MapContainer>
        );
      }}
    </AutoSizer>
  );
}
