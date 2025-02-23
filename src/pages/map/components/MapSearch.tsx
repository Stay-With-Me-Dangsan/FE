import { MapSearchBar } from './MapSearchBar';
import { MapSearchFilter } from './MapSearchFilter';
import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

export const MapSearch = () => {
  const { isMobile } = useDeviceLayout();

  return (
    <div
      className={`${isMobile ? 'h-[120px] px-[28px] py-[10px]' : 'h-[190px] px-[40px] py-[28px]'} bg-white flex flex-col gap-2`}>
      <MapSearchBar />
      <MapSearchFilter />
    </div>
  );
};
