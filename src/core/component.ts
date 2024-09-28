import { findElementById } from '../helpers/find-elements.ts';

export abstract class Component {
  protected constructor(private containerId: string) {
  }

  protected updateView(): void {
    const containerElement: HTMLElement | null = findElementById(this.containerId);

    if (containerElement) {
      containerElement.innerHTML = this.template();
    } else {
      throw new Error(`Element with id "${ this.containerId }" doesn't exist`);
    }
  }

  protected bindEvents(): void {
  }

  protected abstract render(): void

  protected template(): string {
    return '';
  }
}