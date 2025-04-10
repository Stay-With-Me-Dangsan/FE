import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

interface MapAddressSearchProps {
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;
  mapRef: React.RefObject<kakao.maps.Map>;
}

interface Suggestion {
  address_name: string;
}

const MapAddressSearch = ({ setLatitude, setLongitude, mapRef }: MapAddressSearchProps) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_APP_KEY as string });
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const geocoder = useMemo(() => {
    if (loading && window.kakao?.maps?.services) {
      return new window.kakao.maps.services.Geocoder();
    }
    return null;
  }, [loading]);

  // 자동완성 요청
  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
        params: { query },
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
        },
      });

      const docs = response.data.documents;
      if (docs.length > 0) {
        setSuggestions(docs);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (err) {
      console.error('자동완성 오류:', err);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 300), []);

  useEffect(() => {
    setSelectedIndex(-1); // 새로운 검색어 입력하면 초기화

    if (address.trim()) {
      debouncedFetch(address);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [address]);

  const handleSelect = async (selectedAddress: string) => {
    try {
      // 1 상세 주소 검색
      const addressRes = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
        params: { query: selectedAddress },
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
        },
      });

      let lat: number | null = null;
      let lng: number | null = null;

      if (addressRes.data.documents.length > 0) {
        const result = addressRes.data.documents[0];
        lat = parseFloat(result.y);
        lng = parseFloat(result.x);
      } else {
        // 2 주소 검색 실패 시 → 키워드 장소 검색
        const keywordRes = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
          params: { query: selectedAddress },
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
          },
        });

        if (keywordRes.data.documents.length > 0) {
          const result = keywordRes.data.documents[0];
          lat = parseFloat(result.y);
          lng = parseFloat(result.x);
        }
      }

      // 3️⃣ 좌표가 있다면 지도 이동
      if (lat !== null && lng !== null) {
        setLatitude(lat);
        setLongitude(lng);
        mapRef.current?.setCenter(new window.kakao.maps.LatLng(lat, lng));

        setAddress(selectedAddress);
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        alert('해당 지역의 위치를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소 또는 장소 검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex].address_name);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0].address_name);
      }
    }
  };

  return (
    <div className="relative w-full z-50">
      <input
        type="text"
        className="w-full border rounded px-4 py-2"
        placeholder="주소 검색으로 쉐어하우스를 알아봐요!"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-100 
                ${selectedIndex === idx ? 'bg-purple-100 font-bold' : ''}`}
              onClick={() => handleSelect(item.address_name)}
              onMouseEnter={() => setSelectedIndex(idx)} // 마우스 hover 시 index 반영
            >
              <span className="font-semibold text-purple-600">{item.address_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapAddressSearch;
