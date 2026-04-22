const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const API_ENDPOINTS = {
  FORM: {
    SUBMIT: `${BASE_URL}/form/submit`,
  },
  
  ENQUIRY: {
    SUBMIT: `${BASE_URL}/enquiries/submit`,
  },

  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    GET_ME: `${BASE_URL}/auth/me`,
  },

  SERVICES: {
    GET_ALL: (query = "") => `${BASE_URL}/services${query}`,
    GET_BY_ID: (id) => `${BASE_URL}/services/${id}`,
    CREATE: `${BASE_URL}/services`,
    UPDATE: (id) => `${BASE_URL}/services/${id}`,
    DELETE: (id) => `${BASE_URL}/services/${id}`,
  },

  PACKAGES: {
    GET_ALL: (query = "") => `${BASE_URL}/packages${query}`,
    GET_BY_ID: (id) => `${BASE_URL}/packages/${id}`,
    CREATE: `${BASE_URL}/packages`,
    UPDATE: (id) => `${BASE_URL}/packages/${id}`,
    DELETE: (id) => `${BASE_URL}/packages/${id}`,
  },

  POSTS: {
    GET_ALL: (query = "") => `${BASE_URL}/posts${query}`,
    GET_BY_SLUG: (slug) => `${BASE_URL}/posts/${slug}`,
    CREATE: `${BASE_URL}/posts`,
    UPDATE: (id) => `${BASE_URL}/posts/${id}`,
    DELETE: (id) => `${BASE_URL}/posts/${id}`,
  },

  DESTINATIONS: {
    GET_ALL: `${BASE_URL}/destinations`,
    GET_BY_ID: (id) => `${BASE_URL}/destinations/${id}`,
    CREATE: `${BASE_URL}/destinations`,
    UPDATE: (id) => `${BASE_URL}/destinations/${id}`,
    DELETE: (id) => `${BASE_URL}/destinations/${id}`,
  },

  TESTIMONIALS: {
    GET_ALL: `${BASE_URL}/testimonials`,
    CREATE: `${BASE_URL}/testimonials`,
    UPDATE: (id) => `${BASE_URL}/testimonials/${id}`,
    DELETE: (id) => `${BASE_URL}/testimonials/${id}`,
  },
};

export default API_ENDPOINTS;