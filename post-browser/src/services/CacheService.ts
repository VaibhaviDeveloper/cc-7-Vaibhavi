import { Post, Comment } from "./APIService";

export class CacheService {
  private postCache = new Map<number, Post>();
  private commentCache = new Map<number, Comment[]>();

  getPost(id: number): Post | undefined {
    return this.postCache.get(id);
  }

  setPost(id: number, post: Post): void {
    this.postCache.set(id, post);
  }

  deletePost(id: number): void {
    this.postCache.delete(id);
  }

  getComments(id: number): Comment[] | undefined {
    return this.commentCache.get(id);
  }

  setComments(id: number, comments: Comment[]): void {
    this.commentCache.set(id, comments);
  }

  deleteComments(id: number): void {
    this.commentCache.delete(id);
  }
}
