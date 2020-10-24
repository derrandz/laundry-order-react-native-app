const CommonHeaders = {
  'Content-Type': 'application/json',
};

const Routes = {
  SignIn: {
    url: '/api/v1/users/sign-in',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer {token}',
    }
  },
  Authenticate: {
    url: '/api/v1/users/authenticate',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer {token}',
    },
  },
  CreateOrder: {
    url: '/api/v1/order',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer {token}',
    }
  },
  GetMyOrders: {
    url: '/api/v1/users/orders',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer {token}',
    },
  },
  GetAllOrders: {
    url: '/api/v1/orders',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer {token}',
    }
  },
  GetAllUsers: {
    url: '/api/v1/users',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer {token}',
    }
  },
};

const performRequest = (routeName) => (token, data) => {
  const {
    url, method, headers,
  } = Routes[routeName];

  headers.Authorization.replace(/{token}/, token);

  return fetch(url, {
    method,
    headers: {
      ...headers,
      ...CommonHeaders
    },
    body: data,
  }).then(
    (response) => response.json()
  );
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
