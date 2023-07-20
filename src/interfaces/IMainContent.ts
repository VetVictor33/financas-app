export interface IMainContent {
  'home': string;
  'table': string;
  'chart': string
}

export type MainContentType = keyof IMainContent;