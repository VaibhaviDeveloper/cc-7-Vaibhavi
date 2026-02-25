import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList } from "./LinkedList";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it("should initialize empty", () => {
    expect(list.length()).toBe(0);
    expect(list.removeFromHead()).toBeNull();
    expect(list.removeFromEnd()).toBeNull();
  });

  it("should add at end", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.length()).toBe(2);
    expect(list.searchFor(10)).toBe(10);
    expect(list.searchFor(20)).toBe(20);
  });

  it("should remove from end", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    const removed = list.removeFromEnd();

    expect(removed).toBe(20);
    expect(list.length()).toBe(1);
    expect(list.searchFor(20)).toBeNull();
    expect(list.searchFor(10)).toBe(10);
  });

  it("should add at head", () => {
    list.addAtHead(5);
    list.addAtHead(10);

    expect(list.length()).toBe(2);

   
    expect(list.removeFromHead()).toBe(10);
    expect(list.removeFromHead()).toBe(5);
  });

  it("should remove from head", () => {
    list.addAtEnd(1);
    list.addAtEnd(2);

    const removed = list.removeFromHead();

    expect(removed).toBe(1);
    expect(list.length()).toBe(1);
    expect(list.searchFor(1)).toBeNull();
    expect(list.searchFor(2)).toBe(2);
  });

  it("should search for existing value", () => {
    list.addAtEnd(1);
    list.addAtEnd(2);
    list.addAtEnd(3);

    expect(list.searchFor(2)).toBe(2);
  });

  it("should return null for missing value", () => {
    list.addAtEnd(1);
    expect(list.searchFor(99)).toBeNull();
  });

  it("should handle removing from empty list", () => {
    expect(list.removeFromHead()).toBeNull();
    expect(list.removeFromEnd()).toBeNull();
  });

  it("should maintain correct order with mixed operations", () => {
    list.addAtHead(2);     
    list.addAtHead(1);     
    list.addAtEnd(3);     

    expect(list.length()).toBe(3);

    expect(list.removeFromHead()).toBe(1);
    expect(list.removeFromEnd()).toBe(3);
    expect(list.removeFromHead()).toBe(2);

    expect(list.length()).toBe(0);
  });
});