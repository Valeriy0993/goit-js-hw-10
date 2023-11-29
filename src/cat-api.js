import axios from 'axios';

const APIKEY =
  'live_y0ccoOlM9bib0JmMZVUgfi3CUgB7S20dLS3NrmmjPXafVpdBzscowbsluEkMXu6Z';
axios.defaults.headers.common['x-api-key'] = APIKEY;

const BASEURL = 'https://api.thecatapi.com/v1/';

export async function fetchBreeds() {
  try {
    const response = await axios.get(`${BASEURL}breeds`);
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `${BASEURL}images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
    throw error;
  }
}
