import Constants from 'expo-constants';

console.log({
  Manifest: Constants.manifest,
})
const apiRootUrl = Constants.manifest.extra.apiUrl;

const CommonHeaders = {
  'Content-Type': 'application/json',
};

const Routes = {
  SignIn: {
    url: '/api/v1/users/sign-in',
    method: 'POST',
  },
  Authenticate: {
    url: '/api/v1/users/authenticate',
    method: 'POST',
  },
  CreateOrder: {
    url: '/api/v1/order',
    method: 'POST',
  },
  GetMyOrders: {
    url: '/api/v1/users/orders',
    method: 'GET',
  },
  GetAllOrders: {
    url: '/api/v1/orders',
    method: 'GET',
  },
  GetAllUsers: {
    url: '/api/v1/users',
    method: 'GET',
  },
};

const performRequest = (routeName) => (token, data) => {
  const { url, method, headers } = Routes[routeName];

  const finalHeaders = {
    ...CommonHeaders,
    ...headers,
    ...{ 'Cookie': `token="${token}" ; HttpOnly` },
  };

  const requestOptions = method === "POST"
    ? {
      method,
      headers: finalHeaders,
      body: JSON.stringify(data || {}),
  } : {
    method,
    headers: finalHeaders,
  }

  return fetch(`${apiRootUrl}${url}`, requestOptions).then(
    (response) => {
      console.log({ response });
      try {
        return response.json();
      } catch (err) {
        console.log('this is in here');
        throw err;
      }
    }
  ).then((jsonResponse) => {
    if (jsonResponse.status === 'failure') {
      console.error('fetch failed:', jsonResponse);
      throw jsonResponse.data;
    } else if (jsonResponse.status === 'success') {
      return jsonResponse.data;
    } else {
      return jsonResponse;
    }
  });
}

const SignIn = performRequest('SignIn');
const Authenticate = performRequest('Authenticate');
const CreateOrder = performRequest('CreateOrder');
const GetMyOrders = performRequest('GetMyOrders');
const GetAllOrders = performRequest('GetAllOrders');
const GetAllUsers = performRequest('GetAllUsers');

export {
  SignIn,
  Authenticate,
  CreateOrder,
  GetMyOrders,
  GetAllOrders,
  GetAllUsers,
}
