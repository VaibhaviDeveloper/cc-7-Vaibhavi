// Implement a LinkedList class implementation:

export type ListNode<T> = {
  data: T;
  next: ListNode<T> | null;
};

export interface LinkedListInterface<T> {
  addAtEnd(t: T): T;
  removeFromEnd(): T | null;
  addAtHead(t: T): T;
  removeFromHead(): T | null;
  searchFor(t: T): boolean;
  length(): number;
  itemAtHead(): T | null;
  itemAtTail(): T | null;
  itemAtIndex(index: number): T | null;
}

/**
 * Generic singly linked list implementation.
 */
export class LinkedList<T> implements LinkedListInterface<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;

  addAtEnd(t: T): T {
    const newNode: ListNode<T> = { data: t, next: null };

    if (!this.#head) {
      this.#head = this.#tail = newNode;
      return t;
    }

    this.#tail!.next = newNode;
    this.#tail = newNode;
    return t;
  }

  removeFromEnd(): T | null {
    if (!this.#head) return null;

    if (this.#head === this.#tail) {
      const value = this.#head.data;
      this.#head = this.#tail = null;
      return value;
    }

    let current = this.#head;
    while (current.next !== this.#tail) {
      current = current.next!;
    }

    const value = this.#tail!.data;
    current.next = null;
    this.#tail = current;

    return value;
  }

  addAtHead(t: T): T {
    const newNode: ListNode<T> = { data: t, next: this.#head };
    this.#head = newNode;

    if (!this.#tail) {
      this.#tail = newNode;
    }

    return t;
  }

  removeFromHead(): T | null {
    if (!this.#head) return null;

    const value = this.#head.data;
    this.#head = this.#head.next;

    if (!this.#head) {
      this.#tail = null;
    }

    return value;
  }

  searchFor(t: T): boolean {
    let current = this.#head;

    while (current) {
      if (current.data === t) return true;
      current = current.next;
    }

    return false;
  }

  length(): number {
    let count = 0;
    let current = this.#head;

    while (current) {
      count++;
      current = current.next;
    }

    return count;
  }

  itemAtHead(): T | null {
    return this.#head?.data ?? null;
  }

  itemAtTail(): T | null {
    return this.#tail?.data ?? null;
  }

  itemAtIndex(index: number): T | null {
    if (index < 0) return null;

    let current = this.#head;
    let i = 0;

    while (current) {
      if (i === index) return current.data;
      current = current.next;
      i++;
    }

    return null;
  }
}