// Error codes for the application
export const ECODE = {
  SUCCESS: 0,
  FAIL: -1,
  UNKNOWN_EXCEPTION: -1000,
  NOT_EXISTS: -1001,
  EXISTED: -1002,
  INVALID_PARAMS: -1003,
  SESSION_INVALID: -1004,
  PERMISSION_DENIED: -1005,
  NOT_SUPPORT: -1008,
  METHOD_NOT_FOUND: -1010,
  ITEM_ACCESS_DENIED: -1012,
};

// Authentication domains for different environments
export const AUTH_DOMAIN = {
  'dev-admin.kido.vn': 'dev-id.kido.vn',
  'sb-admin.kido.vn': 'sb-id.kido.vn',
  'admin.kido.vn': 'id.kido.vn',
  'localhost': 'sb-id.kido.vn', // For local development
};

// Define resource paths based on environment
export const RESOURCE_PATHS = {
  CSS_PATH: '/src/index.css', // Use local CSS instead of umi.css
};

export default {
  API_DOMAIN: '/api',
};