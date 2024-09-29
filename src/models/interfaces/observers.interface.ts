import { Language } from '../enums/language.enum.ts';

export interface LanguageObserver {
  updateLanguage(language: Language): void
}