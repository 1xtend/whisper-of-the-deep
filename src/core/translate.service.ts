import { Language } from '../models/enums/language.enum.ts';
import { LanguageObserver } from '../models/interfaces/observers.interface.ts';
import { LocalStorage } from '../models/enums/local-storage.enum.ts';

type Translations = {
  [language in Language]: {
    [key: string]: string
  };
}

export class TranslateService {
  private currentLanguage: Language = Language.EN;
  private translations: Translations = {} as Translations;
  private observers: LanguageObserver[] = [];

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  async loadTranslations(language: Language): Promise<void> {
    const response = await fetch(`src/assets/languages/${ language }.json`);
    this.translations[language] = await response.json();
  }

  async setLanguage(language: Language): Promise<void> {
    if (!this.translations[language]) {
      await this.loadTranslations(language);
    }

    this.currentLanguage = language;
    localStorage.setItem(LocalStorage.Language, language);
    this.notifyObservers();
  }

  private notifyObservers() {
    this.observers.forEach((observer) => observer.updateLanguage(this.currentLanguage));
  }

  translate(key: string) {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  subscribe(observer: LanguageObserver) {
    this.observers.push(observer);
  }
}