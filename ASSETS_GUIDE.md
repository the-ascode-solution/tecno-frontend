# Assets Management Guide

This guide provides comprehensive information about managing and using assets in the survey application.

## 🎯 Overview

The application uses a dual-asset system:
- **`src/assets/`** - Bundled assets processed by webpack
- **`public/assets/`** - Static assets served directly

## 📂 Asset Organization

### Source Assets (`src/assets/`)
```
src/assets/
├── images/
│   ├── icons/svg/          # UI icons (bundled)
│   ├── logos/svg/          # App logos (bundled)
│   ├── backgrounds/        # Background images
│   ├── illustrations/      # Custom graphics
│   ├── photos/            # Photographic content
│   ├── avatars/           # Profile pictures
│   ├── banners/           # Promotional banners
│   ├── thumbnails/        # Preview images
│   ├── ui-elements/       # Interface graphics
│   └── placeholders/      # Development placeholders
├── fonts/                 # Custom fonts
├── videos/                # Video files
├── audio/                 # Audio files
├── index.js              # Asset exports
└── README.md             # Detailed documentation
```

### Public Assets (`public/assets/`)
```
public/assets/
├── images/               # Static images
├── icons/                # Static icons
├── logos/                # Static logos
└── README.md            # Usage documentation
```

## 🚀 Quick Start

### 1. Adding New Icons
```javascript
// Add SVG to src/assets/images/icons/svg/
// Import in component
import { CheckmarkIcon } from '../assets';

// Use in JSX
<img src={CheckmarkIcon} alt="Checkmark" className="icon" />
```

### 2. Adding Background Images
```javascript
// Add image to src/assets/images/backgrounds/
import BackgroundImage from '../assets/images/backgrounds/hero-bg.jpg';

// Use in component
<div style={{ backgroundImage: `url(${BackgroundImage})` }} />
```

### 3. Using Static Assets
```javascript
// Files in public/assets/ are accessible via URL
<img src="/assets/images/static-image.jpg" alt="Static Image" />
```

## 📋 Asset Types & Guidelines

### Icons
- **Format**: SVG preferred, PNG for complex icons
- **Size**: 16x16 to 256x256 pixels
- **Usage**: UI elements, buttons, navigation
- **Location**: `src/assets/images/icons/svg/`

### Logos
- **Format**: SVG for scalability, PNG with transparency
- **Size**: 200x60 (horizontal), 256x256 (square)
- **Usage**: Branding, headers, footers
- **Location**: `src/assets/images/logos/svg/`

### Backgrounds
- **Format**: JPG for photos, PNG for graphics
- **Size**: 1920x1080 or larger
- **Usage**: Hero sections, page backgrounds
- **Location**: `src/assets/images/backgrounds/`

### Illustrations
- **Format**: SVG for simple, PNG for complex
- **Usage**: Decorative elements, empty states
- **Location**: `src/assets/images/illustrations/`

### Photos
- **Format**: JPG, WebP for optimization
- **Usage**: Content images, testimonials
- **Location**: `src/assets/images/photos/`

## 🔧 Development Workflow

### Adding Assets
1. **Choose appropriate folder** based on asset type
2. **Optimize asset** for web use
3. **Follow naming conventions** (kebab-case)
4. **Update asset index** if needed
5. **Test in components**

### Asset Optimization
```javascript
// Image optimization checklist
- Compress file size
- Use appropriate format
- Provide multiple sizes for responsive design
- Include alt text for accessibility
- Consider lazy loading for performance
```

### Performance Considerations
```javascript
// Preload critical assets
import { preloadImage, preloadImages } from '../assets';

// Preload single image
await preloadImage(BackgroundImage);

// Preload multiple images
await preloadImages([Image1, Image2, Image3]);
```

## 📱 Responsive Images

### Picture Element
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

## 🎨 Styling Assets

### CSS Background Images
```css
.hero-section {
  background-image: url('../assets/images/backgrounds/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

### Dynamic Backgrounds
```javascript
const HeroSection = ({ backgroundImage }) => (
  <div 
    className="hero-section"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  />
);
```

## ♿ Accessibility

### Alt Text Guidelines
```jsx
// Informative images
<img src={chartImage} alt="Survey results showing 75% satisfaction rate" />

// Decorative images
<img src={decorativeImage} alt="" />

// Complex images
<img src={complexImage} alt="Detailed infographic about survey methodology" />
```

### Color Contrast
- Ensure sufficient contrast in images with text
- Provide text alternatives for image content
- Use semantic markup for image context

## 🔍 Asset Discovery

### Finding Assets
1. **Check asset index** (`src/assets/index.js`)
2. **Browse folder structure** by type
3. **Search by filename** in IDE
4. **Check component imports** for usage examples

### Asset References
```javascript
// Common asset paths
import { ASSET_PATHS } from '../assets';

// Use predefined paths
<img src={ASSET_PATHS.ICONS.CHECKMARK} alt="Checkmark" />
<img src={ASSET_PATHS.LOGOS.TECNO} alt="TECNO Logo" />
```

## 🚀 Production Deployment

### Build Optimization
- Assets in `src/assets/` are automatically optimized
- Static assets in `public/assets/` require manual optimization
- Consider using a CDN for static assets

### Caching Strategy
```javascript
// Set appropriate cache headers
// Use versioned filenames for cache busting
// Implement proper cache invalidation
```

## 📊 Asset Monitoring

### Performance Metrics
- Monitor asset loading times
- Track bundle sizes
- Measure Core Web Vitals impact
- Analyze asset usage patterns

### Tools
- **Webpack Bundle Analyzer** for bundle analysis
- **Lighthouse** for performance auditing
- **Chrome DevTools** for loading analysis

## 🔧 Troubleshooting

### Common Issues
1. **Asset not loading**: Check file path and import syntax
2. **Large bundle size**: Optimize images and use code splitting
3. **Slow loading**: Implement lazy loading and compression
4. **Missing alt text**: Add descriptive alt attributes

### Debug Tips
```javascript
// Check asset imports
console.log(ImagePath); // Should show resolved path

// Verify asset loading
const img = new Image();
img.onload = () => console.log('Image loaded successfully');
img.onerror = () => console.error('Image failed to load');
img.src = ImagePath;
```

## 📚 Additional Resources

- [Web Performance Best Practices](https://web.dev/performance/)
- [Image Optimization Guide](https://web.dev/fast/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [SVG Optimization Tools](https://jakearchibald.github.io/svgomg/)

## 📞 Support

For asset-related questions:
1. Check this guide and folder documentation
2. Review existing component implementations
3. Consult web performance best practices
4. Test in multiple browsers and devices


