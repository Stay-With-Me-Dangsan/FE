import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') ?? null;
  }
  return null;
};

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

export interface User {
  userId: number | null;
}

export const userIdAtom = atomWithStorage<number | null>('userId', null);

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

export const clearUserAtom = atom(null, (get, set) => {
  localStorage.removeItem('userId');
  set(userIdStore, null);
});
