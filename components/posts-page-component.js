import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { clickLike } from "./click-like-component.js";


export function renderPostsPageComponent(appEl) {
  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts"></ul>
  </div>`;

  appEl.innerHTML = appHtml;

  console.log("Актуальный список постов:", posts);
  let allPosts = posts.map((post) => {
    return `                  
      <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name.sanitize()}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src=${post.imageUrl}>
        </div>
        <div class="post-bottom">
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button">
              ${post.isLiked
        ? `<img src="./assets/images/like-active.svg" alt="heart">`
        : `<img src="./assets/images/like-not-active.svg" alt="heart">`}
            </button>
            <p class="post-likes-text">
              Нравится: ${post.likes.length < 2
        ? `<strong>${0 === post.likes.length ? "0" : post.likes.map((likeInfo) => likeInfo.name).join(", ")}</strong>`
        : `<strong>${post.likes.getJustOneRandom().name.sanitize()}</strong>
                и <strong>еще ${(post.likes.length - 1)}</strong>`}
            </p>
          </div>
        </div>

        <p class="post-text">
          <span class="user-name">${post.user.name.sanitize()}</span>
          ${post.description.sanitize()}
        </p>
        <p class="post-date">
          ${new Date(post.createdAt).print()}
        </p>
      </li>`
  }).join('');

  if (allPosts === "")
    allPosts = `<li><h2 class="no-posts">Здесь пока ничего нет!</h2></li>`

  document.querySelector(".posts").innerHTML = allPosts

  clickLike();
  
  
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
