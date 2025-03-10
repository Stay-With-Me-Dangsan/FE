import { Map, useKakaoLoader, MapMarker } from 'react-kakao-maps-sdk';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { useHouseDetailsQuery } from '../../../hooks/house';

/**
 * ha: 서쪽 경도 (minX)
 * oa: 동쪽 경도 (maxX)
 * pa: 북쪽 위도 (maxY)
 * qa: 남쪽 위도 (minY)
 */

interface IProps {
  latitude: number;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  longitude: number;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Maps = (props: IProps) => {
  const { longitude, setLongitude, latitude, setLatitude, setIsOpened } = props;

  const [zoomLevel, setZoomLevel] = useState<number>(3);

  const [minX, setMinX] = useState<number>(0); // 서쪽 경도
  const [maxX, setMaxX] = useState<number>(0); // 동쪽 경도
  const [maxY, setMaxY] = useState<number>(0); // 북쪽 위도
  const [minY, setMinY] = useState<number>(0); // 남쪽 위도

  const houseDetailsQuery = useHouseDetailsQuery({ minX, minY, maxX, maxY });

  const mapRef = useRef<kakao.maps.Map>(null);

  const [loading] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_APP_KEY as string });

  const onMapClickHandler = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    console.log('getCenter', target.getCenter());
    console.log('mouseEvent', mouseEvent);

    const bounds = target.getBounds();
    console.log('bounds', bounds);

    setIsOpened((prev) => !prev);
  };

  const onMapZoomChangedHandler = (target: kakao.maps.Map) => {
    setZoomLevel(target.getLevel());

    const bounds = target.getBounds();

    setMinX(bounds.getSouthWest().getLng());
    setMaxX(bounds.getNorthEast().getLng());
    setMinY(bounds.getSouthWest().getLat());
    setMaxY(bounds.getNorthEast().getLat());
  };

  const onMarkerClickHandler = (marker: kakao.maps.Marker) => {
    console.log('marker', marker.getPosition());
  };

  // useEffect(() => {
  //   if (!loading && mapRef.current) {
  //     console.log('mapRef', mapRef.current);
  //
  //     const map = mapRef.current;
  //
  //     const bounds = map.getBounds();
  //
  //     setMinX(bounds.getSouthWest().getLng());
  //     setMaxX(bounds.getNorthEast().getLng());
  //     setMinY(bounds.getSouthWest().getLat());
  //     setMaxY(bounds.getNorthEast().getLat());
  //   }
  // }, [loading, latitude, longitude, zoomLevel]);

  console.log('minX', minX);
  console.log('maxX', maxX);
  console.log('minY', minY);
  console.log('maxY', maxY);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Map
      className="h-full"
      ref={mapRef}
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
