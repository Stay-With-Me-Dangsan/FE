import { Maps, MapSearch } from './components';
import { useState } from 'react';

export const Map = () => {
  const [latitude, setLatitude] = useState<number>(37.55586671127581); //위도
  const [longitude, setLongitude] = useState<number>(126.97207997617642); //경도
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div className="h-full bg-green-50" style={{ border: '1px solid red' }}>
      <MapSearch />
      <Maps {...{ latitude, setLatitude, longitude, setLongitude }} />
    </div>
  );
};
