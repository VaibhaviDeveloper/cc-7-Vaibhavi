import { describe, it, expect } from "vitest";
import { Stack } from "./Stack.js";

describe("Stack Implementation", () => {
  it("should push items onto the stack", () => {
    const stack = new Stack<number>();

    stack.push(10);
    stack.push(20);

    expect(stack.top()).toBe(20);
  });

  it("should pop items in LIFO order", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it("should return null when checking top on empty stack", () => {
    const stack = new Stack<number>();

    expect(stack.top()).toBeNull();
  });

  it("should throw error when popping empty stack", () => {
    const stack = new Stack<number>();

    expect(() => stack.pop()).toThrow("Stack is empty");
  });

  it("should work with strings", () => {
    const stack = new Stack<string>();

    stack.push("a");
    stack.push("b");

    expect(stack.top()).toBe("b");
    expect(stack.pop()).toBe("b");
    expect(stack.pop()).toBe("a");
  });
});