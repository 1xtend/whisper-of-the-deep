import { Language } from '../../shared/models/enums/language.enum.ts';

interface Translations {
  [key: string]: any;
}

export class LanguageLoader {
  async load(language: Language): Promise<Translations> {
    const response = await fetch(`src/assets/i18n/${ language }.json`);
    return await response.json();
  }
}