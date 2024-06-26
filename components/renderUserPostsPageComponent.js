import { renderHeaderComponent } from "./header-component.js";
import { posts } from "../index.js";
import { clickLike } from "./click-like-component.js";

export function renderUserPostsPageComponent(appEl) {
  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <div class="post-header" data-user-id="${posts[0].user.id}">
      <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
      <p class="posts-user-header__user-name">${posts[0].user.name}</p>
    </div>
    <ul class="posts"></ul>
  </div>`;

  appEl.innerHTML = appHtml;

  console.log("Актуальный список постов:", posts);
  const allPosts = posts.map((post) => {
    return `                  
      <li class="post">
        <div class="post-image-container">
          <img class="post-image" src=${post.imageUrl}>
        </div>
        <div class="post-bottom">
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button">
              ${post.isLiked
                ?`<img src="./assets/images/like-active.svg" alt="heart">`
                :`<img src="./assets/images/like-not-active.svg" alt="heart">`}
            </button>
            <p class="post-likes-text">
              Нравится: ${post.likes.length < 2 
                ? `<strong>${0 === post.likes.length ? "0" : post.likes.map((({name: post})=>post)).join(", ")}</strong>` 
                : `<strong>${post.likes.getJustOneRandom().name}</strong>
                и <strong>еще ${(post.likes.length - 1)}</strong>`}
            </p>
          </div>
          
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${new Date(post.createdAt).print()}
        </p>
      </li>`
  }).join('');

  document.querySelector(".posts").innerHTML = allPosts
  
  clickLike();

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

}
