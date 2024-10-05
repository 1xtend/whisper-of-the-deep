type Subscriber<T> = (value: T) => void

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

  private notify(): void {
    this.subscribers.forEach((subscriber) => subscriber(this.value));
  }
}