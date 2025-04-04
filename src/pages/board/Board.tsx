import { useNavigate } from 'react-router-dom';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';
import { BoardRegisterButton } from '../../asset/svg';

export const Board = () => {
  const navigate = useNavigate();

  const { isMobile } = useDeviceLayout();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    navigate('/board/detail');
  };

  return (
    <div>
      게시판
      <div className={`${isMobile ? 'bottom-24' : 'bottom-36'} absolute right-4`}>
        <BoardRegisterButton color="#9470DC" onClick={onClickHandler} />
      </div>
    </div>
  );
};
