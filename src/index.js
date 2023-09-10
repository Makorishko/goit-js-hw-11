import { searchImages } from './image-api';
import Notiflix from 'notiflix';

const inputValue = document.querySelector("input[name='searchQuery']");
const btn = document.querySelector('.submit');
const gallery = document.querySelector('.gallery');
const bntLoad = document.querySelector('.load-more');
bntLoad.style.display = 'none';
let page = 1;

btn.addEventListener('click', async e => {
  e.preventDefault();
  const value = inputValue.value;
  page = 1;

  try {
    const response = await searchImages(value, 1);
    console.log(response);
    fillGallery(response.data.hits, true);
    checkEndNotifyUser(response.data);
  } catch (e) {
    Notiflix.Notify.failure('SMTH went wrong');
  }
});

bntLoad.addEventListener('click', async e => {
  const value = inputValue.value;
  try {
    const response = await searchImages(value, page + 1);
    page += 1;
    fillGallery(response.data.hits);
    checkEndNotifyUser(response.data);
  } catch (e) {
    Notiflix.Notify.failure('SMTH went wrong');
  }
});

function fillGallery(data, isInitial) {
  const markup = data
    .map(
      item =>
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
    )
    .join('');
  if (isInitial) {
    gallery.innerHTML = markup;
    return;
  }
  gallery.insertAdjacentHTML('beforeend', markup);
}

function checkEndNotifyUser(data) {
  const lastPage = Math.ceil(data.totalHits / 40);
  if (lastPage === page) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    bntLoad.style.display = 'none';
    return;
  }
  if (!lastPage) {
    Notiflix.Notify.failure("We're sorry, but there no result for your search.");
    bntLoad.style.display = 'none';
    return;
  }
  bntLoad.style.display = 'block';
}
