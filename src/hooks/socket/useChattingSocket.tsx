import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const useChattingSocket = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!roomId) {
      setSocket(null);
      return;
    }

    const socketInstance = io(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/ws/chat?roomId=${roomId}`,
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  console.log('socket', socket);

  return { socket, setRoomId };
};
