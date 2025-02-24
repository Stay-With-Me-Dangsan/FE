import { atom } from 'jotai';

const jwtAtom = atom<string | null>(null);

export const jwtStore = {
  jwtAtom,
  getJwt: atom((get) => get(jwtAtom)),
  setJwt: atom(null, (get, set, jwt: string | null) => {
    set(jwtAtom, jwt);
  }),
  clearJwt: atom(null, (get, set) => {
    set(jwtAtom, null);
  }),
};
