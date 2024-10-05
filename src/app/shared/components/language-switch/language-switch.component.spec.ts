import { LanguageSwitchComponent } from './language-switch.component.ts';
import { TranslateService } from '../../../core/services/translate.service.ts';

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
    const updateViewSpy = jest.spyOn(<any>component, 'updateView');
    const bindEventsSpy = jest.spyOn(<any>component, 'bindEvents');

    component.render();
    const element = document.getElementById(containerId);
    expect(updateViewSpy).toHaveBeenCalled();
    expect(bindEventsSpy).toHaveBeenCalled();
    expect(element).toBeTruthy();
    expect(element?.innerHTML.trim()).toBe(`<button type="button" data-language-switch="" data-translate="switch-language"></button>`);
  });
});