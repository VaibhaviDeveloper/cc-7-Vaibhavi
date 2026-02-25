import { describe, it, expect } from "vitest";
import { LinkedList } from "./LinkedList.js";

describe("LinkedList", () => {
  it("should start empty", () => {
    const list = new LinkedList<number>();
    expect(list.itemAtHead()).toBeNull();
    expect(list.itemAtTail()).toBeNull();
    expect(list.length()).toBe(0);
  });

  it("should add elements at the end", () => {
    const list = new LinkedList<number>();
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.itemAtHead()).toBe(10);
    expect(list.itemAtTail()).toBe(20);
    expect(list.length()).toBe(2);
  });

  it("should remove element from the end (two elements)", () => {
    const list = new LinkedList<number>();
    list.addAtEnd(10);
    list.addAtEnd(20);

    const removed = list.removeFromEnd();

    expect(removed).toBe(20);
    expect(list.itemAtTail()).toBe(10);
    expect(list.length()).toBe(1);
  });

  it("should remove last element when list has more than two elements", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(10);
    list.addAtEnd(20);
    list.addAtEnd(30);

    const removed = list.removeFromEnd();

    expect(removed).toBe(30);
    expect(list.itemAtTail()).toBe(20);
    expect(list.length()).toBe(2);
  });

  it("should remove the only element using removeFromEnd", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(10);

    const removed = list.removeFromEnd();

    expect(removed).toBe(10);
    expect(list.itemAtHead()).toBeNull();
    expect(list.itemAtTail()).toBeNull();
    expect(list.length()).toBe(0);
  });

  it("should return null when removing from empty list using removeFromEnd", () => {
    const list = new LinkedList<number>();
    expect(list.removeFromEnd()).toBeNull();
  });

  it("should add elements at the head (empty list)", () => {
    const list = new LinkedList<number>();

    list.addAtHead(100);

    expect(list.itemAtHead()).toBe(100);
    expect(list.itemAtTail()).toBe(100);
    expect(list.length()).toBe(1);
  });

  it("should add elements at the head (non-empty list)", () => {
    const list = new LinkedList<number>();
    list.addAtHead(10);
    list.addAtHead(20);

    expect(list.itemAtHead()).toBe(20);
    expect(list.itemAtTail()).toBe(10);
    expect(list.length()).toBe(2);
  });

  it("should remove element from the head (multiple elements)", () => {
    const list = new LinkedList<number>();
    list.addAtEnd(10);
    list.addAtEnd(20);

    const removed = list.removeFromHead();

    expect(removed).toBe(10);
    expect(list.itemAtHead()).toBe(20);
    expect(list.length()).toBe(1);
  });

  it("should remove the only element using removeFromHead", () => {
    const list = new LinkedList<number>();

    list.addAtHead(10);

    const removed = list.removeFromHead();

    expect(removed).toBe(10);
    expect(list.itemAtHead()).toBeNull();
    expect(list.itemAtTail()).toBeNull();
    expect(list.length()).toBe(0);
  });

  it("should search for an existing value", () => {
    const list = new LinkedList<number>();
    list.addAtEnd(5);
    list.addAtEnd(15);

    expect(list.searchFor(15)).toBe(true);
  });

  it("should return false when searching for non-existing value", () => {
    const list = new LinkedList<number>();
    list.addAtEnd(5);

    expect(list.searchFor(100)).toBe(false);
  });

  it("should return correct length", () => {
    const list = new LinkedList<number>();
    list.addAtEnd(1);
    list.addAtEnd(2);
    list.addAtEnd(3);

    expect(list.length()).toBe(3);
  });

  describe("itemAtIndex", () => {
    it("should return null for empty list", () => {
      const list = new LinkedList<number>();
      expect(list.itemAtIndex(0)).toBeNull();
    });

    it("should return correct value for valid indices", () => {
      const list = new LinkedList<number>();
      list.addAtEnd(10);
      list.addAtEnd(20);
      list.addAtEnd(30);

      expect(list.itemAtIndex(0)).toBe(10);
      expect(list.itemAtIndex(1)).toBe(20);
      expect(list.itemAtIndex(2)).toBe(30);
    });

    it("should return null for negative index", () => {
      const list = new LinkedList<number>();
      list.addAtEnd(5);

      expect(list.itemAtIndex(-1)).toBeNull();
    });

    it("should return null for out of bounds index", () => {
      const list = new LinkedList<number>();
      list.addAtEnd(1);
      list.addAtEnd(2);

      expect(list.itemAtIndex(5)).toBeNull();
    });
  });
});