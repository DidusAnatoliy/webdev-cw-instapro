import { postLike, postDisLike } from "../api.js";
import { getToken } from "../index.js";


export const clickLike = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      let id = likeButton.dataset.postId;
      let token = getToken();

      if (token === undefined) {
        alert("Вы не авторизованы")
      } else {
        likeButton.dataset.isLiked === "true"
          ? postDisLike(id)
            .then((responseData) => {
              likeButton.innerHTML =
                `<img src="./assets/images/like-not-active.svg" alt="heart">`
              clickLikeElement({ likeButton, responseData });
              likeButton.dataset.isLiked = "false"
            })
          : postLike(id)
            .then((responseData) => {
              likeButton.innerHTML =
                `<img src="./assets/images/like-active.svg" alt="heart">`
              clickLikeElement({ likeButton, responseData });
              likeButton.dataset.isLiked = "true"
            })
      }
    })
  }
}

const clickLikeElement = ({ likeButton, responseData }) => {
  const postLikesText = likeButton.closest(".post-bottom").querySelector(".post-likes-text")
  postLikesText.innerHTML =
    `<p class="post-likes-text">
    Нравится: ${responseData.post.likes.length < 2
      ? `<strong>${0 === responseData.post.likes.length ? "0" : responseData.post.likes.map((({ name: post }) => post)).join(", ")}</strong>`
      : `<strong>${responseData.post.likes.getJustOneRandom().name}</strong>
      и <strong>еще ${(responseData.post.likes.length - 1)}</strong>`}
  </p>`;
}
