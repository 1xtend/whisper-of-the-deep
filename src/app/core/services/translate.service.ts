import { Language } from '../../shared/models/enums/language.enum.ts';
import { State } from '../utilities/state.ts';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum.ts';
import { Translations } from '../../shared/models/types/translations.type.ts';
import { LanguageLoader } from '../loaders/language.loader.ts';

export class TranslateService {
  private readonly languageState = new State<Language>(Language.EN);
  private _translations: Translations = {} as Translations;

  get language(): typeof this.languageState {
    return this.languageState;
  }

  get currentLanguage(): Language {
    return this.languageState.get();
  }

  get translations(): Translations {
    return this._translations;
  }

  constructor(private languageLoader: LanguageLoader) {
  }

  async setLanguage(language: Language) {
    if (!this.translations[language]) {
      this._translations[language] = await this.languageLoader.load(language);
    }

    if (language === this.languageState.get()) return;

    this.languageState.set(language);
    localStorage.setItem(LocalStorage.Language, language);
  }
}