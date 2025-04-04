import { useEffect, useState, useCallback } from 'react';
import { decodeJwt } from '../../store/jwt';

export const useChattingSocket = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messageList, setMessageList] = useState<String[]>([]);
  const token = localStorage.getItem('accessToken');
  const decoded = decodeJwt(token);
  const userId = String(decoded?.userId ?? '');

  useEffect(() => {
    if (!roomId) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      return;
    }

    if (socket) {
      console.log('기존 websocket 닫는중!');
      socket.close();
    }
    const socketInstance = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws/chat?roomId=${roomId}`);

    socketInstance.onopen = () => {
      console.log('websocket 연결 완료');
    };

    socketInstance.onmessage = (event) => {
      console.log('메시지 수신:', event.data);
      setMessageList((prev) => [...prev, event.data]);
    };

    socketInstance.onclose = (e) => {
      console.log('websocket 연결 종료 : ', e.code, e.reason);
    };

    socketInstance.onerror = (error) => {
      console.log('websocket 에러 발생 : ', error);
    };

    setSocket(socketInstance);

    return () => {
      console.log('websocket 연결 종료 요청');
      socketInstance.close();
    };
  }, [roomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ msg: message, userId: userId }));
        console.log('메시지 전송:', message);
      } else {
        console.warn('WebSocket이 열려있지 않아 메시지를 보낼 수 없음');
      }
    },
    [socket],
  );

  return { socket, setRoomId, sendMessage, messageList };
};
