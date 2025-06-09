import { useState, useRef, useEffect } from 'react';
import { MapList, Map, MapSearch } from './components';
import { IHouseFilterCondition } from '../../types/dto/house';
import { ClusterWithHouses } from '../../types/interface/house';
import { useHouseMutation } from '../../hooks/house/mutation';
import { Alert } from '../../components/popup';
export const Maps = () => {
  const [latitude, setLatitude] = useState(37.5665);
  const [longitude, setLongitude] = useState(126.978);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState(7);
  const [filterCondition, setFilterCondition] = useState<IHouseFilterCondition>({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    precision: 3,
  });
  const [clusteredHouses, setClusteredHouses] = useState<ClusterWithHouses[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<ClusterWithHouses | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };
  const { getHouseMainMutation, getClustersMutation } = useHouseMutation();

  const { getHouseByConditionMutation } = useHouseMutation();

  const getPrecisionByZoomLevel = (zoomLevel: number) => {
    if (zoomLevel <= 3) return 4;
    if (zoomLevel <= 5) return 3;
    if (zoomLevel <= 7) return 2;
    return 1;
  };

  // 필터 조건이 있는지 확인하는 함수
  const hasActiveFilter = (filter: IHouseFilterCondition) => {
    return (
      !!filter.depositRange?.length ||
      !!filter.monthlyRentRange?.length ||
      !!filter.spaceType?.length ||
      !!filter.genderType?.length ||
      !!filter.shareStartDate?.length ||
      !!filter.shareEndDate?.length
    );
  };
  // 밀집 지역으로 클러스터 위치
  useEffect(() => {
    getHouseMainMutation.mutate(undefined, {
      onSuccess: (res) => {
        const topCluster = res.data.data.result[0];
        setClusteredHouses(res.data.data.result);
        setLatitude(topCluster.lat);
        setLongitude(topCluster.lng);
        mapRef.current?.setCenter(new kakao.maps.LatLng(topCluster.lat, topCluster.lng));
      },
    });
  }, []);

  useEffect(() => {
    const { minX, maxX, minY, maxY } = filterCondition;

    const hasValidBounds =
      typeof minX === 'number' &&
      typeof maxX === 'number' &&
      minX !== 0 &&
      maxX !== 0 &&
      typeof minY === 'number' &&
      typeof maxY === 'number' &&
      minY !== 0 &&
      maxY !== 0;

    if (hasActiveFilter(filterCondition) || (hasActiveFilter(filterCondition) && hasValidBounds)) {
      getHouseByConditionMutation.mutate(filterCondition, {
        onSuccess: (res: any) => {
          const Cluster = res.data.data.result;
          if (Cluster.length === 0) {
            setClusteredHouses([]);
            showAlert('해당 지역에 집이 없습니다.');
          } else {
            setClusteredHouses(Cluster);
          }
        },
      });
    }
  }, [filterCondition]);

  //지도 움직임(확대,축소,내위치)에 따라 클러스터 위치
  const onMapZoomChangedHandler = (target: kakao.maps.Map) => {
    const level = target.getLevel();
    const bounds = target.getBounds();

    const minX = bounds.getSouthWest().getLng();
    const maxX = bounds.getNorthEast().getLng();
    const minY = bounds.getSouthWest().getLat();
    const maxY = bounds.getNorthEast().getLat();
    const precision = getPrecisionByZoomLevel(level);
    setZoomLevel(level);

    // 새로운 범위 갱신
    const updatedFilter: IHouseFilterCondition = {
      ...filterCondition,
      minX,
      maxX,
      minY,
      maxY,
      precision, //정밀도 추가,
    };

    setFilterCondition(updatedFilter);
    // 필터 없을 경우 → 일반 클러스터
    getClustersMutation.mutate(
      { minX, maxX, minY, maxY, precision },
      {
        onSuccess: (res: any) => {
          const Cluster = res.data.data.result;
          setClusteredHouses(Cluster);
        },
      },
    );
  };

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      const kakaoLatLng = new kakao.maps.LatLng(lat, lng);
      mapRef.current?.setCenter(kakaoLatLng);

      const bounds = mapRef.current?.getBounds();
      if (!bounds) return;

      const minX = bounds.getSouthWest().getLng();
      const maxX = bounds.getNorthEast().getLng();
      const minY = bounds.getSouthWest().getLat();
      const maxY = bounds.getNorthEast().getLat();
      // const precision = getPrecisionByZoomLevel(level);

      const updatedFilter: IHouseFilterCondition = {
        ...filterCondition,
        minX,
        maxX,
        minY,
        maxY,
        // precision,
      };

      setFilterCondition(updatedFilter);
      // 현재 지도 내 클러스터 개수 업데이트
      if (hasActiveFilter(updatedFilter)) {
        getClustersMutation.mutate(updatedFilter, {
          onSuccess: (res: any) => {
            setClusteredHouses(res.data.data.result);
          },
        });
      }
    });
  };
  return (
    <div className="w-full h-screen flex flex-col">
      <MapSearch
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        mapRef={mapRef}
      />
      <div className="flex-1 overflow-hidden">
        <Map
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          mapRef={mapRef}
          filterCondition={filterCondition}
          clusteredHouses={clusteredHouses}
          selectedCluster={selectedCluster}
          setSelectedCluster={setSelectedCluster}
          setIsOpened={setIsOpened}
          isOpened={isOpened}
          onZoomChanged={onMapZoomChangedHandler}
          onMyLocation={handleMyLocation}
        />
      </div>
      {isOpened && selectedCluster && <MapList selectedClusterHouses={selectedCluster.houses} />}
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};
