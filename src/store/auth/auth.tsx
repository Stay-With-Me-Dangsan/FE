import { atom } from 'jotai';
// 로그인 상태
export const isLoggedInAtom = atom<boolean>(false); // 로그인 여부 상태

// 로그인한 유저 정보
export const userAtom = atom<{
  userId: number | null;
  email: string | null;
  nickname: string | null;
  password: string | null;
}>({
  userId: null,
  email: null,
  nickname: null,
  password: null,
});

export const accessTokenAtom = atom<string | null>(null);
