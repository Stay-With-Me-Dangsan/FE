import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import ClusterCircle from './ClusterCircle';
import { ClusterWithHouses } from '../../../types/interface/house';
import { IHouseFilterCondition, IHouseDetailDto } from '../../../types/dto/house';
import { useHouseMutation } from '../../../hooks/house/mutation/useHouseMutation';
import { useHouseDetailsQuery } from '../../../hooks/house';
import map_plus from '../../../asset/images/map_plus.png';
import map_minus from '../../../asset/images/map_minus.png';
import map_location from '../../../asset/images/map_location.png';

interface IProps {
  latitude: number;
  longitude: number;
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
  filterCondition: IHouseFilterCondition;
  clusteredHouses: ClusterWithHouses[];
  selectedCluster: ClusterWithHouses | null;
  setSelectedCluster: (cluster: ClusterWithHouses) => void;
  isOpened: boolean;
  setIsOpened: (open: boolean) => void;
  onZoomChanged: (map: kakao.maps.Map) => void;
  onMyLocation: () => void;
}

export const Map = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  zoomLevel,
  setZoomLevel,
  mapRef,
  filterCondition,
  clusteredHouses,
  selectedCluster,
  setSelectedCluster,
  isOpened,
  setIsOpened,
  onZoomChanged,
  onMyLocation,
}: IProps) => {
  const [selectedClusterHouses, setSelectedClusterHouses] = useState<IHouseDetailDto[]>([]);

  const handleClusterClick = (cluster: ClusterWithHouses) => {
    setSelectedCluster(cluster);

    setSelectedClusterHouses(cluster.houses);

    setIsOpened(true);
  };

  return (
    <div className="relative w-full h-full">
      <KakaoMap
        center={{ lat: latitude, lng: longitude }}
        level={zoomLevel}
        ref={mapRef}
        className="w-full h-full"
        onZoomChanged={onZoomChanged}>
        {clusteredHouses
          .filter((cluster) => cluster.lat !== undefined && cluster.lng !== undefined && cluster.count !== undefined)
          .map((cluster) => (
            <ClusterCircle
              key={`${cluster.lat}-${cluster.lng}-${cluster.count}`}
              lat={cluster.lat}
              lng={cluster.lng}
              count={cluster.count}
              onClick={() => handleClusterClick(cluster)}
            />
          ))}
      </KakaoMap>

      {/* 지도 버튼 */}
      <div className="absolute right-4 top-20 flex flex-col gap-2 z-50">
        <button onClick={onMyLocation}>
          <img src={map_location} alt="현위치" className="w-8 h-8" />
        </button>
        <button onClick={() => mapRef.current?.setLevel(zoomLevel - 1)}>
          <img src={map_plus} alt="확대" className="w-8 h-8" />
        </button>
        <button onClick={() => mapRef.current?.setLevel(zoomLevel + 1)}>
          <img src={map_minus} alt="축소" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
