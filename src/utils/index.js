import { getApi, postApi } from './apiUtils';

const getUID = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const getLastURLPath = (url) => {
  const array = url.split('/');
  return array[array.length - 1];
};

export { getApi, postApi, getUID, getLastURLPath };
