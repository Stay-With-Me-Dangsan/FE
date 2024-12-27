import { atom } from 'jotai';

const isModalOpenAtom = atom(false);

export const modalStore = {
  isModalOpenAtom,
  openModal: atom(null, (get, set) => {
    set(isModalOpenAtom, true);
  }),
  closeModal: atom(null, (get, set) => {
    set(isModalOpenAtom, false);
  }),
};
