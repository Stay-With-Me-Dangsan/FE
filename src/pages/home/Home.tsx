import { useSetAtom } from 'jotai';
import { modalStore } from '../../store';
import axios from 'axios';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal); // 상태 변경 함수 사용

  return (
    <>
      <div className="h-[1520px] bg-amber-50">
        <p>홈</p>
        <button onClick={openModal}>Open Modal</button>

        <button
          onClick={() => {
            axios.post('http://localhost:8080/house/getDetail', {
              houseDetailId: 7,
            });
          }}
          style={{ border: '1px solid black' }}>
          CORS 오류 확인 버튼
        </button>
      </div>
    </>
  );
};
