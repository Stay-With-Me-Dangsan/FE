import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';

interface IProps {
  latitude: number | null;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  longitude: number | null;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Maps = (props: IProps) => {
  const { longitude, setLongitude, latitude, setLatitude } = props;

  const [loading] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_APP_KEY as string });

  if (loading) {
    return <div>loading...</div>;
  }

  if (!latitude || !longitude) {
    return <div>위치 정보가 없습니다.</div>;
  }

  return (
    <div className="h-full">
      <Map className="w-full h-full" center={{ lat: latitude, lng: longitude }}></Map>;
    </div>
  );
};
