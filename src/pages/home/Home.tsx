import { useSetAtom } from 'jotai';
import { modalStore } from '../../store';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal); // 상태 변경 함수 사용

  return (
    <>
      <div className="h-[1520px] bg-amber-50">
        <p>홈</p>
        <button onClick={openModal}>Open Modal</button>
      </div>
    </>
  );
};
