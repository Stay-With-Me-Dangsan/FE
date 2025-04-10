import { Input } from '../../components/input';
import { ICommonCodeModalProps } from './interface/index';

export const CommonCodeModal = ({
  group,
  name,
  codeKey,
  description,
  onChange,
  onConfirm,
  onCancel,
}: ICommonCodeModalProps) => {
  return (
    <div className="bg-white p-6 w-full">
      <div className="flex flex-col gap-4 pb-6">
        {/* 필드 한 줄씩 */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-md font-medium font-bold ">공통코드 그룹</label>
          <Input
            type="text"
            value={group}
            onChange={(e) => onChange('group', e.target.value)}
            placeholder="예: SPTYP"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-md font-medium font-bold ">공통코드 명</label>
          <Input type="text" value={name} onChange={(e) => onChange('name', e.target.value)} placeholder="예: 1인실" />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-md font-medium font-bold ">공통코드 키</label>
          <Input
            type="text"
            value={codeKey}
            onChange={(e) => onChange('codeKey', e.target.value)}
            placeholder="예: SINGLE_ROOM"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-md font-medium font-bold">공통코드 설명</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="예: 1인실에 대한 설명"
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-4 mt-6">
        <button
          className="w-1/2 bg-purple-500 text-white text-xl px-6 py-5 rounded-lg hover:bg-purple-600"
          onClick={onConfirm}>
          저장
        </button>
        <button
          className="w-1/2 bg-gray-300 text-white text-xl px-6 py-5 rounded-lg hover:bg-gray-400"
          onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};
