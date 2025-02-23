import { useState } from 'react';
import { Button } from '../../../components/button';
import { useNavigate } from 'react-router-dom';

export const MapList = () => {
  const navigate = useNavigate();

  const [isFolding, setIsFolding] = useState(false);

  const onClickDetailHandler = () => {
    navigate('/map/detail/100');
  };

  return (
    <div className={`${isFolding ? 'h-2/3' : 'h-1/4'} absolute bottom-0 w-full bg-white z-50`}>
      <div className="flex justify-center">
        <button className="w-[40px] h-[40px] bg-[#F0F0F0] rounded-[8px]" onClick={() => setIsFolding((prev) => !prev)}>
          {isFolding ? '접기' : '열기'}
        </button>
      </div>

      <div>
        <Button text="상세" onClick={onClickDetailHandler} />
      </div>

      <div className="overflow-y-auto">
        <div className="h-[100px] bg-red-50">list</div>
      </div>
    </div>
  );
};
