import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { Icon, Point } from 'leaflet';

// Define a default icon
const defaultIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: new Point(25, 41),
  iconAnchor: new Point(12, 41),
  popupAnchor: new Point(1, -34),
  shadowSize: new Point(41, 41),
});

interface MarkerProps {
  position: [number, number];
  popupText?: string;
  icon?: Icon;
}

export default function Marker({ position, popupText, icon = defaultIcon }: MarkerProps) {
  return (
    <LeafletMarker position={position} icon={icon}>
      {popupText && (
        <Popup>
          {popupText}
        </Popup>
      )}
    </LeafletMarker>
  );
}
