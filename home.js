const filterMenu = document.querySelectorAll(".filter-menu li");
const templates = document.getElementById("meme-templates");
const imageDropArea = document.querySelector(".image-drag-area");
import memeImages from "./images.js";

memeImages.forEach(function (meme) {
  console.log(typeof meme);
  const imageId = meme["img"];
  const imageClass = meme["class"];
  const imgElement = document.createElement("img");
  imgElement.src = `./assets/images/img${imageId}.jpeg`;
  imgElement.alt = `Meme Template ${imageId}`;
  imgElement.setAttribute("data-filter", `${imageClass}`);

  imgElement.classList.add("meme-template");

  imgElement.addEventListener("click", function () {
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

      // 현재 분류 필터와 == 템플릿의 data-filter일 경우
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

imageDropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  imageDropArea.classList.add("active");
});

imageDropArea.addEventListener("dragleave", () => {
  imageDropArea.classList.remove("active");
});

// imageDropArea.addEventListener("drop", (event) => {
//   event.preventDefault();
//   file = event.dataTransfer.files[0];
//   let fileType = file.type;
//   console.log(fileType);

//   let validExtension = "image/jpeg";
//   if (validExtension === fileType) {
//   }
// });
