export const errorMessages = Object.freeze({
  INCOMING_NETWORK_ERROR: 'Network Error',
  NETWORK_ERROR_MESSAGE:
    'A network error has occured, please make sure you are online. If the error persists please contact the support team',
  SESSION_EXPIRED_MESSAGE: 'Your session has expired, please login again',
  SERVER_ERROR_MESSAGE: 'Server error - check the terminal for more info',
  NOT_FOUND_ERROR_MESSAGE: 'The request resulted in a 404 error',
  CATASTROPHIC_ERROR_MESSAGE:
    'A catastrophic error has occured, please contact the system admin',
  LOGOUT_FAILED:
    'An error has occured whilst trying to log you out. Please try again or contact the system administrator',
});

export const routes = Object.freeze({
  LOGIN: '/login',
  NOT_FOUND: '/notfound',
  HOME: '/dashboard',
});
