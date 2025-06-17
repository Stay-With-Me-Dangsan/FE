import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Community = () => {
  const { userId, district } = useParams();

  useEffect(() => {
    console.log('User ID:', userId);
    console.log('District:', district);
  }, [userId, district]);

  return (
    <div className="h-full p-4">
      <h1 className="text-xl font-bold mb-2">{district} 채팅방</h1>
      <p>유저: {userId}</p>
    </div>
  );
};
