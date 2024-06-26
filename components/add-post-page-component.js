import { sendPost } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";


export function renderAddPostPageComponent(appEl, onAddPostClick) {
  let isLoginMode = true;
  let imageUrl = "";
  
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container">
          <div class="upload-image">
            <div class="new-foto " id="new-foto"></div>
            <label class="file-upload-label secondary-button" id="selection-foto">
              <input type="file" id="image-input" style="display:none" >
              Выберите фото
            </label>
          </div>
        </div>
        <label>
          Опишите фотографию:
          <textarea class="input textarea" rows="4" id="textarea-input"></textarea>
        </label>
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
    </div>
  `;

    appEl.innerHTML = appHtml;


    const uploadImageContainer = appEl.querySelector(".upload-image-container");


    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      if (isLoginMode) {
        const imageInput = document.getElementById("textarea-input").value;

        if (!imageInput) {
          alert("Не заполнено описание фото");
          return;
        }
  
        if (!imageUrl) {
          alert("Не выбрана фотография");
          return;
        }

        const element = document.querySelector('.input').value
  
        sendPost(element, imageUrl)
          .then(() => {
            onAddPostClick();
          })

      }

    });
  };

  render();

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}
