import { Post } from "../services/APIService";

export function renderPost(post: Post) {
  const container = document.getElementById("post");

  if (!container) return;

  container.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `;
}
