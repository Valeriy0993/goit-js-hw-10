import axios from 'axios';

const apiKey =
  'live_y0ccoOlM9bib0JmMZVUgfi3CUgB7S20dLS3NrmmjPXafVpdBzscowbsluEkMXu6Z';
axios.defaults.headers.common['x-api-key'] = apiKey;

export async function fetchBreeds() {
  try {
    showLoader();
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    hideLoader();
    return response.data;
  } catch (error) {
    hideLoader();
    console.error('Error fetching breeds:', error);
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    showLoader();
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    hideLoader();
    return response.data[0];
  } catch (error) {
    hideLoader();
    console.error('Error fetching cat by breed:', error);
    throw error;
  }
}

function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('visible');
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visible');
}
