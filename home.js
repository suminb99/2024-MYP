const filterMenu = document.querySelectorAll(".filter-menu li");
const templates = document.getElementById("meme-templates");
const imageDropArea = document.querySelector(".image-drag-area");
const imageButton = document.querySelector("button");
const imageInput = document.querySelector("input");

import memeImages from "./images.js";

let imageId;
memeImages.forEach(function (meme) {
  imageId = meme["img"];
  const imageClass = meme["class"];
  const imgElement = document.createElement("img");
  imgElement.src = `./assets/images/img${imageId}.jpeg`;
  imgElement.alt = `MemeTemplate${imageId}`;
  imgElement.setAttribute("data-filter", `${imageClass}`);

  imgElement.classList.add("meme-template");

  imgElement.addEventListener("click", function () {
    console.log("clicked!");
    localStorage.setItem("templateInfo", JSON.stringify(meme));
    window.location.href = "edit.html";
  });

  templates.appendChild(imgElement);
});

// 필터 기능
filterMenu.forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelector(".filter-menu li.active").classList.remove("active");
    imageDropArea.style.display = "none";
    filter.classList.add("active");
    if (filter.innerHTML === "♡") {
      imageDropArea.style.display = "flex";
    }

    const activeClass = filter.innerHTML.toLowerCase();
    const memeTemplates = document.querySelectorAll(
      ".templates .meme-template"
    );

    memeTemplates.forEach((meme) => {
      meme.style.display = "none";

      // 현재 분류 필터 == 템플릿의 data-filter일 경우
      if (
        meme.getAttribute("data-filter") === activeClass ||
        activeClass === "all"
      ) {
        meme.style.display = "block";
      }
    });
  });
});

// 이미지 업로드 기능
let file;

imageButton.onclick = () => {
  imageInput.click();
};

imageInput.addEventListener("change", function () {
  file = this.files[0];
  loadImage();
});

imageDropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  imageDropArea.classList.add("active");
});

imageDropArea.addEventListener("dragleave", () => {
  imageDropArea.classList.remove("active");
});

imageDropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  // 사용자가 선택한 첫번째 파일만 가져오기
  file = event.dataTransfer.files[0];
  loadImage();
  imageDropArea.classList.remove("active");
});

function loadImage() {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      const imgElement = document.createElement("img");
      imgElement.src = fileURL;

      imgElement.onload = () => {
        const imgWidth = imgElement.naturalWidth;
        const imgHeight = imgElement.naturalHeight;

        const meme = {
          img: fileURL,
          original: false,
          width: imgWidth,
          height: imgHeight,
          class: "my",
        };

        localStorage.setItem("templateInfo", JSON.stringify(meme));
        window.location.href = "edit.html";
      };

      imgElement.onerror = () => {
        console.error("이미지 업로드 실패");
      };
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("이미지 파일을 선택해 주세요!");
  }
}
