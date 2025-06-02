import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface ClusterCircleProps {
  lat: number;
  lng: number;
  count: number;
  onClick?: () => void;
}

const ClusterCircle = ({ lat, lng, count, onClick }: ClusterCircleProps) => {
  const baseSize = 40;
  const maxSize = 1000;
  const size = Math.min(baseSize + count * 4, maxSize); // count에 따라 지름 조절

  return (
    <CustomOverlayMap position={{ lat, lng }} clickable={true}>
      <div
        onClick={() => {
          if (onClick) onClick();
        }}
        style={{
          zIndex: 9999,
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${Math.min(size / 3, 24)}px`,
          backgroundColor: '#60A5FA',
          borderRadius: '9999px',
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }}>
        {count}
      </div>
    </CustomOverlayMap>
  );
};

export default ClusterCircle;
