// api-service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { APIService } from './async-7';
import type { Post, Comment } from './async-7';

describe('APIService', () => {
  let api: APIService;

  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Test Post',
    body: 'This is a test post',
  };

  const mockComments: Comment[] = [
    { postId: 1, id: 1, name: 'Alice', email: 'alice@test.com', body: 'Nice post!' },
    { postId: 1, id: 2, name: 'Bob', email: 'bob@test.com', body: 'Great!' },
  ];

  beforeEach(() => {
    api = new APIService();
    global.fetch = vi.fn();
  });

  it('fetchPost() should return a post when fetch is successful', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockPost,
    } as Response);

    const post = await api.fetchPost(1);

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
    expect(post).toEqual(mockPost);
  });

  it('fetchPost() should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    await expect(api.fetchPost(1)).rejects.toThrow('Failed to fetch post');
  });

  it('fetchComments() should return limited number of comments', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    } as Response);

    const comments = await api.fetchComments(1, 1);

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1/comments');
    expect(comments).toHaveLength(1);
    expect(comments[0]).toEqual(mockComments[0]);
  });

  it('fetchComments() should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    await expect(api.fetchComments(1, 1)).rejects.toThrow('Failed to fetch comments');
  });
});
