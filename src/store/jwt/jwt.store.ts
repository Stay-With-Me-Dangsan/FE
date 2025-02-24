import { atom } from 'jotai';

const jwtAtom = atom<string | null>(null);

export const jwtStore = {
  jwtAtom,
  getJwt: atom(
    (get) => get(jwtAtom),
    (get, set, newJwt: string | null) => set(jwtAtom, newJwt),
  ),
  setJwt: atom(null, (get, set, jwt: string | null) => {
    set(jwtAtom, jwt);
  }),
  clearJwt: atom(null, (get, set) => {
    set(jwtAtom, null);
  }),
};
