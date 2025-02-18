import { Map, useKakaoLoader, MapMarker } from 'react-kakao-maps-sdk';
import { useCallback, useState } from 'react';

interface IProps {
  latitude: number;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  longitude: number;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
}

export const Maps = (props: IProps) => {
  const { longitude, setLongitude, latitude, setLatitude } = props;

  const [zoomLevel, setZoomLevel] = useState<number>(3);

  const [loading] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_APP_KEY as string });

  const onMapClickHandler = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    console.log('getCenter', target.getCenter());

    console.log('mouseEvent', mouseEvent);
  };

  const onMapZoomChangedHandler = (target: kakao.maps.Map) => {
    setZoomLevel(target.getLevel());
  };

  const onMarkerClickHandler = (marker: kakao.maps.Marker) => {
    console.log('marker', marker.getPosition());
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Map
      className="w-full h-full"
      center={{ lat: latitude, lng: longitude }}
      level={zoomLevel}
      onClick={(target, mouseEvent) => onMapClickHandler(target, mouseEvent)}
      onZoomChanged={(target) => onMapZoomChangedHandler(target)}>
      <MapMarker
        position={{ lat: latitude, lng: longitude }}
        title="111111111"
        draggable
        onClick={(marker) => onMarkerClickHandler(marker)}
      />
    </Map>
  );
};
