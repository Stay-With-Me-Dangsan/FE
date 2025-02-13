import { useSetAtom } from 'jotai';
import { modalStore } from '../../store';
import { useState } from 'react';
import { useHouseGetMainQuery } from '../../hooks/house';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);

  const [number, setNumber] = useState<number | null>(null);

  const { data, isSuccess } = useHouseGetMainQuery(number);

  return (
    <>
      <div className="h-[1520px] bg-amber-50">
        <p>홈</p>
        <button onClick={openModal}>Open Modal</button>

        <div className="flex gap-2" style={{ border: '1px solid black', padding: '10px' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              onClick={() => setNumber(i + 1)}
              className="hover:bg-amber-300"
              style={{ border: '1px solid black', padding: '10px' }}>
              Set Number {i + 1}
            </button>
          ))}
          <button
            onClick={() => setNumber(null)}
            className="hover:bg-amber-300"
            style={{ border: '1px solid black', padding: '10px' }}>
            Set null
          </button>
        </div>

        <div>
          <p>number: {number}</p>

          {isSuccess ? (
            <div>
              <div className="flex gap-2">
                <p>houseMainId:</p>
                <p>{data.houseMainId}</p>
              </div>
              <div className="flex gap-2">
                <p>houseAddress:</p>
                <p>{data.houseAddress}</p>
              </div>
              <div className="flex gap-2">
                <p>houseName:</p>
                <p>{data.houseName}</p>
              </div>
              <div className="flex gap-2">
                <p>houseZonecode:</p>
                <p>{data.houseZonecode}</p>
              </div>
            </div>
          ) : (
            '로딩'
          )}
        </div>
      </div>
    </>
  );
};
