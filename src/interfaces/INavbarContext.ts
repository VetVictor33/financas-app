import { Dispatch, SetStateAction } from 'react';

export interface INavbarContext {
  mainContentIndex: number;
  setMainContentIndex: Dispatch<SetStateAction<number>>;
}