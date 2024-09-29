import './style.scss';
import { Component } from './core/component.ts';
import { TranslateService } from './core/translate.service.ts';
import { Language } from './models/enums/language.enum.ts';
import { LanguageObserver } from './models/interfaces/observers.interface.ts';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component.ts';
import { LocalStorage } from './models/enums/local-storage.enum.ts';
import { findElements } from './helpers/find-elements.ts';

class App extends Component implements LanguageObserver {
  private readonly translateService: TranslateService;

  constructor() {
    super('app');
    this.translateService = new TranslateService();
    this.initialize();
    this.translateService.subscribe(this);
  }

  private async initialize(): Promise<void> {
    const savedLanguage = localStorage.getItem(LocalStorage.Language) as Language | null;
    await this.translateService.setLanguage(savedLanguage || Language.EN, false);
    this.render();
  }

  updateLanguage() {
    this.updateTranslations();
  }

  private updateTranslations(): void {
    const elements = findElements('translate');
    if (!elements.length) return;

    const translations = this.translateService.getTranslations();
    const currentLanguage = this.translateService.getCurrentLanguage();

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