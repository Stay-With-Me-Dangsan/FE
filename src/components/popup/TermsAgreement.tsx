import { useState } from 'react';

export const TermsAgreement = () => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [allChecked, setAllChecked] = useState(false);
  const [terms, setTerms] = useState({
    age: false,
    termsOfUse: false,
    privacy: false,
    thirdParty: false,
    location: false,
  });

  const termsContent: Record<string, string> = {
    age: '본 서비스는 만 14세 이상만 이용 가능합니다. 사용자는 본 약관에 동의함으로써 만 14세 이상임을 확인합니다.',

    termsOfUse: `제1조 (목적)
        본 약관은 사용자가 당사에서 제공하는 서비스 이용과 관련하여 당사와 사용자 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.
      
        제2조 (서비스 이용)
        1. 사용자는 본 서비스를 개인적인 용도로만 사용할 수 있습니다.
        2. 사용자는 서비스 이용 중 관련 법령 및 본 약관을 준수해야 합니다.
      
        제3조 (이용 제한)
        당사는 다음과 같은 경우 사용자의 서비스 이용을 제한할 수 있습니다.
        1. 본 약관을 위반하는 경우
        2. 불법적인 활동을 수행하는 경우`,

    privacy: `제1조 (개인정보 수집 항목)
        당사는 회원가입 및 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.
        - 이름, 이메일 주소, 전화번호, 생년월일 등
      
        제2조 (개인정보 이용 목적)
        당사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.
        1. 회원 관리 및 서비스 제공
        2. 사용자 문의 응대 및 공지사항 전달
        3. 법적 의무 이행 및 분쟁 해결
      
        제3조 (개인정보 보관 기간)
        사용자의 개인정보는 회원 탈퇴 시 즉시 파기되며, 관련 법령에 따라 일정 기간 보관될 수 있습니다.`,

    thirdParty: `제1조 (개인정보 제3자 제공)
        당사는 원칙적으로 사용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 다음과 같은 경우에 한하여 개인정보를 제공할 수 있습니다.
        1. 사용자의 사전 동의가 있는 경우
        2. 법령에 따라 요구되는 경우
        3. 서비스 제공을 위해 필요한 경우 (예: 결제 처리)
      
        제2조 (제3자 제공 정보 및 목적)
        - 제공 대상: 결제 처리 업체, 배송 서비스 업체
        - 제공 항목: 이름, 연락처, 배송 주소 등
        - 제공 목적: 서비스 제공 및 결제 처리`,

    location: `제1조 (위치정보 이용 목적)
        본 서비스는 사용자에게 최적화된 서비스를 제공하기 위해 위치정보를 활용할 수 있습니다.
      
        제2조 (위치정보 제공 범위)
        사용자가 위치정보를 허용하는 경우, 해당 정보는 서비스 내 기능(예: 길찾기, 맞춤 추천 등)에 활용됩니다.
      
        제3조 (위치정보의 보호)
        1. 당사는 사용자의 동의 없이 위치정보를 제3자에게 제공하지 않습니다.
        2. 사용자는 서비스 내 설정을 통해 위치정보 제공 여부를 변경할 수 있습니다.`,
  };

  const handleIndividualChange = (key: keyof typeof terms) => {
    setTerms((prev) => {
      const updatedTerms = { ...prev, [key]: !prev[key] };
      const allSelected = Object.values(updatedTerms).every(Boolean);
      setAllChecked(allSelected);
      return updatedTerms;
    });
  };

  const handleAllChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setTerms({
      age: newCheckedState,
      termsOfUse: newCheckedState,
      privacy: newCheckedState,
      thirdParty: newCheckedState,
      location: newCheckedState,
    });
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg p-4 space-y-3">
        <div
          className={`flex items-center p-2 border rounded-md cursor-pointer transition-colors ${allChecked ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
          onClick={handleAllChange}>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAllChange}
            className="mr-2 w-5 h-5 accent-purple-500 cursor-pointer"
          />
          <span className="text-sm font-semibold">전체 동의</span>
        </div>
        {[
          { key: 'age', label: '만 14세 이상입니다.' },
          { key: 'termsOfUse', label: '이용약관 동의' },
          { key: 'privacy', label: '개인정보수집 및 이용동의' },
          { key: 'thirdParty', label: '개인정보 제 3자 제공 및 동의' },
          { key: 'location', label: '위치정보이용약관 동의' },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={terms[key as keyof typeof terms]}
                onChange={() => handleIndividualChange(key as keyof typeof terms)}
                className="mr-2 w-5 h-5 accent-purple-500 cursor-pointer"
              />
              <span className="text-sm">
                <span className="text-purple-500 font-semibold">[필수]</span> {label}
              </span>
            </div>
            <button onClick={() => setSelectedTerm(key)} className="text-blue-500 underline ml-2 text-sm">
              [약관 보기]
            </button>
          </div>
        ))}
      </div>
      {selectedTerm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-96 max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold">약관 내용</h2>
            <p className="mt-3">{termsContent[selectedTerm]}</p>
            <button onClick={() => setSelectedTerm(null)} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded">
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};
