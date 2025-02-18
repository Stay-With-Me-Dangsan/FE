import { SearchBar } from './SearchBar';
import { SearchFilter } from './SearchFilter';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

export const Search = () => {
  const { width } = useDeviceLayout();

  return (
    <div
      className={`${width < 768 ? 'h-[120px] px-[28px] py-[10px]' : 'h-[190px] px-[40px] py-[28px]'} bg-white flex flex-col gap-2`}>
      <SearchBar />
      <SearchFilter />
    </div>
  );
};
