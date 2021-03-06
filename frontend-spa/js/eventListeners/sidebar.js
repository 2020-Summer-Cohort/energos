import { drag, createJSON } from "./drag-and-drop.js";
import { updateVisionBoardBackgroundColor, updateVisionBoardBackgroundImageLink } from "../apiHelpers/apiHelper-VisionBoards.js";
import { postText } from "../apiHelpers/apiHelper-Texts.js";
import { postNewBackground } from "../apiHelpers/apiHelper-Backgrounds.js";
import { postNewImage } from "../apiHelpers/apiHelper-Images.js";
import { postNewQuote } from "../apiHelpers/apiHelper-Quotes.js";

export function addSideBarEventListeners() {
  const icons = document.querySelectorAll(".icon-div i");
  const sidebar = document.querySelector(".sidebar");
  const addTextInput = document.querySelector(".add-text");
  const backgroundColorPickerInput = document.querySelector(
    ".wallpapers-container .color-picker"
  );
  const backgroundAddImageInput = document.querySelector(
    ".wallpapers-container .add-image"
  );
  const addImageInput = document.querySelector(".images-container .add-image");
  const addQuoteInput = document.querySelector(".add-quote");

  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", () => {
      addHoverEffectsForIcons(i);
    });
  }

  sidebar.addEventListener("click", () => {
    sidebarClickEventListener();
  });

  sidebar.addEventListener("dragstart", () => {
    sidebarDragEventListener();
  });

  window.addEventListener("mouseover", () => {
    hideSidebarContent();
  });

  addTextInput.addEventListener("change", () => {
    createNewTextElement();
  });

  backgroundColorPickerInput.addEventListener("change", () => {
    changeBackgroundColor();
  });

  backgroundAddImageInput.addEventListener("change", () => {
    createNewBackgroundImage();
  });

  addImageInput.addEventListener("change", () => {
    createNewImage();
  });

  addQuoteInput.addEventListener("change", () => {
    createNewQuote();
  });
}

function changeBackgroundColor() {
  const backgroundColorPickerInput = document.querySelector(
    ".wallpapers-container .color-picker"
  );
  const main = document.querySelector("main");

  let color = backgroundColorPickerInput.value;
  main.style.backgroundColor = color;
  main.style.backgroundImage = "";

  const visionboardId = document.querySelector(".visionboard-id-input").value;
  const changeBackgroundColorJSON = createJSON("backgroundColor", color);
  updateVisionBoardBackgroundColor(visionboardId, changeBackgroundColorJSON);
}

function addHoverEffectsForIcons(i) {
  if (i === 0) location.reload();
  const contentContainers = document.querySelectorAll(".sidebar-content > div");
  const sidebarContent = document.querySelector(".sidebar-content");

  const icons = document.querySelectorAll(".icon-div i");

  sidebarContent.style.display = "block";
  icons.forEach((icon) => icon.classList.remove("icon-text"));
  icons.forEach((icon) => icon.classList.remove("active"));
  icons[i].classList.add("active");
  setTimeout(() => {
    sidebarContent.style.width = "16vw";
  }, 50);
  setTimeout(() => {
    contentContainers.forEach(
      (container) => (container.style.display = "none")
    );
    contentContainers[i].style.display = "flex";
  }, 300);
}

function hideSidebarContent() {
  const sidebarContent = document.querySelector(".sidebar-content");

  const icons = document.querySelectorAll(".icon-div i");

  const el = event.target;
  if (event.target.closest(".sidebar")) return false;

  sidebarContent.style.width = "0";

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.add("icon-text");
    icons[i].classList.remove("active");
  }

  setTimeout(() => {
    sidebarContent.style.display = "none";
  }, 300);
}

let textNumber = 0;
function createNewTextElement() {
  const inputContainerDiv = document.querySelector(
    ".text-container .input-container"
  );
  const addTextInput = document.querySelector(".add-text");

  let textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.id = "add-text-" + textNumber;
  textNumber++;
  textDiv.draggable = "true";
  let textH2 = document.createElement("h2");
  let textFromInput = addTextInput.value;
  textH2.contentEditable = "true";
  textH2.innerText = textFromInput;
  textDiv.appendChild(textH2);
  inputContainerDiv.parentNode.insertBefore(
    textDiv,
    inputContainerDiv.nextSibling
  );
  addTextInput.value = "";
  const textJSON = {
    textHtmlId: textDiv.id,
    textContent: textFromInput,
    textParentElement: "text-container",
  };
  const visionBoardId = document.querySelector(".visionboard-id-input").value;
  postText(visionBoardId, textJSON);
}

