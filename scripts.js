const selectors = {
    loginButton: '#loginButton',
    logoutButton: '#logoutButton',
    welcomeMessage: '#welcomeMessage',
    sidebar: '#sidebar',
    newNewsButton: '#newNewsButton',
    newsForm: '#newsForm',
    nameForm: '#nameForm',
    newNewsSidebar: '#newNewsSidebar',
    newsTitle: '#newsTitle',
    newsContent: '#newsContent',
    imageURL: '#imageURL',
    videoURL: '#videoURL',
    popup: '#popup',
    userName: '#userName',
    newsContainer: '#newsContainer',
    latestNews: '#latestNews',
    cancelButton: '#cancelButton',
    closePopup: '#closePopup'
};

let userName = '';
let isAdmin = false;
const latestNewsLimit = 5;
let latestNews = [];

function showElement(selector) {
    document.querySelector(selector).style.display = 'block';
}

function hideElement(selector) {
    document.querySelector(selector).style.display = 'none';
}

function clearNewsForm() {
    document.querySelector(selectors.newsForm).reset();
}

function updateLatestNews() {
    const latestNewsList = document.querySelector(selectors.latestNews);
    latestNewsList.innerHTML = '';
    latestNews.forEach(news => {
        const listItem = document.createElement('li');
        listItem.className = 'latest-news-item';

        const newsTitle = document.createElement('span');
        newsTitle.className = 'latest-news-title';
        newsTitle.textContent = news.title;

        const newsAuthor = document.createElement('span');
        newsAuthor.className = 'latest-news-author';
        newsAuthor.textContent = ` - por ${news.author}`;

        listItem.appendChild(newsTitle);
        listItem.appendChild(newsAuthor);

        latestNewsList.appendChild(listItem);
    });
}

document.querySelector(selectors.loginButton).addEventListener('click', function() {
    showElement(selectors.popup);
});

document.querySelector(selectors.closePopup).addEventListener('click', function() {
    hideElement(selectors.popup);
});

document.querySelector(selectors.logoutButton).addEventListener('click', function() {
    userName = '';
    isAdmin = false;
    document.querySelector(selectors.welcomeMessage).textContent = '';
    hideElement(selectors.logoutButton);
    hideElement(selectors.sidebar);
    hideElement(selectors.newNewsButton);
    hideElement(selectors.newsForm);
    showElement(selectors.loginButton);
});

document.querySelector(selectors.nameForm).addEventListener('submit', function(event) {
    event.preventDefault();
    userName = document.querySelector(selectors.userName).value;
    if (userName === 'NmReina' || userName === 'Admin01') {
        isAdmin = true;
    }
    if (userName) {
        hideElement(selectors.popup);
        showElement(selectors.sidebar);
        showElement(isAdmin ? selectors.newNewsButton : selectors.newsForm);
        showElement(selectors.logoutButton);
        const welcomeMessage = document.querySelector(selectors.welcomeMessage);
        welcomeMessage.textContent = `Buen día, ${userName}`;
        hideElement(selectors.loginButton);
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

document.querySelector(selectors.newNewsButton).addEventListener('click', function() {
    showElement(selectors.newNewsSidebar);
    hideElement(selectors.newNewsButton); // Ocultar el botón "Crear Nueva Noticia" al abrir la interfaz
});

document.querySelector(selectors.cancelButton).addEventListener('click', function() {
    hideElement(selectors.newNewsSidebar);
    showElement(selectors.newNewsButton); // Mostrar el botón "Crear Nueva Noticia" al cancelar
});

document.querySelector(selectors.newsForm).addEventListener('submit', function(event) {
    event.preventDefault();

    if (!isAdmin) {
        alert('No tienes permisos para publicar noticias.');
        return;
    }

    const title = document.querySelector(selectors.newsTitle).value;
    const content = document.querySelector(selectors.newsContent).value;
    const imageURL = document.querySelector(selectors.imageURL).value;
    const videoURL = document.querySelector(selectors.videoURL).value;

    if (title && content) {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const newsTitle = document.createElement('h3');
        newsTitle.className = 'news-title';
        newsTitle.textContent = title;

        const newsContent = document.createElement('div');
        newsContent.className = 'news-content';
        newsContent.innerHTML = content;

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';

        if (imageURL) {
            const image = document.createElement('img');
            image.src = imageURL;
            image.className = 'news-image';
            mediaContainer.appendChild(image);
        }

        if (videoURL) {
            const video = document.createElement('iframe');
            video.src = videoURL;
            video.width = '560';
            video.height = '315';
            video.className = 'news-video';
            mediaContainer.appendChild(video);
        }

        const newsAuthor = document.createElement('p');
        newsAuthor.className = 'news-author';
        newsAuthor.textContent = `Publicado por: ${userName}`;

        newsItem.appendChild(newsTitle);
        newsItem.appendChild(newsContent);
        newsItem.appendChild(mediaContainer);
        newsItem.appendChild(newsAuthor);

        document.querySelector(selectors.newsContainer).appendChild(newsItem);

        latestNews.unshift({ title: title, author: userName });
        if (latestNews.length > latestNewsLimit) {
            latestNews.pop();
        }
        updateLatestNews();

        clearNewsForm();
        hideElement(selectors.newNewsSidebar);
        showElement(selectors.newNewsButton); // Mostrar el botón "Crear Nueva Noticia" después de publicar
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0; // Índice de la imagen actual

    // Mostrar la primera imagen y ocultar las demás
    showImage(currentIndex);

    images.forEach(image => {
        image.addEventListener('click', function() {
            // Obtener el índice de la siguiente imagen
            const nextIndex = (currentIndex + 1) % images.length;

            // Ocultar la imagen actual y mostrar la siguiente imagen
            hideImage(currentIndex);
            showImage(nextIndex);

            // Actualizar el índice de la imagen actual
            currentIndex = nextIndex;
        });
    });

    function showImage(index) {
        images[index].style.display = 'block';
    }

    function hideImage(index) {
        images[index].style.display = 'none';
    }
});
