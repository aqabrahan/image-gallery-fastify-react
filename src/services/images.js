import restClient from './restClient';

export const getImages = () => {
  return restClient.get('/gallery');
}

export const uploadImage = (body) => {
  return restClient.post('/gallery', body);
}