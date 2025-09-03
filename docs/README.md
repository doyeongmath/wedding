# Wedding Invitation Website

박도영 & 손민정 결혼식 초대장 웹사이트

## 📁 Project Structure

```
wedding/
├── public/                 # Public files
│   └── index.html         # Main HTML file
├── src/                   # Source files
│   ├── components/        # Future React/Vue components
│   ├── scripts/          # JavaScript modules
│   │   ├── audio.js      # Audio/Music controller
│   │   ├── countdown.js  # Countdown timer
│   │   ├── gallery.js    # Gallery and lightbox
│   │   ├── utils.js      # Utility functions
│   │   └── main.js       # Main application entry
│   └── styles/           # CSS modules
│       ├── base.css      # Base styles and reset
│       ├── header.css    # Header section styles
│       ├── components.css # Component styles
│       ├── gallery.css   # Gallery and lightbox styles
│       └── responsive.css # Mobile responsive styles
├── assets/               # Static assets
│   ├── images/          # Image assets
│   │   ├── gallery/     # Gallery photos (photo-01.jpg to photo-12.jpg)
│   │   ├── header/      # Header images
│   │   ├── hero/        # Hero section images
│   │   └── background/  # Background images
│   ├── audio/           # Audio files
│   └── fonts/           # Custom fonts
└── docs/                # Documentation
    └── README.md        # This file
```

## 🚀 Features

- **Modern Modular Architecture**: ES6 modules for JavaScript, modular CSS
- **Responsive Design**: Mobile-first approach with optimized touch interactions
- **Gallery System**: Card-based gallery with swipe support and lightbox
- **Audio Controls**: Background music with play/pause functionality
- **Countdown Timer**: Real-time countdown to wedding day
- **Performance Optimized**: GPU acceleration, lazy loading, and optimized animations
- **Touch Friendly**: Swipe gestures, zoom prevention, and touch-optimized UI

## 📱 Responsive Features

- Mobile-first responsive design
- Touch gestures for gallery navigation
- Optimized layouts for phones, tablets, and desktop
- Zoom prevention for mobile devices
- Performance optimizations for smooth scrolling

## 🎨 Image Structure

The website now uses a new organized image structure:

- **Gallery Photos**: `photo-01.jpg` through `photo-12.jpg` in `/assets/images/gallery/`
- **Header Image**: `main-header.jpg` in `/assets/images/header/`
- All images are properly optimized and named for easy management

## 🛠️ Development

### File Organization

- **CSS**: Split into logical modules (base, header, components, gallery, responsive)
- **JavaScript**: Modular ES6 classes with proper encapsulation
- **HTML**: Clean semantic structure with proper accessibility
- **Assets**: Organized by type and purpose

### Key Components

1. **AudioController**: Handles background music functionality
2. **GalleryController**: Manages photo gallery and navigation
3. **LightboxController**: Full-screen image viewing
4. **CountdownTimer**: Wedding countdown functionality
5. **Utils**: General utilities and helpers

## 📋 Wedding Details

- **Date**: 2026년 1월 4일 (일요일)
- **Time**: 오후 1시 40분
- **Venue**: 루이비스컨벤션 송파문정점
- **Location**: 서울 송파구 문정동

## 🔧 Technical Notes

- Uses modern ES6+ features with module system
- Backward compatibility maintained with global function exports
- Performance-optimized with will-change properties and GPU acceleration
- Touch-first design with proper event handling
- Accessible design with proper ARIA attributes and semantic HTML

## 🎯 Future Enhancements

- Component framework integration (React/Vue)
- Advanced animations and transitions
- More interactive features
- Enhanced mobile gestures
- Progressive Web App (PWA) features