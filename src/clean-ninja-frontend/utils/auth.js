import { mockUserId } from '../src/mocks/mockData';

// Variabel global untuk menyimpan state authentication
let isAuthenticatedState = false;

/**
 * Cek apakah pengguna terotentikasi
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  return Promise.resolve(isAuthenticatedState);
};

/**
 * Login sederhana untuk aplikasi
 * @returns {Promise<boolean>}
 */
export const login = async () => {
  return new Promise((resolve) => {
    // Simulasi proses login
    setTimeout(() => {
      isAuthenticatedState = true;
      resolve(true);
    }, 500);
  });
};

/**
 * Logout
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return new Promise((resolve) => {
    // Simulasi proses logout
    setTimeout(() => {
      isAuthenticatedState = false;
      resolve();
    }, 200);
  });
};

/**
 * Dapatkan ID pengguna yang sedang login
 * @returns {Promise<string|null>}
 */
export const getUserId = async () => {
  if (isAuthenticatedState) {
    return mockUserId;
  }
  return null;
};