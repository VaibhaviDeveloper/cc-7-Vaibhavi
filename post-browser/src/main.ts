import "./styles/style.css";

import { APIService } from "./services/APIService";
import { CacheService } from "./services/CacheService";

const api = new APIService();
const cache = new CacheService();

let currentPostId = 1;
const totalPosts = 100;

// Elements
const titleEl = document.getElementById("post-title")!;
const bodyEl = document.getElementById("post-body")!;
const metaEl = document.getElementById("post-meta")!;

const nextBtn = document.getElementById("next-btn")!;
const prevBtn = document.getElementById("prev-btn")!;
const refreshBtn = document.getElementById("refresh-btn")!;
const commentsBtn = document.getElementById("comments-btn")!;
const commentsSection = document.getElementById("comments-section")!;

let commentsVisible = false;

// Load Post
async function loadPost(id: number) {
  try {
    let post = cache.getPost(id);

    if (!post) {
      post = await api.fetchPost(id);
      cache.setPost(id, post);
    }

    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;
    metaEl.textContent = `Post #${id} of ${totalPosts}`;

    (prevBtn as HTMLButtonElement).disabled = id <= 1;
    (nextBtn as HTMLButtonElement).disabled = id >= totalPosts;

    commentsSection.innerHTML = "";
    commentsBtn.textContent = "View Comments";
    commentsVisible = false;
  } catch (_error) {
    titleEl.textContent = "Error";
    bodyEl.textContent = "Could not load the post.";
  }
}

// Load Comments
async function loadComments(postId: number) {
  let comments = cache.getComments(postId);

  if (!comments) {
    comments = await api.fetchComments(postId, 5);
    cache.setComments(postId, comments);
  }

  commentsSection.innerHTML = "";

  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
            <h4>${c.name}</h4>
            <p>${c.body}</p>
            <small>${c.email}</small>
        `;

    commentsSection.appendChild(div);
  });
}

// Button Events

nextBtn.addEventListener("click", () => {
  if (currentPostId < totalPosts) {
    currentPostId++;
    loadPost(currentPostId);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPostId > 1) {
    currentPostId--;
    loadPost(currentPostId);
  }
});

refreshBtn.addEventListener("click", () => {
  cache.deletePost(currentPostId);
  cache.deleteComments(currentPostId);
  currentPostId = 1;
  loadPost(currentPostId);
});

// Toggle Comments
commentsBtn.addEventListener("click", async () => {
  if (commentsVisible) {
    commentsSection.innerHTML = "";
    commentsBtn.textContent = "View Comments";
    commentsVisible = false;
  } else {
    await loadComments(currentPostId);
    commentsBtn.textContent = "Hide Comments";
    commentsVisible = true;
  }
});

// Initial Load
loadPost(currentPostId);
