const HTTP_STATUS = {
  SUCCESS: {
    statusCode: 200,
    errorMessage: '',
  },
  BAD_REQUEST: {
    statusCode: 400,
    errorMessage: 'Bad Request!',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    errorMessage: 'Unauthorized!',
  },
  FORBIDDEN: {
    statusCode: 403,
    errorMessage: 'Forbidden!',
  },
  NOT_FOUND: {
    statusCode: 404,
    errorMessage: 'Not Found!',
  },
  SERVER_ERROR: {
    statusCode: 404,
    errorMessage: 'Internal Server Error!',
  },
  BAD_GATEWAY: {
    statusCode: 502,
    errorMessage: 'Bad Gateway!',
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    errorMessage: 'Service Unavailable!',
  },
  GATEWAY_TIMEOUT: {
    statusCode: 504,
    errorMessage: 'Internal Server Error!',
  }
};

export default HTTP_STATUS;
