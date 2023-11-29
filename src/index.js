import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

async function init() {
  try {
    showLoader();
    const breeds = await fetchBreeds();
    populateBreedsSelect(breeds);
  } catch (e) {
    showError();
  } finally {
    hideLoader();
    breedSelect.classList.add('loaded'); // Додаємо клас для відображення вікна вибору після завантаження даних
  }
}

function populateBreedsSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });

  breedSelect.addEventListener('change', handleBreedSelect);
}

async function handleBreedSelect() {
  const selectedBreedId = breedSelect.value;

  try {
    breedSelect.classList.remove('loaded'); // Приховуємо вікно вибору перед завантаженням даних
    showLoader();
    error.style.display = 'none';
    catInfo.innerHTML = '';

    loader.innerText = 'Loading data, please wait...';
    const catData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catData);
  } catch (e) {
    showError();
  } finally {
    breedSelect.classList.add('loaded'); // Відображаємо вікно вибору після завантаження даних
    hideLoader();
    loader.innerText = '';
  }
}

function displayCatInfo(catData) {
  const image = document.createElement('img');
  image.src = catData.url;
  image.alt = 'Cat';
  catInfo.appendChild(image);

  const infoDiv = document.createElement('div');
  infoDiv.innerHTML = `<p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
                       <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
                       <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>`;
  catInfo.appendChild(infoDiv);
}

function showError() {
  hideLoader();
  error.style.display = 'block';
}

function showLoader() {
  loader.classList.add('visible');
  error.style.display = 'none';
}

function hideLoader() {
  loader.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', function () {
  const breedSelect = new SlimSelect('.breed-select');
});
