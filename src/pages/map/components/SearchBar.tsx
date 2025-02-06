import { Input } from '../../../components/input';

export const SearchBar = () => {
  return (
    <>
      <Input
        type="text"
        value=""
        onChange={(e) => {}}
        borderColor="purple"
        placeholder="주소 검색으로 쉐어하우스를 알아봐요!"
      />
    </>
  );
};
