const filterMenu = document.querySelectorAll('.filter-menu li');
const templates = document.getElementById('meme-templates');
import memeImages from './images.js';

memeImages.forEach(function (meme) {
    console.log(typeof (meme));
    const imageId = meme['img'];
    const imageClass = meme['class'];
    const imgElement = document.createElement('img');
    imgElement.src = `./assets/images/img${imageId}.jpeg`
    imgElement.alt = `Meme Template ${imageId}`;
    imgElement.setAttribute("data-filter", `${imageClass}`);

    imgElement.classList.add('meme-template')

    imgElement.addEventListener('click', function () {
        localStorage.setItem('templateInfo', JSON.stringify(meme));
        window.location.href = 'edit.html';
    });

    templates.appendChild(imgElement);
});

// 필터 기능
filterMenu.forEach((filter) => {
    filter.addEventListener("click", () => {
        document.querySelector(".filter-menu li.active").classList.remove("active");
        filter.classList.add("active");

        const activeClass = filter.innerHTML.toLowerCase();
        const memeTemplates = document.querySelectorAll('.templates .meme-template');
        memeTemplates.forEach(meme => {
            meme.style.display = "none";

            // 현재 분류 필터와 == 템플릿의 data-filter일 경우
            if (meme.getAttribute('data-filter') === activeClass || activeClass === "all") {
                meme.style.display = "block";
            }
        })
    })
})