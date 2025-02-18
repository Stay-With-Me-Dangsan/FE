import { Maps, Search } from './components';
import { useEffect, useState } from 'react';

export const Map = () => {
  const [latitude, setLatitude] = useState<number | null>(37.553836); //위도
  const [longitude, setLongitude] = useState<number | null>(126.969652); //경도

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <div className="h-[9000px] bg-green-50">
      <Search />
      <Maps {...{ latitude, setLatitude, longitude, setLongitude }} />
    </div>
  );
};
