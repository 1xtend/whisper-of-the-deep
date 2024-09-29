import './style.scss';
import { Component } from './core/component.ts';
import { TranslateService } from './core/translate.service.ts';
import { Language } from './models/enums/language.enum.ts';
import { LanguageObserver } from './models/interfaces/observers.interface.ts';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component.ts';

class App extends Component implements LanguageObserver {
  private readonly translateService: TranslateService;

  translate(key: string) {
    return this.translateService.translate(key);
  }

  constructor() {
    super('app');
    this.translateService = new TranslateService();
    this.translateService.setLanguage(Language.EN).then(() => {
      this.render();
    });
    this.translateService.subscribe(this);
  }

  updateLanguage() {
    this.render();
  }

  protected render() {
    this.updateView();
    this.renderChildren();
  }

  private renderChildren(): void {
    const languageSwitch = new LanguageSwitchComponent('language-switcher', this.translateService);
    languageSwitch.render();
  }

  protected template(): string {
    return `
      <h1>${ this.translate('app-works') }</h1>
      <div id="language-switcher"></div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});