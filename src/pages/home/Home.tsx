import { useSetAtom } from 'jotai';
import { modalStore } from '../../store/modal';
import { Modal } from '../../components/modal';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChattingSocket } from '../../hooks/socket';
import { Map } from '../map/components';
import ClusterCircle from '../map/components/ClusterCircle';
import { ClusterWithHouses } from '../../types/interface/house';
import { IHouseFilterCondition, IHouseDetailDto } from '../../types/dto/house';
import { useHouseMutation } from '../../hooks/house/mutation';

export const Home = () => {
  const [latitude, setLatitude] = useState(37.5665);
  const [longitude, setLongitude] = useState(126.978);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState(7);

  const [clusteredHouses, setClusteredHouses] = useState<ClusterWithHouses[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<ClusterWithHouses | null>(null);

  const { getHouseMainMutation, getClustersMutation } = useHouseMutation();

  const getPrecisionByZoomLevel = (zoomLevel: number) => {
    if (zoomLevel <= 3) return 4;
    if (zoomLevel <= 5) return 3;
    if (zoomLevel <= 7) return 2;
    return 1;
  };

  const REGION_DATA = {
    서울: ['강남구', '강동구', '광진구', '영등포구', '중구', '은평구', '용산구', '종로구', '양천구', '서초구'],
    경기: ['수원시', '성남시', '고양시', '용인시'],
    부산: ['해운대구', '수영구'],
    인천: ['미추홀구', '연수구'],
    경남: ['창원시', '진주시'],
    경북: ['포항시', '경주시'],
    대구: ['중구', '동구'],
    충남: ['천안시', '아산시'],
  } as const;

  type RegionKey = keyof typeof REGION_DATA;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const openModal = useSetAtom(modalStore.openModal);
  const closeModal = useSetAtom(modalStore.closeModal);

  const [message, setMessage] = useState('');
  const { setRoomId, sendMessage, messageList } = useChattingSocket();

  const onRoomClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const { id } = event.currentTarget;
    setRoomId(id === 'none' ? null : id);
  };

  const handleRegionClick = (region: RegionKey) => {
    setSelectedRegion(region);
    setSelectedDistrict(null);
    openModal();
  };

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
  };

  // 밀집 지역으로 클러스터 위치
  useEffect(() => {
    const centerLat = 37.5665;
    const centerLng = 126.978;
    const latRange = 0.2;
    const lngRange = 0.3;

    const minX = centerLng - lngRange;
    const maxX = centerLng + lngRange;
    const minY = centerLat - latRange;
    const maxY = centerLat + latRange;
    const precision = 3;

    getClustersMutation.mutate(
      { minX, maxX, minY, maxY, precision },
      {
        onSuccess: (res: any) => {
          const Cluster = res.data.data.result;
          console.log(Cluster);
          setClusteredHouses(Cluster);
        },
      },
    );
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-[35vh]">
        <Map
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          mapRef={mapRef}
          clusteredHouses={clusteredHouses}
          selectedCluster={selectedCluster}
          setSelectedCluster={setSelectedCluster}
          draggable
          scrollwheel
          disableDoubleClickZoom
        />
      </div>

      <div className="flex flex-col gap-10 mt-10">
        <h1 className="text-xl font-bold">오픈 채팅방</h1>

        {/* 시/도 버튼 */}
        <div className="flex flex-wrap justify-center gap-2">
          {Object.keys(REGION_DATA).map((region) => (
            <button
              key={region}
              onClick={() => handleRegionClick(region as RegionKey)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-purple-200">
              {region}
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedRegion && (
          <Modal title={`${selectedRegion} 지역 선택`}>
            <div className="grid grid-cols-3 gap-2">
              {REGION_DATA[selectedRegion].map((district) => (
                <button
                  key={district}
                  onClick={() => handleDistrictClick(district)}
                  className={`px-2 py-1 rounded border text-sm ${
                    selectedDistrict === district ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'
                  }`}>
                  {district}
                </button>
              ))}
            </div>

            {selectedDistrict && (
              <button
                className="bg-purple-500 text-white w-full py-2 rounded mt-4"
                onClick={() => {
                  alert(`${selectedDistrict} 채팅방으로 이동!`);
                  closeModal(); // 모달 닫기
                }}>
                {selectedDistrict} 채팅방 들어가기
              </button>
            )}
          </Modal>
        )}
      </div>

      <div className="flex flex-col gap-10 mt-10">
        <h1 className="text-xl font-bold">Best 후기</h1>
      </div>
    </div>
  );
};
