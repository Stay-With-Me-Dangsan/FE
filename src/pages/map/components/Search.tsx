import { SearchBar } from './SearchBar';
import { SearchFilter } from './SearchFilter';

export const Search = () => {
  return (
    <div className="h-[190px] bg-white px-[40px] py-[28px]">
      <SearchBar />
      <SearchFilter />
    </div>
  );
};
