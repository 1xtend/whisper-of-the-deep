import { Subscriber } from '../../shared/models/types/subscriber.type.ts';
import { ReadonlyState } from '../../shared/models/interfaces/readonly-state.interface.ts';

export class State<T> {
  private value: T;
  private subscribers: Subscriber<T>[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    if (value === this.value) return;

    this.value = value;
    this.notify();
  }

  subscribe(callback: Subscriber<T>): void {
    this.subscribers.push(callback);
  }

  asReadonly(): ReadonlyState<T> {
    return {
      get: this.get.bind(this),
      subscribe: this.subscribe.bind(this)
    };
  }

  private notify(): void {
    this.subscribers.forEach((subscriber) => subscriber(this.value));
  }
}