import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Search } from '../../components/search';
import { Text } from '../../components/text';
import BackIcon from '../../asset/images/back.png';
import { Button } from '../..//components/button';

export const Header = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const pathSegments = pathname.split('/').filter(Boolean); // ['', 'mypage', 'house', 'view'] -> ['mypage', 'house', 'view']
  const [depth_1, depth_2, depth_3, depth_4] = pathSegments;

  const subPageMap: Record<string, Record<string, string>> = {
    house: {
      upload: '내가 올린 집',
      view: '최근 본 집',
      bookmark: '내가 좋아요 한 집',
    },
    board: {
      write: '내가 올린 글',
      comment: '내가 작성한 댓글',
      bookmark: '내가 찜한 글',
    },
  };
  let title = '홈';
  let showBackButton = false;
  let textColor: 'purple' | 'gray' | 'black' = 'purple';
  let centerTitle = false;

  if (depth_1 === 'mypage') {
    if (depth_2 && depth_3 && subPageMap[depth_2]?.[depth_3]) {
      title = subPageMap[depth_2][depth_3];
      showBackButton = true;
      textColor = 'black';
      centerTitle = true;
    } else if (depth_2 === 'edit') {
      showBackButton = true;
      title = '';
      centerTitle = true;
    } else if (depth_4 === 'edit') {
      showBackButton = true;
      title = '편집';
      centerTitle = true;
    } else {
      title = '마이페이지';
    }
  } else if (depth_1 === 'admin') {
    if (depth_2 && depth_3 && subPageMap[depth_2]?.[depth_3]) {
      title = subPageMap[depth_2][depth_3];
      showBackButton = true;
      textColor = 'purple';
      centerTitle = true;
    } else if (depth_2 === 'user') {
      showBackButton = true;
      title = '유저 리스트';
      centerTitle = true;
    } else if (depth_2 === 'black') {
      showBackButton = true;
      title = '블랙 리스트';
      centerTitle = true;
    } else if (depth_2 === 'code') {
      showBackButton = true;
      title = '공통코드 관리';
      centerTitle = true;
    } else if (depth_2 === 'board') {
      showBackButton = true;
      title = '전체 게시글 리스트';
      centerTitle = true;
    } else if (depth_4 === 'edit') {
      showBackButton = true;
      title = '편집';
      centerTitle = true;
    } else {
      title = '마이페이지';
    }
  } else if (depth_1 === 'board' && depth_2 === 'detail') {
    showBackButton = true;
    title = '';
    centerTitle = true;
  } else if (depth_1 === 'house' && depth_2 === 'detail') {
    showBackButton = true;
    title = '';
    centerTitle = true;
  } else {
    switch (depth_1) {
      case 'home':
        title = '홈';
        break;
      case 'map':
        title = '지도';
        break;
      case 'board':
        title = '게시판';
        break;
    }
  }

  return (
    <div className="header flex items-center relative h-12 border-b">
      {/* 왼쪽 영역 */}
      <div className="w-1/3 flex items-center justify-start">
        {showBackButton && (
          <Button
            id="back"
            onClick={() => navigate(-1)}
            icon={<img src={BackIcon} alt="뒤로가기" className="w-5 h-5" />}
            className="w-auto px-2"
          />
        )}
        {!centerTitle && <Text value={title} color={textColor} size="large" className="ml-2 w-full" />}
      </div>

      {/* 중앙 영역 */}
      {centerTitle && (
        <div className="flex justify-center items-center w-2/3 text-center font-bold">
          <Text value={title} color={textColor} size="large" />
        </div>
      )}

      {/* 오른쪽 영역  */}
      <div className="flex items-center justify-end w-1/3">
        {depth_4 === 'edit' && (
          <button className="text-sm text-purple-500" onClick={() => alert('선택해제')}>
            선택해제
          </button>
        )}
      </div>

      <div className="flex items-center justify-end w-1/3">{depth_4 === 'list' && <Search />}</div>
    </div>
  );
};
