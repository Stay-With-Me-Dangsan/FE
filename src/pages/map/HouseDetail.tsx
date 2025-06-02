import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const HouseDetail = () => {
  const params = useParams();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const { id } = params;

    if (id) {
      setId(id);
    }
  }, []);

  return <>디테일 번호: {id}</>;
};
