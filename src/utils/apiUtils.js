import 'whatwg-fetch';

// import uuid from 'uuid/v4';
import getAbsoluteUrl from './httpUtils';

// const correlationId = uuid();

function parseError(response) {
  const error = new Error();
  error.message = response.message;
  error.status = response.status;

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then((data) => {
      error.message = data;
      return error;
    });
  }
  return response.text().then((text) => {
    if (text) {
      error.message = text;
    }
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    window.location.href = process.env.MIX_SHOPIFY_APP_URL;
  }

  return parseError(response).then((err) => {
    throw err;
  });
}

function parseJSON(response) {
  try {
    if (response.status === 204) {
      return null;
    }
    return response.json();
  } catch (ex) {
    const error = new Error(response.text());

    error.response = response;
    throw error;
  }
}

function callFetch(url, options) {
  const aUrl = url.startsWith('http') ? url : getAbsoluteUrl(url);
  const aOptions = options || {};
  // aOptions.credentials = 'include';
  return fetch(aUrl, aOptions)
    .then(checkStatus)
    .then(parseJSON);
}

export const getApi = (url, headers) => {
  const options = {
    method: 'GET',
    headers: headers || {},
  };

  // if (aHeaders) {
  //   options.headers = {
  //     correlationId,
  //     ...aHeaders,
  //   };
  // }
  return callFetch(url, options);
};

export const postApi = (url, headers, body) => {
  const options = {
    method: 'POST',
    header: headers || {},
  };

  // if (aHeaders) {
  //   options.headers = {
  //     correlationId,
  //     'content-type': 'application/json',
  //     ...aHeaders,
  //   };
  // }

  if (body) {
    options.body = body;
  }
  return callFetch(url, options);
};
