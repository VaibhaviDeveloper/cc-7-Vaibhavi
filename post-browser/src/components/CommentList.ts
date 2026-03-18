import { Comment } from "../services/APIService";

export function renderComments(comments: Comment[]) {
  const container = document.getElementById("comments-section");
  console.assert(!!container, "comments-section element not found");
  if (!container) return;
  // Create a simple list of comments
  container.innerHTML = `
    <div class="comments-container" style="margin-top: 2rem; border-top: 1px solid var(--border-soft); padding-top: 1.5rem;">
      <h3 style="margin-bottom: 1rem; font-size: 1.2rem;">Comments</h3>
      ${comments
        .map(
          (comment) => `
        <div class="comment-item" style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--accent-purple); font-size: 0.9rem; margin-bottom: 0.2rem;">${comment.email}</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.4;">${comment.body}</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}
