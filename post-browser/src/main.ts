import "./styles/style.css";

import { APIService } from "./services/APIService";
import { CacheService } from "./services/CacheService";

const api = new APIService();
const cache = new CacheService();

const urlParams = new URLSearchParams(window.location.search);
const startId = parseInt(urlParams.get("id") || "1", 10);

let currentPostId = isNaN(startId) ? 1 : Math.min(Math.max(startId, 1), 100);

const totalPosts = 100;

function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);

  console.assert(!!el, `${id} not found`);

  if (!el) {
    throw new Error(`${id} not found`);
  }

  return el as T;
}

// Elements
const titleEl = getElement<HTMLHeadingElement>("post-title");
const bodyEl = getElement<HTMLParagraphElement>("post-body");
const metaEl = getElement<HTMLDivElement>("post-meta");

const nextBtn = getElement<HTMLButtonElement>("next-btn");
const prevBtn = getElement<HTMLButtonElement>("prev-btn");
const refreshBtn = getElement<HTMLButtonElement>("refresh-btn");
const commentsBtn = getElement<HTMLButtonElement>("comments-btn");
const commentsSection = getElement<HTMLDivElement>("comments-section");

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
  const shouldShow = !commentsVisible;

  if (shouldShow) {
    await loadComments(currentPostId);
    commentsBtn.textContent = "Hide Comments";
  } else {
    commentsSection.innerHTML = "";
    commentsBtn.textContent = "View Comments";
  }

  commentsVisible = shouldShow;
});

// Initial Load
loadPost(currentPostId);
