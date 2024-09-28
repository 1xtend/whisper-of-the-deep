import './style.scss';
import { Component } from './core/component.ts';

class App extends Component {
  constructor() {
    super('app');
    this.render()
  }

  protected render() {
    this.updateView();
  }

  protected template(): string {
    return `
      <h1>App works!</h1>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});