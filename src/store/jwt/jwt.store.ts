import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export const decodeJwt = (accessToken: string | null | undefined) => {
  if (!accessToken) return null;
  try {
    const payloadBase64 = accessToken.split('.')[1];
    if (!payloadBase64) return null;
    const payload = JSON.parse(atob(payloadBase64));
    const userId = payload.sub ? parseInt(payload.sub, 10) : null; // userId 추출
    const isNewUser = payload.isNewUser ?? false;
    const role = payload.role ?? null;

    return userId !== null ? { userId, isNewUser, role } : null;
  } catch (error) {
    console.error('JWT 디코딩 오류:', error);
    return null;
  }
};

//accessToken을 관리하는 Atom (로컬 스토리지 자동 연동)
export const jwtAtom = atomWithStorage<string | null>('accessToken', null); //새로고침 시 Jotai 상태가 초기화되어 accessToken === null로 판단될 수 있음

export const jwtStore = atom(
  (get) => get(jwtAtom),
  (_get, set, newJwt: string | null) => {
    set(jwtAtom, newJwt);
  },
);

// accessToken 디코딩 atom
export const decodedTokenAtom = atom<{
  userId: number;
  isNewUser: boolean;
  role: string;
} | null>((get) => {
  const token = get(jwtAtom);
  return decodeJwt(token);
});

// userId 자동 추출
export const userIdAtom = atom<number | null>((get) => {
  const decoded = get(decodedTokenAtom);
  return decoded?.userId ?? null;
});
// role 자동 추출
export const roleAtom = atom<string | null>((get) => {
  const decoded = get(decodedTokenAtom);
  return decoded?.role ?? null;
});

export const clearJwtAtom = atom(null, (_get, set) => {
  set(jwtAtom, null);
});

export interface User {
  userId: number | null;
}
