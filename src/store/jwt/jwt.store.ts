import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

const getAccessToken = () => (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);

const decodeJwt = (accessToken: string | null) => {
  if (!accessToken) return null;
  try {
    const payload = JSON.parse(atob(accessToken.split('.')[1])); // JWT payload 디코딩
    const userId = payload.sub ? parseInt(payload.sub, 10) : null; // userId 추출
    const isNewUser = payload.isNewUser ?? false;
    if (userId === null) return null;
    return { userId, isNewUser };
  } catch (error) {
    console.error('JWT 디코딩 오류:', error);
    return null;
  }
};

//accessToken을 관리하는 Atom
export const jwtAtom = atomWithStorage<string | null>('accessToken', getAccessToken());

// 디코딩된 user 정보 atom
export const decodedTokenAtom = atom<{ userId: number; isNewUser: boolean } | null>((get) => {
  const token = get(jwtAtom);
  return decodeJwt(token);
});

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

export interface User {
  userId: number | null;
}

// export const userIdAtom = atomWithStorage<number | null>('userId', null);

// // userId를 관리하는 Atom
// export const userIdStore = atom(
//   (get) => get(userIdAtom),
//   (get, set, newUserId: number | null) => {
//     if (newUserId) {
//       localStorage.setItem('userId', String(newUserId));
//     } else {
//       localStorage.removeItem('userId');
//     }
//     set(userIdAtom, newUserId);
//   },
// );

// export const clearUserAtom = atom(null, (get, set) => {
//   localStorage.removeItem('user');
//   set(userIdStore, null);
// });

// export const clearAuthAtom = atom(null, (get, set) => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('userId');
//   set(jwtAtom, null);
//   set(userIdAtom, null);
// });
