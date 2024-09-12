const memeTemplates = document.getElementById('meme-templates');

for (let i=1; i<9; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = `https://raw.githubusercontent.com/suminb99/2024-MYP/main/assets/images/img${i}.jpeg`;
    imgElement.alt = `Meme Template ${i}`;
    
    imgElement.classList.add('meme-template')

    imgElement.addEventListener('click', function() {
        localStorage.setItem('selectedTemp', i);
        window.location.href = 'edit.html';
    });

    memeTemplates.appendChild(imgElement);
}