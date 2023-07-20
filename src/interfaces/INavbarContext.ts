import { MainContentType } from 'interfaces/IMainContent';
import { Dispatch, SetStateAction } from 'react';

export interface INavbarContext {
  mainContent: MainContentType;
  setMainContent: Dispatch<SetStateAction<MainContentType>>;
}