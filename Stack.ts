// Implement a Stack class implementation:

import { LinkedList } from "./LinkedList.js";

/**
 * A generic Stack implementation.
 * Uses a LinkedList as the underlying data structure
 * to maintain the items pushed into it.
 */
export class Stack<T> {
  #items: LinkedList<T>;
  constructor() {
    this.#items = new LinkedList<T>();
  }

  /**
   * Push adds an item to the top of the stack.
   * @param item - The item to push.
   * @returns The pushed item.
   */
  push(item: T): T {
    return this.#items.addAtHead(item);
  }

  /**
   * Pop removes and returns the top item of the stack.
   * @returns The removed item.
   * @throws Error if the stack is empty.
   */
  pop(): T {
    const value = this.#items.removeFromHead();
    if (value === null) {
      throw new Error("Stack is empty");
    }
    return value;
  }

  /**
   * Returns the item at the top of the stack,
   * or null if the stack is empty.
   */
  top(): T | null {
    return this.#items.itemAtHead();
  }
}