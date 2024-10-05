import { Language } from '../enums/language.enum.ts';

export type Translations = {
  [language in Language]: {
    [key: string]: any
  };
}