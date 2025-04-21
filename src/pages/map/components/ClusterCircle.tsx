import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface ClusterCircleProps {
  lat: number;
  lng: number;
  count?: number;
  onClick?: () => void;
}

const ClusterCircle = ({ lat, lng, count, onClick }: ClusterCircleProps) => {
  return (
    <CustomOverlayMap position={{ lat, lng }} clickable={true}>
      <div
        onClick={() => {
          if (onClick) onClick();
        }}
        style={{ zIndex: 9999 }}
        className="w-20 h-20 bg-blue-400 rounded-full text-white font-bold flex items-center justify-center cursor-pointer shadow-md">
        {count}
      </div>
    </CustomOverlayMap>
  );
};

export default ClusterCircle;

// import { CustomOverlayMap } from 'react-kakao-maps-sdk';

// interface ClusterCircleProps {
//   lat: number;
//   lng: number;
//   count?: number;
//   onClick?: () => void;
//   zoomLevel?: number; // 선택적으로 줌레벨도 받아서 반응형 적용 가능
// }

// const ClusterCircle = ({ lat, lng, count = 0, onClick, zoomLevel }: ClusterCircleProps) => {
//   // count에 따라 배경색 및 크기 조절
//   let sizeClass = 'w-16 h-16'; // 기본 사이즈 (64px)
//   let bgClass = 'bg-blue-400';

//   if (count >= 50 && count < 100) {
//     sizeClass = 'w-20 h-20'; // 80px
//     bgClass = 'bg-purple-500';
//   } else if (count >= 100) {
//     sizeClass = 'w-24 h-24'; // 96px
//     bgClass = 'bg-red-500';
//   }

//   return (
//     <CustomOverlayMap position={{ lat, lng }} clickable={true}>
//       <div
//         onClick={onClick}
//         style={{ zIndex: 9999 }}
//         className={`rounded-full text-white font-bold flex items-center justify-center cursor-pointer shadow-md ${sizeClass} ${bgClass}`}
//       >
//         {count > 99 ? '99+' : count}
//       </div>
//     </CustomOverlayMap>
//   );
// };

// export default ClusterCircle;
