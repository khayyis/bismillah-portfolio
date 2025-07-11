/**
 * File indeks untuk mengekspor semua konfigurasi
 * Ini memudahkan penggunaan konfigurasi di seluruh aplikasi
 */

import userInfo from './userInfo';
import projectsConfig from './projectsConfig';
import skillsConfig from './skillsConfig';
import themeConfig from './themeConfig';
import siteConfig from './siteConfig';
import socialConfig from './socialConfig';

export {
  userInfo,
  projectsConfig,
  skillsConfig,
  themeConfig,
  siteConfig,
  socialConfig,
};

// Ekspor default untuk memudahkan import semua konfigurasi sekaligus
export default {
  userInfo,
  projectsConfig,
  skillsConfig,
  themeConfig,
  siteConfig,
  socialConfig,
};