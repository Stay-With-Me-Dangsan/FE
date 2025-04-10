import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface ClusterCircleProps {
  lat: number;
  lng: number;
  count?: number;
  onClick?: () => void;
}

const ClusterCircle = ({ lat, lng, count, onClick }: ClusterCircleProps) => {
  return (
    <CustomOverlayMap position={{ lat, lng }} clickable={true}>
      <div
        onClick={() => {
          if (onClick) onClick();
        }}
        style={{ zIndex: 9999 }}
        className="w-20 h-20 bg-blue-400 rounded-full text-white font-bold flex items-center justify-center cursor-pointer shadow-md">
        {count}
      </div>
    </CustomOverlayMap>
  );
};

export default ClusterCircle;
