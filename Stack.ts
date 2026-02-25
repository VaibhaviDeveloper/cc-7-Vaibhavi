import { LinkedList } from "./LinkedList";

/**
 * Interface representing a generic stack.
 */
export interface Stack<T> {
  readonly __items: LinkedList<T>;
  push(item: T): T;
  pop(): T;
  top(): T | null;
}

/**
 * A stack implementation using LinkedList as the underlying storage.
 */
export class StackImpl<T> implements Stack<T> {
  readonly __items: LinkedList<T>;
  constructor() {
    this.__items = new LinkedList<T>();
  }

  /**
   * Pushes an item onto the top of the stack.
   * @param item - The value to push
   * @returns The pushed value
   */
  push(item: T): T {
    this.__items.addAtHead(item);
    return item;
  }

  /**
   * Pops the top item off the stack.
   * @returns The popped value
   * @throws Error if the stack is empty
   */
  pop(): T {
    const removed = this.__items.removeFromHead();
    if (removed === null) {
      throw new Error("Stack underflow: Cannot pop from empty stack");
    }
    return removed;
  }

  /**
   * Returns the top item without removing it.
   * @returns The top value, or null if the stack is empty
   */
  top(): T | null {
    const value = this.__items.removeFromHead();
    if (value === null) return null;

    this.__items.addAtHead(value);
    return value;
  }
}