// Asset imports and exports
// This file provides easy access to all assets throughout the application

// Icons
export { default as CheckmarkIcon } from './images/icons/svg/checkmark.svg';
export { default as DropdownArrowIcon } from './images/icons/svg/dropdown-arrow.svg';
export { default as PhoneIcon } from './images/icons/svg/phone.svg';
export { default as UserIcon } from './images/icons/svg/user.svg';
export { default as MailIcon } from './images/icons/svg/mail.svg';
export { default as CameraIcon } from './images/icons/svg/camera.svg';

// Logos
export { default as LogoImage } from './images/logos/logo-img.png';

// Hero Images
export { default as HeroImage } from './hero/image.png';

// Asset utility functions
export const getImagePath = (category, filename) => {
  return require(`./images/${category}/${filename}`).default;
};

export const getIconPath = (filename) => {
  return require(`./images/icons/svg/${filename}`).default;
};

export const getLogoPath = (filename) => {
  return require(`./images/logos/${filename}`).default;
};

// Asset constants for commonly used paths
export const ASSET_PATHS = {
  ICONS: {
    CHECKMARK: require('./images/icons/svg/checkmark.svg').default,
    DROPDOWN_ARROW: require('./images/icons/svg/dropdown-arrow.svg').default,
    PHONE: require('./images/icons/svg/phone.svg').default,
    USER: require('./images/icons/svg/user.svg').default,
    MAIL: require('./images/icons/svg/mail.svg').default,
    CAMERA: require('./images/icons/svg/camera.svg').default,
  },
  LOGOS: {
    LOGO_IMG: require('./images/logos/logo-img.png').default,
  },
  HERO: {
    IMAGE: require('./hero/image.png').default,
  },
};

// Helper function to preload images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Helper function to preload multiple images
export const preloadImages = (srcs) => {
  return Promise.all(srcs.map(preloadImage));
};
