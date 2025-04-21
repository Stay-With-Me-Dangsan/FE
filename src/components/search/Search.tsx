import { useState } from 'react';
import search from '../../asset/images/search.png';

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    console.log('검색어:', keyword); // TODO: 실제 검색 로직 연결
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* 🔍 검색 아이콘 */}
      <img
        src={search} // 아이콘 경로 수정 (예: public 폴더에 넣기)
        alt="검색"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* 검색창 */}
      {open && (
        <input
          type="text"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          className="border px-2 py-1 rounded-md text-sm focus:outline-none w-40"
        />
      )}
    </div>
  );
};
