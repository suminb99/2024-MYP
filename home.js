const memeTemplates = document.getElementById('meme-templates');
import memeImages from './images.js';

memeImages.forEach(function(meme) {
    console.log(typeof(meme));
    const imageId = meme['img'];
    const imgElement = document.createElement('img');
    imgElement.src = `./assets/images/img${imageId}.jpeg`
    imgElement.alt = `Meme Template ${imageId}`;

    imgElement.classList.add('meme-template')

    imgElement.addEventListener('click', function() {
        localStorage.setItem('templateInfo', JSON.stringify(meme));
        window.location.href = 'edit.html';
    });

    memeTemplates.appendChild(imgElement);
})