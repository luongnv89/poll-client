import { getApi, postApi } from './apiUtils';

const getUID = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

export { getApi, postApi, getUID };
