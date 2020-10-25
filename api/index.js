const apiRootUrl = 'http://b4f3613a9bcd.ngrok.io';

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

  return fetch(`${apiRootUrl}${url}`, {
    method,
    headers: finalHeaders,
    body: data,
  }).then(
    (response) => response.json()
  ).then((jsonResponse) => {
    if (jsonResponse.status === 'failure') {
      throw jsonResponse.data;
    } else if (jsonResponse.status === 'success') {
      return jsonResponse.data;
    } else {
      return jsonResponse;
    }
  });
}

const SignIn = performRequest('SignIn');
const Authenticate = performRequest('SignIn');
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
