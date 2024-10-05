import { Language } from '../../shared/models/enums/language.enum.ts';

interface Translations {
  [key: string]: any;
}

export class LanguageLoader {
  async load(language: Language): Promise<Translations> {
    const path = `src/assets/i18n/${ language }.json`;

    try {
      const response = await fetch(path);
      return await response.json();
    } catch {
      throw new Error(`Failed to load language from "${ path }"`);
    }
  }
}