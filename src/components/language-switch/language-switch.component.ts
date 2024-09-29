import { Component } from '../../core/component.ts';
import { TranslateService } from '../../core/translate.service.ts';
import { findElement } from '../../helpers/find-elements.ts';
import { Language } from '../../models/enums/language.enum.ts';

export class LanguageSwitchComponent extends Component {
  constructor(containerId: string, private translateService: TranslateService) {
    super(containerId);
  }

  render() {
    this.updateView();
    this.bindEvents();
  }

  protected bindEvents(): void {
    const buttonEl = findElement('language-switch');
    if (buttonEl) {
      buttonEl.addEventListener('click', async () => {
        await this.switchLanguage();
      });
    }
  }

  private async switchLanguage(): Promise<void> {
    const currentLanguage = this.translateService.getCurrentLanguage();
    const language = currentLanguage === Language.UA ? Language.EN : Language.UA;
    await this.translateService.setLanguage(language);
  }

  protected template(): string {
    return `
      <button type="button" data-language-switch>
        ${ this.translateService.translate('switch-language') }
      </button>
    `;
  }
}