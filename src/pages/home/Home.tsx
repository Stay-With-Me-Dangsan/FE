import { useSetAtom } from 'jotai';
import { modalStore } from '../../store';
import { useEffect, useRef, useState } from 'react';
import { useHouseGetMainQuery } from '../../hooks/house';
import dayjs from 'dayjs';

const message = [
  { id: 1, text: 'one', isMind: true, createdAt: '2021-10-01 10:20:33' },
  { id: 2, text: 'two', isMind: false, createdAt: '2021-10-01 10:21:33' },
  { id: 3, text: 'three', isMind: true, createdAt: '2021-10-01 10:22:33' },
  { id: 4, text: 'four', isMind: false, createdAt: '2021-10-02 13:22:33' },
  { id: 5, text: 'five', isMind: false, createdAt: '2021-10-02 19:22:33' },
  { id: 6, text: 'six', isMind: false, createdAt: '2021-10-06 04:22:33' },
  { id: 7, text: 'seven', isMind: false, createdAt: '2021-10-06 11:22:33' },
  { id: 8, text: 'eight', isMind: true, createdAt: '2021-10-10 23:22:33' },
];

const cctvUrl = "wss://cctv.example.com'";

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);

  const ws = useRef<WebSocket | null>(null);

  const [number, setNumber] = useState<number | null>(null);

  const { data, isSuccess } = useHouseGetMainQuery(number);

  useEffect(() => {
    ws.current = new WebSocket(cctvUrl);

    ws.current.onmessage = (event) => {
      if (event.data) {
        console.log('event.data', event.data);
      }
    };

    ws.current.onerror = () => {
      console.log('WebSocket Error');
    };

    ws.current.onclose = () => {
      console.log('Websocket connection is closed');
    };

    return () => {
      if (ws.current && ws.current.readyState === 1) {
        ws.current.close();
      }
    };
  }, []);

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

        <div style={{ border: '1px solid black' }}>
          {message.map((item) => (
            <div key={item.id} className={`p-2 flex ${item.isMind ? 'justify-end' : 'justify-start'}`}>
              <div className="flex gap-2">
                <p>{dayjs(item.createdAt).format('HH:mm:ss')}</p>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