function checkUrl(url) {
  return url.match(/\.(jpeg|jpg|png|gif|tiff)/) != null;
}

let wallpaperNumber = 0;
function createNewBackgroundImage() {
  const backgroundAddImageInput = document.querySelector(
    ".wallpapers-container .add-image"
  );
  const backgroundImageInputContainer = document.querySelector(
    ".wallpapers-container .input-container"
  );

  let url = backgroundAddImageInput.value;
  let urlToCheck = checkUrl(url);
  if (urlToCheck === false) {
    backgroundAddImageInput.value = "";
    return false;
  }
  const img = createImageToAdd(url, "wallpaper", wallpaperNumber);

  backgroundImageInputContainer.parentNode.insertBefore(
    img,
    backgroundImageInputContainer.nextSibling
  );
  backgroundAddImageInput.value = "";
  wallpaperNumber++;

  const visionBoardId = document.querySelector(".visionboard-id-input").value;
  const backgroundJSON = createJSON("backgroundLink", url);
  postNewBackground(visionBoardId, backgroundJSON);
}

let imageNumber = 0;
function createNewImage() {
  const imageInputContainer = document.querySelector(
    ".images-container .input-container"
  );

  const addImageInput = document.querySelector(".images-container .add-image");

  let url = addImageInput.value;
  let urlToCheck = checkUrl(url);
  if (urlToCheck === false) {
    addImageInput.value = "";
    return false;
  }
  const img = createImageToAdd(url, "image", imageNumber);

  imageInputContainer.parentNode.insertBefore(
    img,
    imageInputContainer.nextSibling
  );
  addImageInput.value = "";
  imageNumber++;
  const visionBoardId = document.querySelector(".visionboard-id-input").value;
  const imageJSON = {
    "imageHtmlId": img.id,
    "imageLink": img.src,
    "imageParentElement": "images-container"
  }
  postNewImage(visionBoardId, imageJSON);
}

let quoteNumber = 0;
function createNewQuote() {
  const quoteInputContainer = document.querySelector(
    ".quotes-container .input-container"
  );
  const addQuoteInput = document.querySelector(".add-quote");

  let url = addQuoteInput.value;
  let urlToCheck = checkUrl(url);
  if (urlToCheck === false) {
    addQuoteInput.value = "";
    return false;
  }
  const img = createImageToAdd(url, "quote", quoteNumber);

  quoteInputContainer.parentNode.insertBefore(
    img,
    quoteInputContainer.nextSibling
  );
  addQuoteInput.value = "";
  quoteNumber++;
  const visionBoardId = document.querySelector(".visionboard-id-input").value;
  const quoteJSON = {
    "quoteHtmlId": img.id,
    "quoteLink": img.src,
    "quoteParentElement": "quotes-container"
  }
  postNewQuote(visionBoardId, quoteJSON);
}

function sidebarClickEventListener() {
  const main = document.querySelector("main");
  const el = event.target;
  if (el.classList.contains("wallpaper")) {
    const src = el.src;
    main.style.backgroundImage = "url(" + src + ")";
    

    const visionBoardId =document.querySelector(".visionboard-id-input").value;
    const addBackgroundImageUrlJSON = createJSON("backgroundImageLink", src);
    updateVisionBoardBackgroundImageLink(visionBoardId, addBackgroundImageUrlJSON);
  }
}

function sidebarDragEventListener() {
  const el = event.target;
  if (
    el.classList.contains("image") ||
    el.classList.contains("text") ||
    el.classList.contains("quote")
  )
    drag(el);
}

function createImageToAdd(url, className, number) {
  const img = new Image();
  img.src = url;
  img.id = "add-" + className + "-" + number;
  img.classList.add(className);
  return img;
}
