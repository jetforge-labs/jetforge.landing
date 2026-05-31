# JetForge Labs — Design DNA

Extracted from Google Stitch redesign (Project ID: 13643222764691332523)

## Typography

### Font Families
- **Headlines**: Manrope (weights: 700, 800)
- **Body**: Inter (weights: 400, 500, 600)
- **Labels**: Inter (weights: 400, 500)
- **CSS Variable**: `--font-jakarta` (Plus Jakarta Sans for the Next.js implementation, weights 300-700)

### Type Scale
| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Hero H1 | 7xl-8xl (72-96px) | 800 (extrabold) | tighter (-0.04em) |
| Section H2 | 5xl-7xl (48-72px) | 800 (extrabold) | tighter |
| Card H3 | xl (20px) | 700 (bold) | tight |
| Body | lg-xl (18-20px) | 400 | normal |
| Eyebrow | xs (12px) | 700 (bold) | 0.2em (widest) |
| Label | xs (12px) | 500 | widest |
| Nav | base (16px) | 500 | tight |

## Color System

### Core Palette (Material Design 3 derived)
```css
/* Backgrounds */
--background: #030308;
--surface: #13131a;
--surface-dim: #13131a;
--surface-container-lowest: #0e0d15;
--surface-container-low: #1b1b23;
--surface-container: #1f1f27;
--surface-container-high: #2a2932;
--surface-container-highest: #34343d;

/* Primary */
--primary: #adc6ff;
--primary-container: #0f69dc;
--primary-fixed: #d8e2ff;
--primary-fixed-dim: #adc6ff;
--inverse-primary: #005ac2;

/* Secondary */
--secondary: #b4c5ff;
--secondary-container: #33467e;

/* Tertiary (Accent) */
--tertiary: #ffb596;
--tertiary-container: #bc4800;

/* Text */
--on-surface: #e4e1ec;
--on-surface-variant: #c3c6d7;
--on-background: #e4e1ec;
--on-primary: #002e6a;
--on-primary-container: #ecf0ff;

/* Borders & Outlines */
--outline: #8d90a0;
--outline-variant: #434655;

/* Error */
--error: #ffb4ab;
--error-container: #93000a;
```

### Mapped to Tailwind (Original Project Colors)
```css
--color-navy-950: #010104;
--color-navy-900: #030308;
--color-navy-800: #08081a;
--color-navy-700: #0d0d2a;
--color-navy-600: #141438;
--color-blue-600: #2563eb;
--color-blue-500: #3b82f6;
--color-blue-400: #60a5fa;
--color-blue-300: #93c5fd;
--color-slate-100: #f1f5f9;
--color-slate-200: #e2e8f0;
--color-slate-300: #cbd5e1;
--color-slate-400: #94a3b8;
--color-slate-500: #64748b;
--color-slate-600: #475569;
```

## Gradients

### Text Gradient (Hero / Section Headings)
```css
.text-gradient {
  background: linear-gradient(135deg, #adc6ff 0%, #0f69dc 100%);
  /* Alt mapping: #60a5fa → #2563eb */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Button Gradient
```css
.btn-gradient {
  background: linear-gradient(135deg, #adc6ff 0%, #0f69dc 100%);
  /* Alt: from-blue-600 to-blue-500 */
}
```

### Section Divider
```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(15, 105, 220, 0.3), transparent);
}
```

### Footer Top Border
```css
.footer-glow {
  border-top: 1px solid transparent;
  border-image: linear-gradient(to right, transparent, #0f69dc, transparent) 1;
}
```

## Effects

### Glass Card
```css
.glass-card {
  background: rgba(42, 41, 50, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(67, 70, 85, 0.1); /* outline-variant/10 */
  border-radius: 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-card:hover {
  background: rgba(42, 41, 50, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 0 30px rgba(15, 105, 220, 0.15);
}
```

### Noise Texture Overlay
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.025-0.05;
  background-image: url("data:image/svg+xml,...fractalNoise...");
  pointer-events: none;
  z-index: 1;
}
```

### Grid Pattern
```css
.grid-overlay {
  background-image: radial-gradient(circle, #34343d 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.15;
}
```

### Glow Effects
```css
.glow-blue { box-shadow: 0 0 40px rgba(59, 130, 246, 0.15), 0 0 80px rgba(59, 130, 246, 0.05); }
.glow-blue-sm { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
```

### Gradient Orbs
- Position: absolute, large (400-600px), rounded-full
- Colors: primary-container/10-20, blue-500/10
- Blur: 100-120px
- Purpose: ambient background depth

## Spacing

| Context | Value |
|---------|-------|
| Page max-width | 1440px |
| Page padding (desktop) | 96px (px-24) |
| Page padding (mobile) | 24px (px-6) |
| Section vertical padding | 128px (py-32) |
| Card padding | 40px (p-10) |
| Grid gap | 32px (gap-8) |
| Navbar height | ~88px (py-6) |
| Scroll offset | 80px |

## Border Radius
| Element | Value |
|---------|-------|
| Buttons | xl (12px) |
| Cards | xl (12px) |
| Input fields | xl (12px) |
| Icon containers | xl (12px) |
| Badges/pills | full |
| Images | 2xl (16px) |

## Animations

### Hero Entrance
```css
@keyframes hero-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Staggered delays: 0s, 0.15s, 0.3s, 0.45s */
```

### Scroll Reveal
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger: calc(var(--stagger-index) * 100ms) */
```

### Float (Background Orbs)
- Duration: 20-25s, ease-in-out, infinite
- Movement: translate ±30px, scale 0.95-1.05

### Scroll Indicator
- Bounce animation, 2s infinite
- Chevron moves 6px down

### Interactions
- Button press: scale(0.97) on :active
- Card hover: translateY(-4px), blue glow shadow
- Nav hover: text color transition to white
- Focus: 2px ring, blue-500/70

## Component Tokens

### Navbar
- Background: surface/80 with backdrop-blur-xl
- Border: appears on scroll (bottom, outline-variant/15)
- CTA: gradient pill, rounded-xl

### Service Cards
- Icon container: 48x48, rounded-xl, bg-primary-container/10, ring primary/20
- Hover: border → primary/50, card lifts, glow

### Form Inputs
- Background: surface-container-lowest
- Border: none (clean)
- Focus: ring-2 ring-primary/50
- Rounded: xl
- Padding: px-4 py-4

### Footer
- Background: surface (#13131a)
- 4-column grid (lg), stacked (mobile)
- Top border: gradient glow line
- Links: on-surface-variant, hover → white

## Breakpoints
- Mobile: 375px (default)
- Tablet: 768px (md:)
- Desktop: 1024px (lg:)
- Wide: 1440px (max-width container)
