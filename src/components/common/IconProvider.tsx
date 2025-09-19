import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlane, faTrainSubway, faCar, faShip, faBicycle, 
  faGlobe, faSuitcase, faUmbrella, faSun, faCloudRain, faCloud,
  faHandPeace, faLock, faUtensils, faMusic, faMountain, faLandmark,
  faHotel, faMapMarkerAlt, faBus, faPencilAlt, faCalendarAlt, faHome, faUser, faMoon, faBars, faTimes,
  faCheck, faExclamationTriangle, faInfoCircle, faStar, faRocket, faCreditCard,
  faCloudSun, faSnowflake, faWind, faCloudMoon, faCamera, faEnvelope, faMagic,
  faMap, faShare, faLink, faFilePdf, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

type IconType = 
  | 'plane' | 'train' | 'car' | 'ship' | 'bicycle'
  | 'globe' | 'suitcase' | 'umbrella' | 'sun' | 'cloud-rain' | 'cloud'
  | 'hand-peace' | 'lock' | 'food' | 'music' | 'mountain' | 'landmark'
  | 'hotel' | 'map-marker' | 'bus' | 'pencil' | 'calendar' | 'home' | 'user'
  | 'moon' | 'bars' | 'times'
  | 'check' | 'warning' | 'info' | 'star' | 'rocket' | 'credit-card'
  | 'cloud-sun' | 'snow' | 'wind' | 'cloud-moon' | 'camera' | 'envelope'
  | 'magic' | 'map' | 'share' | 'link' | 'file-pdf' | 'sign-out-alt';

type IconProps = {
  icon: IconType;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x';
  color?: string;
  spin?: boolean;
};

const iconMap = {
  'plane': faPlane,
  'train': faTrainSubway,
  'car': faCar,
  'ship': faShip,
  'bicycle': faBicycle,
  'globe': faGlobe,
  'suitcase': faSuitcase,
  'umbrella': faUmbrella,
  'sun': faSun,
  'cloud-rain': faCloudRain,
  'cloud': faCloud,
  'hand-peace': faHandPeace,
  'lock': faLock,
  'food': faUtensils,
  'music': faMusic,
  'mountain': faMountain,
  'landmark': faLandmark,
  'hotel': faHotel,
  'map-marker': faMapMarkerAlt,
  'bus': faBus,
  'pencil': faPencilAlt,
  'calendar': faCalendarAlt,
  'home': faHome,
  'user': faUser,
  'moon': faMoon,
  'bars': faBars,
  'times': faTimes,
  'check': faCheck,
  'warning': faExclamationTriangle,
  'info': faInfoCircle,
  'cloud-sun': faCloudSun,
  'snow': faSnowflake,
  'wind': faWind,
  'cloud-moon': faCloudMoon,
  'star': faStar,
  'rocket': faRocket,
  'credit-card': faCreditCard,
  'camera': faCamera,
  'envelope': faEnvelope,
  'magic': faMagic,
  'map': faMap,
  'share': faShare,
  'link': faLink,
  'file-pdf': faFilePdf,
  'sign-out-alt': faSignOutAlt,
};

export default function Icon({ icon, className = '', size, color, spin = false }: IconProps) {
  return (
    <FontAwesomeIcon 
      icon={iconMap[icon]} 
      className={className}
      size={size}
      color={color}
      spin={spin}
    />
  );
}

// Usage:
// <Icon icon="plane" size="2x" className="text-primary" />
