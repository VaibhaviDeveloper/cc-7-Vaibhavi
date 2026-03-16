export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export class APIService {
  async fetchPost(id: number): Promise<Post> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    const post: Post = await res.json();
    return post;
  }

  async fetchComments(id: number, count: number): Promise<Comment[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (!res.ok) {
      throw new Error('Failed to fetch comments');
    }
    const comments: Comment[] = await res.json();
    return comments.slice(0, count);
  }
}
