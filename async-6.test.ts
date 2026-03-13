import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsers } from './async-6';
import * as delayModule from './async-5';

describe('getUsers()', () => {
  const mockUsers = [{ id: 1, name: 'John Doe', username: 'jdoe', email: 'john@example.com' }];

  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it('should fetch users and return them after the delay', async () => {
    // vi.mocked() replaces 'as any' to satisfy the linter
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    const delaySpy = vi.spyOn(delayModule, 'delay');

    const result = await getUsers(1000);

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(delaySpy).toHaveBeenCalledWith(1000);
    expect(result).toEqual(mockUsers);
    expect(result).toHaveLength(1);
  });

  it('should throw an error if the fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });

  it('should use the default delay of 2000ms if none is provided', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const delaySpy = vi.spyOn(delayModule, 'delay');

    await getUsers();

    expect(delaySpy).toHaveBeenCalledWith(2000);
  });
});
