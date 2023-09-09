import { searchImages } from './image-api';


const inputValue = document.querySelector("input[name='searchQuery']");
const btn = document.querySelector('button');
console.log(btn);
const gallery = document.querySelector('.gallery');



btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const value = inputValue.value;
    console.log(value);

    const response = await searchImages(value);
    console.log(response);
    
    const markup = response.data.hits.map(item =>
        `<div class="photo-card">
        <div class="container">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="400" height="250"/>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b>
            <span> ${item.likes}</span>
          </p>
          <p class="info-item">
            <b>Views:</b>
            <span>${item.views}</span>
          </p>
          <p class="info-item">
            <b>Comments:</b>
            <span>${item.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads:</b>
            <span>${item.downloads}</span>
          </p>
        </div>
        </div>
      </div>`
    ).join('');
    gallery.innerHTML = markup;
});

