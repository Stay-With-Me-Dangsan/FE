import { useState } from 'react';
import { Input } from '../../components/input';
import { Checkbox } from '../../components/checkbox';
import { useSetAtom, useAtomValue } from 'jotai';
import { modalStore } from '../../store/modal';
import { Modal } from '../../components/modal';
import { CommonCodeModal } from '../../components/modal/CommonCodeModal';
import useCodeMutation from '../../hooks/admin/mutation/useCodeMutation';
import { Alert } from '../../components/popup';
import { useCodeQuery } from '../../hooks/admin/query/useCodeQuery';
import { IGetCodeDto, ICreateCodeDto, IPatchCodeDto, CommonCode } from '../../types/dto/admin';

export const AdminCode = () => {
  const { data: codes = [], refetch } = useCodeQuery();
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const openModal = useSetAtom(modalStore.openModal);
  const closeModal = useSetAtom(modalStore.closeModal);
  const isModalOpen = useAtomValue(modalStore.isModalOpenAtom);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedCodeId, setSelectedCodeId] = useState<number | null>(null);
  const [groupId, setGroupId] = useState('');
  const [codeKey, setCodeKey] = useState('');
  const [name, setName] = useState('');
  const [descript, setDescript] = useState('');
  const { onGetCodeMutation, onCreateCodeMutation, onpatchCodeMutation, onDelteCodeMutation } = useCodeMutation();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(codes.map((code: CommonCode) => code.commonCodeId));
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };
  const handleConfirm = (data: IPatchCodeDto) => {
    if (!groupId || !name || !codeKey || !descript) {
      showAlert('모든 항목을 입력해주세요.');
      return;
    }
    const newData = { groupId, codeKey, name, descript };

    if (selectedCodeId === null) {
      onCreateCodeMutation.mutate(newData as ICreateCodeDto, {
        onSuccess: () => {
          showAlert('데이터가 추가되었습니다.');
          closeModal();
          refetch();
        },
        onError: (error) => {
          showAlert('데이터 추가 실패');
          console.error('공통코드 추가 실패:', error);
        },
      });
    } else {
      onpatchCodeMutation.mutate(newData as IPatchCodeDto, {
        onSuccess: () => {
          showAlert('데이터가 수정되었습니다.');
          closeModal();
          refetch();
        },
        onError: (error) => {
          showAlert('데이터 수정 실패');
          console.error('공통코드 수정 실패:', error);
        },
      });
    }
  };

  const handleDelete = () => {
    const selectedItems = codes.filter((code: CommonCode) => selectedIds.includes(code.commonCodeId));
    console.log('selectedItems : ' + selectedItems);
    if (selectedItems.length === 0) {
      showAlert('삭제할 항목을 선택해주세요.');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedIds.length === 0) {
      showAlert('삭제할 항목을 선택해주세요.');
      return;
    }

    selectedIds.forEach((id) => {
      onDelteCodeMutation.mutate(id, {
        onSuccess: () => {
          refetch();
          showAlert('삭제 완료');
        },
        onError: (error) => {
          showAlert('삭제 실패');
          console.error('삭제 실패:', error);
        },
      });
    });
    setSelectedIds([]);
    setIsDeleteModalOpen(false);
  };

  // const filteredCodes = codes.filter(
  //   (code: CommonCode) => code.name.includes(search) || code.description.includes(search),
  // );

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-purple-600 font-bold text-lg mb-4">공통코드 추가 및 편집</h2>

      {/* 상단 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setSelectedCodeId(null);
            setGroupId('');
            setCodeKey('');
            setName('');
            setDescript('');
            openModal();
          }}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          + 추가
        </button>
        <button onClick={handleDelete} className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">
          삭제
        </button>
        <button
          onClick={toggleSelectAll}
          className="px-4 py-2 text-purple-500 border border-purple-300 rounded hover:bg-purple-50">
          {selectAll ? '전체 선택 취소' : '전체 선택'}
        </button>
      </div>

      {/* 검색 */}
      <div className="mb-4">
        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 조회" />
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">선택</th>
              <th className="p-2 border">No</th>
              <th className="p-2 border">공통코드 그룹</th>
              <th className="p-2 border">공통코드 명</th>
              <th className="p-2 border">공통코드 키</th>
              <th className="p-2 border">공통코드 설명</th>
            </tr>
          </thead>
          <tbody>
            {/* <tbody>
  {codes.map((code, idx) => (
    <tr key={code.id}>
      <td>{idx + 1}</td>
      <td>{code.group}</td>
      <td>{code.name}</td>
      ...
    </tr>
  ))}
</tbody> */}

            {codes.map((code: CommonCode, idx: number) => (
              <tr
                key={code.commonCodeId}
                className={`text-center transition-colors ${
                  selectedIds.includes(code.commonCodeId) ? 'bg-blue-100' : 'hover:bg-blue-50'
                } cursor-pointer`}
                onDoubleClick={() => {
                  setSelectedIds([code.commonCodeId]);
                  setSelectedCodeId(code.commonCodeId);
                  setGroupId(code.commonCodeGroupId);
                  setName(code.commonCodeName);
                  setCodeKey(code.commonCodeKey);
                  setDescript(code.commonCodeDescription);

                  openModal();
                }}>
                <td className="p-2 border">
                  <Checkbox
                    checked={selectedIds.includes(code.commonCodeId)}
                    onChange={() => toggleCheckbox(code.commonCodeId)}
                  />
                </td>
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{code.commonCodeId}</td>
                <td className="p-2 border">{code.commonCodeName}</td>
                <td className="p-2 border">{code.commonCodeKey}</td>
                <td className="p-2 border">{code.commonCodeDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="공통코드 추가 및 수정"
          onConfirm={() => {
            handleConfirm({
              groupId,
              codeKey,
              name,
              descript,
            });
          }}
          onCancel={closeModal}>
          <CommonCodeModal
            group={groupId}
            name={name}
            codeKey={codeKey}
            description={descript}
            onChange={(field: any, value: any) => {
              if (field === 'groupId') setGroupId(value);
              if (field === 'name') setName(value);
              if (field === 'codeKey') setCodeKey(value);
              if (field === 'descript') setDescript(value);
            }}
            onConfirm={() =>
              handleConfirm({
                groupId,
                codeKey,
                name,
                descript,
              })
            }
            onCancel={closeModal}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal title="삭제 확인" onConfirm={confirmDelete} onCancel={() => setIsDeleteModalOpen(false)}>
          <div className="text-center text-lg py-4">정말 삭제하시겠습니까?</div>
        </Modal>
      )}
    </div>
  );
};
