import { LanguageSwitchComponent } from './language-switch.component.ts';
import { TranslateService } from '../../core/translate.service.ts';

// jest.mock('../../core/translate.service.ts');

describe('LanguageSwitchComponent', () => {
  let component: LanguageSwitchComponent;
  const containerId = 'test-container';

  beforeEach(() => {
    document.body.innerHTML = `<div id="${ containerId }"></div>`;
    const translateService = new TranslateService();
    component = new LanguageSwitchComponent(containerId, translateService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render template', () => {
    component.render();
    const element = document.getElementById(containerId);
    expect(element).toBeTruthy();
    expect(element?.innerHTML).toBe(`
      <button type="button" data-language-switch="">
        switch-language
      </button>
    `);
  });
});