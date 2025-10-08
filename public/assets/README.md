# Public Assets

This folder contains assets that are served directly from the public URL and don't require bundling.

## 📁 Structure

```
public/assets/
├── images/          # Static images accessible via URL
├── icons/           # Static icons
├── logos/           # Static logos
└── README.md       # This documentation
```

## 🌐 Usage

These assets are accessible directly via URL:
- `/assets/images/example.jpg`
- `/assets/icons/icon.svg`
- `/assets/logos/logo.png`

## 📝 Best Practices

1. **Use for large files** that don't need bundling
2. **Optimize for web** performance
3. **Use descriptive names** for easy identification
4. **Keep organized** by type and purpose
5. **Consider CDN** for production deployment

## ⚠️ Important Notes

- Files here are **not processed** by the build system
- Changes require **manual optimization**
- Use **absolute paths** when referencing
- Consider **caching strategies** for production


