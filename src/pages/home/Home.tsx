import { useSetAtom } from 'jotai';
import { modalStore } from '../../store';
import { useState } from 'react';
import { useChattingSocket } from '../../hooks/socket';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);
  const [message, setMessage] = useState('');
  const { setRoomId, sendMessage, messageList } = useChattingSocket();

  const onRoomClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const { id } = event.currentTarget;
    setRoomId(id === 'none' ? null : id);
  };

  return (
    <div className="flex flex-col gap-10">
      <button onClick={openModal}>Open Modal</button>

      <div className="flex flex-col gap-4">
        <h1>채팅</h1>

        <div className="flex items-center gap-6">
          <p>방 리스트:</p>
          <div className="p-2 border-2 border-active-bg" id="none" onClick={onRoomClickHandler}>
            종료
          </div>
          <div className="p-2 border-2 border-active-bg" id="GA" onClick={onRoomClickHandler}>
            GA
          </div>
          <div className="p-2 border-2 border-active-bg" id="AB" onClick={onRoomClickHandler}>
            AB
          </div>
        </div>

        <div className="border-2 border-black min-h-32">
          {messageList.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input className="border-black" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => sendMessage(message)}>전송</button>
      </div>
    </div>
  );
};
