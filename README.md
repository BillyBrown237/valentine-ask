# 💝 Dynamic Valentine's Day Card

An interactive Valentine's Day card with a dynamic name feature using URL parameters.

## 📁 Project Structure

```
valentine-card/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## 🚀 How to Use

### Basic Usage (No Name)
Simply open `index.html` in a browser:
```
index.html
```
Shows: "Will you be my Valentine?"

### Personalized Usage (With Name)
Add a `?name=` parameter to the URL:

**Examples:**
```
index.html?name=Sarah
index.html?name=Michael
index.html?name=Alex
index.html?name=Jamie
```

**Results:**
- `?name=sarah` → "Sarah, will you be my Valentine?"
- `?name=MICHAEL` → "Michael, will you be my Valentine?"
- `?name=alex` → "Alex, will you be my Valentine?"

The name is automatically capitalized (first letter uppercase, rest lowercase).

## ✨ Features

1. **Dynamic Name**: Personalize the card using URL parameters
2. **Fully Responsive**: Adapts to all screen sizes and orientations
    - Mobile phones (portrait & landscape)
    - Tablets
    - Desktops
    - Ultra-wide screens
3. **Interactive Buttons**:
    - "No" button runs away from the cursor/touch
    - "Yes" button grows larger as you chase "No"
    - Adaptive behavior based on screen size
4. **Confetti Celebration**: Full-screen confetti explosion when "Yes" is clicked
5. **Touch Optimized**: Enhanced mobile experience with proper touch targets
6. **Accessibility**:
    - Respects reduced motion preferences
    - Proper contrast ratios
    - Touch-friendly button sizes (min 44px)
7. **Dark Mode Support**: Automatically adapts to system preference
8. **Performance Optimized**: Fewer particles on mobile for smooth animation

### Responsive Breakpoints

- **Small phones** (≤360px): Compact layout, smaller buttons
- **Standard phones** (361px-768px): Optimized mobile experience
- **Landscape mode**: Adjusted height for better fit
- **Tablets** (768px-1024px): Medium-sized elements
- **Desktop** (1024px-1440px): Full-sized layout
- **Large screens** (≥1440px): Extra spacing and larger elements
- **Short screens** (height ≤600px): Compressed vertical spacing

## 🎨 Customization

### Change Colors
Edit `styles.css` variables:
```css
:root {
  --bg1: #ffd6e7;      /* Background gradient color 1 */
  --bg2: #ffeef6;      /* Background gradient color 2 */
  --card: #ffffffcc;   /* Card background */
  --yes: #ff3b7a;      /* Yes button color */
  --yesHover: #ff1f68; /* Yes button hover color */
}
```

### Change Question Format
Edit `script.js` in the `setPersonalizedQuestion()` function:
```javascript
// Change this line:
question.textContent = `${capitalizedName}, will you be my Valentine?`;

// To something like:
question.textContent = `Hey ${capitalizedName}, be my Valentine?`;
```

### Adjust "No" Button Behavior
Edit `script.js`:
```javascript
// Distance before "No" starts running (default: 140px)
if (d < 140) moveNo(e.clientX, e.clientY);

// Speed of running away (default: 150px)
let newLeft = (b.left - z.left) + dx * 150;
let newTop  = (b.top - z.top) + dy * 150;

// How much "Yes" grows (default: max 2.2x)
yesScale = Math.min(2.2, yesScale + 0.1);
```

## 🌐 Deployment

### GitHub Pages
1. Create a repository
2. Upload all files
3. Enable GitHub Pages
4. Share link: `https://username.github.io/repo-name/?name=YourName`

### Netlify/Vercel
1. Drag and drop folder to deploy
2. Share link: `https://your-site.netlify.app/?name=YourName`

### Local Server
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000/?name=YourName
```

## 💡 Tips

- **Multiple names**: Create different links for different people
- **Special characters**: Use URL encoding for special characters
    - Spaces: `?name=Mary%20Jane`
    - Accents: `?name=José` (usually works automatically)
- **No tracking**: The name stays in the URL, never sent to a server
- **Private**: Works completely offline - no data collection

## 🔧 Technical Details

- **Pure JavaScript**: No framework dependencies
- **External Library**: canvas-confetti (CDN)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Friendly**: Touch events supported with enhanced mobile detection
- **Responsive Method**: CSS clamp(), media queries, viewport units
- **Performance**: Adaptive particle counts based on device capabilities

### Responsive Features
- **Adaptive Touch Distance**: Buttons react differently based on screen size
- **Smart Scaling**: Yes button grows less on mobile to prevent overflow
- **Touch Events**: Both pointer and touch events for maximum compatibility
- **Orientation Handling**: Automatic layout adjustments on device rotation
- **Safe Areas**: Respects iPhone notches with viewport-fit=cover

## 📱 Testing on Mobile

To test on your phone:
1. **Local Network**:
   ```bash
   python -m http.server 8000
   # Then visit: http://YOUR_IP:8000/?name=Test
   ```

2. **Online Deployment**: Use GitHub Pages, Netlify, or Vercel

3. **Browser DevTools**:
    - Chrome: F12 → Toggle Device Toolbar
    - Test various screen sizes and orientations

## 📝 License

Free to use and modify for personal use!

---

Made with ❤️ for Valentine's Day