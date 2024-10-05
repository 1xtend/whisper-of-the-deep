import { Subscriber } from '../types/subscriber.type.ts';

export interface ReadonlyState<T> {
  get(): T;
  subscribe(callback: Subscriber<T>): void
}