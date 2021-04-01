import makeRequest from './makeRequest';

export function getCategories() {
  return makeRequest('categories', 'categories');
}

export function getFeaturedPlaylists() {
  return makeRequest('featured-playlists', 'playlists');
}

export function getNewReleases() {
  return makeRequest('new-releases', 'albums');
}