import './style.scss';
import { Component } from './app/core/utilities/component.ts';
import { TranslateService } from './app/core/services/translate.service.ts';
import { Language } from './app/shared/models/enums/language.enum.ts';
import { LanguageSwitchComponent } from './app/shared/components/language-switch/language-switch.component.ts';
import { LocalStorage } from './app/shared/models/enums/local-storage.enum.ts';
import { findElements } from './app/shared/helpers/find-elements.ts';
import { LanguageLoader } from './app/core/loaders/language.loader.ts';

const languageLoader = new LanguageLoader();

class App extends Component {
  private readonly translateService = new TranslateService(languageLoader);

  constructor() {
    super('app');
    this.initialize();
  }

  private async initialize(): Promise<void> {
    const savedLanguage = localStorage.getItem(LocalStorage.Language) as Language | null;
    const language = savedLanguage || Language.EN;
    await this.translateService.setLanguage(language);
    this.render();
    this.languageChanges();
  }

  languageChanges() {
    this.translateService.language.subscribe(() => {
      this.updateTranslations();
    });
  }

  private updateTranslations(): void {
    const elements = findElements('translate');
    if (!elements.length) return;

    const translations = this.translateService.translations;
    const currentLanguage = this.translateService.currentLanguage;

    elements.forEach((el) => {
      const key = el.getAttribute('data-translate');
      el.textContent = key && translations[currentLanguage][key] ? translations[currentLanguage][key] : key;
    });
  }

  protected render() {
    this.updateView();
    this.renderChildren();
    this.updateTranslations();
  }

  private renderChildren(): void {
    const languageSwitch = new LanguageSwitchComponent('language-switcher', this.translateService);
    languageSwitch.render();
  }

  protected template(): string {
    return `
      <h1 data-translate="app-works"></h1>
      <div id="language-switcher"></div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});