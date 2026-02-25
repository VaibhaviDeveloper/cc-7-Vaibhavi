import { describe, it, expect, beforeEach } from "vitest";
import { StackImpl } from "./Stack";

describe("Stack", () => {
  let stack: StackImpl<number>;

  beforeEach(() => {
    stack = new StackImpl<number>();
  });

  it("should push items", () => {
    stack.push(10);
    stack.push(20);
    expect(stack.top()).toBe(20);
  });

  it("should pop items in LIFO order", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it("should return null on top if empty", () => {
    expect(stack.top()).toBeNull();
  });

  it("should throw error when popping empty stack", () => {
    expect(() => stack.pop()).toThrow();
  });
});