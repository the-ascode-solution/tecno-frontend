# Assets Organization Guide

This folder contains all static assets for the survey application. Assets are organized by type and usage to ensure maintainability and easy access.

## 📁 Folder Structure

```
assets/
├── images/
│   ├── icons/
│   │   └── svg/           # SVG icons for UI elements
│   ├── logos/
│   │   └── svg/           # Company and app logos
│   ├── backgrounds/       # Background images
│   ├── illustrations/     # Custom illustrations
│   ├── photos/           # Photographic content
│   ├── avatars/          # User profile pictures
│   ├── banners/          # Promotional banners
│   ├── thumbnails/       # Preview images
│   ├── ui-elements/      # Interface graphics
│   └── placeholders/     # Development placeholders
├── fonts/                # Custom fonts
├── videos/               # Video files
├── audio/                # Audio files
└── README.md            # This documentation
```

## 🖼️ Image Guidelines

### Supported Formats
- **SVG**: For icons, logos, and scalable graphics
- **PNG**: For images with transparency
- **JPG**: For photographic content
- **WebP**: For optimized web images (with fallbacks)

### Recommended Sizes

#### Icons
- **Small icons**: 16x16, 24x24, 32x32
- **Medium icons**: 48x48, 64x64
- **Large icons**: 128x128, 256x256

#### Logos
- **App logo**: 200x60 (horizontal)
- **Square logo**: 256x256
- **Favicon**: 32x32, 16x16

#### Backgrounds
- **Hero backgrounds**: 1920x1080 or larger
- **Section backgrounds**: 1200x800 or larger
- **Mobile backgrounds**: 768x1024

#### Banners
- **Desktop banners**: 1200x300 or 1920x400
- **Mobile banners**: 768x200 or 1024x250

#### Thumbnails
- **Product thumbnails**: 300x300
- **Preview images**: 400x400
- **Small thumbnails**: 150x150

## 🎨 Usage in Components

### Importing Images
```javascript
// Import SVG icons
import CheckmarkIcon from '../assets/images/icons/svg/checkmark.svg';

// Import PNG/JPG images
import BackgroundImage from '../assets/images/backgrounds/hero-bg.jpg';

// Import logos
import TecnoLogo from '../assets/images/logos/svg/tecno-logo.svg';
```

### Using in JSX
```jsx
// SVG icons
<img src={CheckmarkIcon} alt="Checkmark" className="icon" />

// Background images
<div style={{ backgroundImage: `url(${BackgroundImage})` }} />

// Logos
<img src={TecnoLogo} alt="TECNO Logo" className="logo" />
```

### CSS Background Images
```css
.hero-section {
  background-image: url('../assets/images/backgrounds/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

## 📱 Responsive Images

### Using Different Sizes
```jsx
<picture>
  <source media="(max-width: 768px)" srcSet={mobileImage} />
  <source media="(min-width: 769px)" srcSet={desktopImage} />
  <img src={desktopImage} alt="Responsive image" />
</picture>
```

### WebP with Fallback
```jsx
<picture>
  <source srcSet={imageWebP} type="image/webp" />
  <source srcSet={imageJPG} type="image/jpeg" />
  <img src={imageJPG} alt="Optimized image" />
</picture>
```

## 🔧 Optimization Tips

### Image Optimization
1. **Compress images** before adding to assets
2. **Use appropriate formats** (SVG for icons, WebP for photos)
3. **Provide multiple sizes** for responsive design
4. **Use lazy loading** for below-the-fold images

### Performance
1. **Preload critical images** in the document head
2. **Use `loading="lazy"`** for non-critical images
3. **Optimize file sizes** without compromising quality
4. **Consider using a CDN** for production

### Accessibility
1. **Always provide alt text** for images
2. **Use descriptive alt text** for informative images
3. **Use empty alt=""** for decorative images
4. **Consider color contrast** in images with text

## 📝 Naming Conventions

### File Naming
- Use **kebab-case**: `hero-background.jpg`
- Be **descriptive**: `tecno-phone-mockup.png`
- Include **size if relevant**: `logo-256x256.png`
- Use **version numbers** for updates: `banner-v2.jpg`

### Folder Organization
- Group by **type** first, then by **feature**
- Use **consistent naming** across folders
- Keep **related assets** together
- Use **subfolders** for large collections

## 🚀 Best Practices

1. **Keep assets organized** by type and usage
2. **Optimize for web** performance
3. **Use semantic naming** conventions
4. **Provide fallbacks** for newer formats
5. **Document asset usage** in components
6. **Regular cleanup** of unused assets
7. **Version control** for asset changes

## 🔍 Asset Discovery

### Finding Assets
- Check the **appropriate folder** by asset type
- Look for **naming patterns** in file names
- Use **IDE search** for asset references
- Check **component imports** for usage

### Adding New Assets
1. **Choose the right folder** based on asset type
2. **Follow naming conventions**
3. **Optimize the asset** for web use
4. **Update this documentation** if needed
5. **Test in different browsers** and devices

## 📞 Support

For questions about asset organization or usage, refer to:
- This documentation
- Component examples in the codebase
- Web performance best practices
- Accessibility guidelines


