import { getPosts, getUserPosts } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers.js";

import { renderUserPostsPageComponent } from "./components/renderUserPostsPageComponent.js";
export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];

export const getToken = () => {
  return user ? `Bearer ${user.token}` : undefined;
};

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts()
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      console.log("Открываю страницу пользователя: ", data.userId);
      const userId = data.userId
      console.log(userId);
      return getUserPosts(userId)
        .then((userPosts) => {
          page = USER_POSTS_PAGE;
          posts = userPosts;
          renderApp();
        })
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

const renderApp = () => {
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent(
      appEl,
      user,
      goToPage,
    );
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent(
      appEl,
      (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
    );
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent(appEl, () => goToPage(POSTS_PAGE));
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent(appEl);
  }

  if (page === USER_POSTS_PAGE) {
    console.log(posts);
    // appEl.innerHTML = "Здесь будет страница фотографий пользователя";
    return renderUserPostsPageComponent(appEl);
  }
};

goToPage(POSTS_PAGE);
