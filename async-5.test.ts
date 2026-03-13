import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { delay } from './async-5';

describe('delay function', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should resolve after the specified milliseconds', async () => {
    const promise = delay(2000);
    vi.advanceTimersByTime(2000);
    await expect(promise).resolves.toBeUndefined();
  });

  it('should not resolve before the time passes', async () => {
    const promise = delay(5000);
    vi.advanceTimersByTime(1000);
    let resolved = false;
    promise.then(() => {
      resolved = true;
    });
    expect(resolved).toBe(false);
    vi.advanceTimersByTime(4000);
    await promise;
    expect(resolved).toBe(true);
  });
});
