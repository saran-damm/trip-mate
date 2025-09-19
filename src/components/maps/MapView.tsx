import { MapContainer, TileLayer } from 'react-leaflet';
import Marker from './Marker';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  center: [number, number];
  markers: {
    position: [number, number];
    popupText?: string;
  }[];
  zoom?: number;
}

export default function MapView({ center, markers, zoom = 13 }: MapViewProps) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} popupText={marker.popupText} />
      ))}
    </MapContainer>
  );
}
