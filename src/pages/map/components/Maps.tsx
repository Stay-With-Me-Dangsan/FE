import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useRef, useState, useEffect } from 'react';
import { useHouseDetailsQuery } from '../../../hooks/house';
import map_plus from '../../../asset/images/map_plus.png';
import map_minus from '../../../asset/images/map_minus.png';
import map_location from '../../../asset/images/map_location.png';
import { useHouseMutation } from '../../../hooks/house/mutation/useHouseMutation';
import ClusterCircle from './ClusterCircle';
import { IHouseDetailDto, ClusterWithHouses } from '../../../types/dto/house';

interface IProps {
  latitude: number;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  longitude: number;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  filters: {
    depositRange: [number, number];
    monthlyRentRange: [number, number];
    selectedSpaceTypes: string[];
    contractPeriod: { minYear: string; minMonth: string; maxYear: string; maxMonth: string };
    selectedGenderTypes: string[];
  };
}

export const Maps = ({ latitude, setLatitude, longitude, setLongitude, setIsOpened, filters }: IProps) => {
  const [zoomLevel, setZoomLevel] = useState<number>(3);
  const [minX, setMinX] = useState<number>(0);
  const [maxX, setMaxX] = useState<number>(0);
  const [maxY, setMaxY] = useState<number>(0);
  const [minY, setMinY] = useState<number>(0);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [loading] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_APP_KEY as string });
  const { getHouseMainMutation, getClustersMutation } = useHouseMutation();
  const [selectedCluster, setSelectedCluster] = useState<{ lat: number; lng: number; count: number } | null>(null);
  const [clusteredHouses, setClusteredHouses] = useState<ClusterWithHouses[]>([]); //클러스터 목록 (count + houses[])
  const [selectedClusterHouses, setSelectedClusterHouses] = useState<IHouseDetailDto[]>([]); // 리스트용

  const handleClusterClick = (cluster: ClusterWithHouses) => {
    setSelectedCluster({ lat: cluster.lat, lng: cluster.lng, count: cluster.count });
    setSelectedClusterHouses(cluster.houses);
  };

  // 메인 가장 많은 지역으로 이동
  useEffect(() => {
    getHouseMainMutation.mutate(undefined, {
      onSuccess: (result) => {
        const clusters: ClusterWithHouses[] = result;
        setClusteredHouses(clusters);
        const topCluster = clusters[0];
        setLatitude(topCluster.lat);
        setLongitude(topCluster.lng);
        mapRef.current?.setCenter(new kakao.maps.LatLng(topCluster.lat, topCluster.lng));
      },
    });
  }, []);

  //   useEffect(() => {
  //  if (getHouseMainMutation.isSuccess && getHouseMainMutation.data) {

  //       // result가 배열인지 검사
  //       if (Array.isArray(result) && result.length > 0) {
  //         const clusters: ClusterWithHouses[] = result;
  //         setClusteredHouses(clusters);
  //         const topCluster = clusters[0];
  //         setLatitude(topCluster.lat);
  //         setLongitude(topCluster.lng);
  //         mapRef.current?.setCenter(new kakao.maps.LatLng(topCluster.lat, topCluster.lng));

  //         setClusteredHouses(clusters);
  //       } else {
  //         console.warn('클러스터 결과가 배열이 아님:', result);
  //       }
  //     }
  //   }, [getHouseMainMutation.isSuccess, getHouseMainMutation.data]);

  // // 초기 bounds 설정
  // useEffect(() => {
  //   if (loading || !mapRef.current) return;

  //   const bounds = mapRef.current.getBounds();
  //   setMinX(bounds.getSouthWest().getLng());
  //   setMaxX(bounds.getNorthEast().getLng());
  //   setMinY(bounds.getSouthWest().getLat());
  //   setMaxY(bounds.getNorthEast().getLat());
  // }, [loading]);

  // 지도 움직임에 따라 클러스트 이동
  const onMapZoomChangedHandler = (target: kakao.maps.Map) => {
    if (!mapRef.current) return; // mapRef.current 체크 추가
    const level = target.getLevel();
    const bounds = target.getBounds();

    const minX = bounds.getSouthWest().getLng();
    const maxX = bounds.getNorthEast().getLng();
    const minY = bounds.getSouthWest().getLat();
    const maxY = bounds.getNorthEast().getLat();

    setZoomLevel(level);
    setMinX(minX);
    setMaxX(maxX);
    setMinY(minY);
    setMaxY(maxY);

    getClustersMutation.mutate(
      { minX, maxX, minY, maxY },
      {
        onSuccess: (res) => {
          setClusteredHouses(res.data.data.result);
        },
      },
    );
  };
  const { data: houseList = [] } = useHouseDetailsQuery({
    ...filters,
    minX,
    minY,
    maxX,
    maxY,
  });

  const onMapClickHandler = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    const position = mouseEvent.latLng;
    if (position) {
      // 클릭 위치에 대한 작업 (예시로는 그냥 콘솔에 출력)
      console.log(position.getLat(), position.getLng());
    }
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert('현재 위치 정보를 사용할 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      if (mapRef.current) {
        mapRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
        console.log('지도 이동함:', lat, lng);
      } else {
        console.warn('mapRef가 아직 준비되지 않았습니다.');
      }
    });
  };

  const filteredHouseList = selectedCluster
    ? houseList.filter(
        (house) =>
          Math.abs(house.latitude - selectedCluster.lat) < 0.005 &&
          Math.abs(house.longitude - selectedCluster.lng) < 0.005,
      )
    : houseList;

  // console.log('houseList', houseList);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="relative w-full h-[calc(100vh-200px)]">
        <div className="absolute top-0 left-0 w-full h-2/3 z-10">
          <Map
            className="w-full h-full z-0"
            ref={mapRef}
            center={{ lat: latitude, lng: longitude }}
            level={zoomLevel}
            onClick={onMapClickHandler}
            onZoomChanged={onMapZoomChangedHandler}>
            {clusteredHouses.map((cluster) => (
              <ClusterCircle
                key={`${cluster.lat}-${cluster.lng}-${cluster.count}`}
                lat={cluster.lat}
                lng={cluster.lng}
                count={cluster.count}
                onClick={() => handleClusterClick(cluster)}
              />
            ))}
          </Map>
        </div>
        {selectedCluster && selectedClusterHouses.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1/3 z-40 bg-white overflow-y-auto shadow-md border-b border-gray-200 p-4">
            <h2 className="text-md bold mb-2 text-center">목록 {selectedCluster.count}</h2>
            {selectedClusterHouses.map((house) => (
              <div
                key={house.houseDetailId}
                className="flex gap-4 p-4 border-b border-gray-100 bg-white rounded-md shadow-sm">
                {/* 썸네일 */}
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={house.houseFilePath} alt="썸네일" className="w-full h-full object-cover" />
                </div>

                {/* 상세 정보 */}
                <div className="flex flex-col justify-between flex-grow">
                  {/* 상단 제목 & 해시태그 */}
                  <div>
                    <div className="text-sm text-purple-500 font-bold mb-1">
                      #{house.tags?.[0]} #{house.tags?.[1]}
                    </div>
                    <div className="text-xs text-gray-700">
                      {house.houseDetailAddress} · {house.maintenance}㎡ · {house.floor}층 ·{' '}
                      {house.management || '관리비 없음'}
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400">{house.houseDetailAddress}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 커스텀 버튼 UI */}
      <div className="absolute top-22 right-4 flex flex-col items-center gap-1 z-50">
        {/* 현위치 버튼 */}
        <button
          onClick={handleMyLocation}
          className="bg-white rounded-md shadow-md border border-gray-300 w-9 h-9 flex justify-center items-center hover:bg-gray-100">
          <img src={map_location} alt="현위치" className="w-5 h-5" />
        </button>

        {/* 확대·축소 버튼 */}
        <div className="bg-white rounded-md shadow-md border border-gray-300 w-9 flex flex-col items-center">
          <button
            className="w-full h-9 hover:bg-gray-100 border-b border-gray-200 flex justify-center items-center"
            onClick={() => {
              const map = mapRef.current;
              if (map) {
                const currentLevel = map.getLevel();
                map.setLevel(currentLevel - 1);
              }
            }}>
            <img src={map_plus} alt="확대" className="w-5 h-5" />
          </button>

          <button
            className="w-full h-9 hover:bg-gray-100 flex justify-center items-center"
            onClick={() => {
              const map = mapRef.current;
              if (map) {
                const currentLevel = map.getLevel();
                map.setLevel(currentLevel + 1);
              }
            }}>
            <img src={map_minus} alt="축소" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
