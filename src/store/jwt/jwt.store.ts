import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

const getAccessToken = () => (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);

export const jwtAtom = atomWithStorage<string | null>('accessToken', getAccessToken());

export const jwtStore = atom(
  (get) => get(jwtAtom),
  (get, set, newJwt: string | null) => {
    if (newJwt) {
      localStorage.setItem('accessToken', newJwt);
    } else {
      localStorage.removeItem('accessToken');
    }
    set(jwtAtom, newJwt);
  },
);

export const clearJwtAtom = atom(null, (get, set) => {
  localStorage.removeItem('accessToken');
  set(jwtAtom, null);
});

// ✅ 유저 정보 타입
export interface User {
  userId: number | null;
}

export const userIdAtom = atomWithStorage<number | null>('userId', null);

// ✅ 유저 정보 관리 Atom
export const userIdStore = atom(
  (get) => get(userIdAtom),
  (get, set, newUserId: number | null) => {
    if (newUserId !== null) {
      localStorage.setItem('userId', String(newUserId));
    } else {
      localStorage.removeItem('userId');
    }
    set(userIdAtom, newUserId);
  },
);

// ✅ 유저 정보 제거 함수 (로그아웃 시 사용)
export const clearUserAtom = atom(null, (get, set) => {
  localStorage.removeItem('user');
  set(userIdStore, null);
});
