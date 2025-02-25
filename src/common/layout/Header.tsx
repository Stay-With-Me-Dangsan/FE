import { useLocation, useParams } from 'react-router-dom';
import { Text } from '../../components/text';

export const Header = () => {
  const params = useParams();
  const location = useLocation();

  const pathName = () => {
    const { pathname } = location;

    const depth_1 = pathname.split('/')[1];

    switch (depth_1) {
      case 'home':
        return '홈';
      case 'map':
        return '지도';
      case 'board':
        return '게시판';
      case 'mypage':
        return '마이페이지';
      default:
        return '홈';
    }
  };

  return (
    <div className="header">
      <Text value={pathName()} color="gray" size="large" />
    </div>
  );
};
