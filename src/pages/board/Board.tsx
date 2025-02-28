import { useNavigate } from 'react-router-dom';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { BoardButton } from '../../asset/svg';

export const Board = () => {
  const navigate = useNavigate();

  const { isMobile } = useDeviceLayout();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    navigate('/board/detail');
  };

  return (
    <div className="">
      게시판
      <div className={`${isMobile ? 'bottom-24' : 'bottom-36'} absolute right-10`}>
        <BoardButton color="#9470DC" onClick={onClickHandler} />
      </div>
    </div>
  );
};
