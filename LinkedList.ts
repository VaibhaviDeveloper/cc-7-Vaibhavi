/**
 * Represents a node in the linked list.
 */
export interface ListNode<T> {
value: T;
  next: ListNode<T> | null;
}
/**
 * Interface defining the LinkedList API.
 */
export interface LinkedListInterface<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  addAtEnd(t: T): T;
  removeFromEnd(): T | null;
  addAtHead(t: T): T;
  removeFromHead(): T | null;
  searchFor(t: T): T | null;
  length(): number;
}
/**
 * A generic singly linked list implementation.
 */
export class LinkedList<T> implements LinkedListInterface<T> {
 head: ListNode<T> | null = null;
 tail: ListNode<T> | null = null;
 private size: number = 0;
 /**
   * Adds a value to the end of the list.
   */
  addAtEnd(t: T): T {
    const newNode: ListNode<T> = { value: t, next: null };

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return t;
  }
 /**
   * Removes and returns the last element.
   * Returns null if the list is empty.
   */
  removeFromEnd(): T | null {
    if (!this.head) return null;

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = this.tail = null;
      this.size--;
      return value;
    }

    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }

    const value = this.tail!.value;
    current.next = null;
    this.tail = current;
    this.size--;

    return value;
  }
 /**
   * Adds a value to the beginning of the list.
   */
  addAtHead(t: T): T {
    const newNode: ListNode<T> = { value: t, next: this.head };
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.size++;
    return t;
  }
 /**
   * Removes and returns the first element.
   * Returns null if the list is empty.
   */
  removeFromHead(): T | null {
    if (!this.head) return null;

    const value = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return value;
  }
 /**
   * Searches for a value in the list.
   * Returns the value if found, otherwise null.
   */
  searchFor(t: T): T | null {
    let current = this.head;

    while (current) {
      if (current.value === t) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  }
 /**
   * Returns the number of elements in the list.
   */
  length(): number {
    return this.size;
  }
}