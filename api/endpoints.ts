const AUTHENTICATION = "authentication";
const COMMUNICATION = "communication";
const LOGGING = "logging";

const getEndpoint = (endpoint: any) => {
  switch (endpoint) {
    case AUTHENTICATION:
      return process.env.PAPER_STREET_AUTHENTICATION_API;
    case COMMUNICATION:
      return process.env.PAPER_STREET_COMMUNICATION_API;
    case LOGGING:
      return process.env.PAPER_STREET_LOGGING_API;
    default:
      return "";
  }
};

export { getEndpoint, AUTHENTICATION, COMMUNICATION, LOGGING };
