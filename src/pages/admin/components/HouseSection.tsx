import { HouseItem } from './HouseItem';
import { IHouse } from '../../../types/interface/house/house.model';

interface IHouseSectionProps {
  title: string;
  houses: IHouse[];
}

export const HouseSection = ({ title, houses }: IHouseSectionProps) => {
  return (
    <div className="w-full mt-10">
      <p className="text-2xl font-bold mb-4">{title}</p>
      {houses.map((house) => (
        <HouseItem key={house.id} house={house} />
      ))}
    </div>
  );
};
