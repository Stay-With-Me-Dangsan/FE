import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HouseItem } from './components/HouseItem';
import { HouseSection } from './components/HouseSection';
import { IHouse } from '../../types/interface/house/house.model';
import room1 from '../../asset/images/room1.png';
import animal from '../../asset/images/animal.png';
import what from '../../asset/images/what.png';
import sun from '../../asset/images/sun.png';
import space from '../../asset/images/space.png';
import myapge_list from '../../asset/images/myapge_list.png';
export const MypageHouseView = () => {
  const navigate = useNavigate();
  const [houses, setHouse] = useState<IHouse[]>([]);

  useEffect(() => {
    //   const fetchUploadedHouses = async () => {
    //     try {
    //       const res = await axios.get('/api/mypage/house/view');
    //       setHouse(res.data.data);
    //     } catch (err) {
    //       console.error(최근 본본 집 불러오기 실패', err);
    //     }
    //   };

    //   fetchUploadedHouses();
    const mockHouses: IHouse[] = [
      {
        id: 1,
        imageSrc: room1,
        tags: ['#조용함', '#햇살좋음'],
        type: '분리형 투룸',
        address: '마포구 서교동',
        size: '30.5m',
        floor: '5층',
        maintenance: '관리비 포함',
        options: [
          { icon: space, label: '마포구 서교동 123-45' },
          { icon: animal, label: '애완동물 가능' },
          { icon: what, label: '즉시 입주 가능' },
          { icon: sun, label: '남향(안방 주실 기준)' },
          { icon: animal, label: '애완동물 가능' },
        ],
      },
      {
        id: 2,
        imageSrc: room1,
        tags: ['#리모델링', '#역세권'],
        type: '분리형 원룸',
        address: '강남구 역삼동',
        size: '18.2m',
        floor: '2층',
        maintenance: '관리비 별도',
        options: [
          { icon: space, label: '강남구 역삼동 88-12' },
          { icon: animal, label: '애완동물 불가능' },
          { icon: what, label: '즉시 입주 가능' },
          { icon: sun, label: '동향(안방 주실 기준)' },
          { icon: animal, label: '애완동물 불가능' },
        ],
      },
      {
        id: 3,
        imageSrc: room1,
        tags: ['#넓은공간', '#공원근처'],
        type: '오픈형 원룸',
        address: '성동구 성수동',
        size: '25.0m',
        floor: '4층',
        maintenance: '관리비 없음',
        options: [
          { icon: space, label: '성동구 성수동 21-19' },
          { icon: animal, label: '애완동물 가능' },
          { icon: what, label: '즉시 입주 가능' },
          { icon: sun, label: '서향(안방 주실 기준)' },
          { icon: animal, label: '애완동물 가능' },
        ],
      },
    ];

    setHouse(mockHouses);
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full inline-flex items-center pt-8">
        <div className="w-full flex justify-start gap-1 ">
          <div className="float-left flex">
            <p>총 18개</p>
            {/* <p>총 {houses.length}개</p> */}
          </div>
        </div>
        <div className="float-right content-center">
          <h1>
            <img src={myapge_list} alt="myapge_list" />
          </h1>
        </div>
      </div>
      <HouseSection title="" houses={houses} />
    </div>
  );
};
