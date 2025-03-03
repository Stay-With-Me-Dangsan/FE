import { useEffect, useState } from 'react';

export const useChattingSocket = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) {
      setSocket(null);
      return;
    }

    console.log('1.',process.env.REACT_APP_SOCKET_URL);
    console.log('2.',process.env.REACT_APP_API_PORT);

    const socketInstance = new WebSocket(
        `${process.env.REACT_APP_SOCKET_URL}:${process.env.REACT_APP_API_PORT}/ws/chat?roomId=${roomId}`,
    );

    socketInstance.onopen = () => {
      console.log('web socket 연결 완료');
    };

    setSocket(socketInstance);

    return () => {
      console.log('web socket 연결 종료');
      socketInstance.close();
    };
  }, [roomId]);

  return { socket, setRoomId };
};
