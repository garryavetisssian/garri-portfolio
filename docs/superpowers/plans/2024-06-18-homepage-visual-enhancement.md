# Homepage Visual Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement high-fidelity visual enhancements to the homepage including enhanced hero asset area, high-contrast borders/grid accents, vibrant color accents, and interactive arcade cards with hover effects.

**Architecture:** Modify existing component files to enhance visual presentation while maintaining existing functionality. Focus on CSS variable usage for consistency and adding interactive visual elements within the established component structure.

**Tech Stack:** Next.js, TypeScript, CSS Modules/CSS-in-JS, HTML5 Canvas for interactive elements

---

### Task 1: Enhanced Hero Asset Container with Interactive Canvas

**Files:**
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/components/brut/Hero.tsx`
- Create: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/components/brut/HeroVisualAsset.tsx`
- Create: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/lib/canvas-effects.ts`

- [ ] **Step 1: Create HeroVisualAsset component with interactive canvas**

```typescript
"use client";

import { useEffect, useRef } from "react";

interface HeroVisualAssetProps {
  className?: string;
}

export default function HeroVisualAsset({ className = "" }: HeroVisualAssetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawBackground();
      drawGrid();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create gradient background: deep indigo to electric cyan
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0f1a3d"); // deep indigo
    gradient.addColorStop(1, "#00f3ff"); // electric cyan
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;

    // Draw grid pattern
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/80 text-sm font-mono">
          <div>INTERACTIVE</div>
          <div class="mt-1">CANVAS</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update Hero.tsx to use the new HeroVisualAsset component**

```typescript
// Replace the striped placeholder div with the new HeroVisualAsset component
import HeroVisualAsset from "./HeroVisualAsset";

// In the JSX, replace the striped div section:
{/* Before */}
/*
<div style={{ 
  background: "repeating-linear-gradient(45deg* 10px, #fff 10px, #0 1 
  border: 'ar-s变量I10pxox: 网ximg的,, 
}}> 
  <div style="text-align: center; color: var(--ink); font-family: var(--font-display); padding: 20px;">
    <div style="font-size: 3rem; margin-bottom: 10px;">HERO</div>
    <div style="font-size: 1.2rem; opacity: 0.8;">Visual Asset Placeholder</div>
  </div>
</div>
*/

// After (replace with HeroVisualAsset component):
<HeroVisualAsset className="w-full h-full" />

```

- [ ] **Step 3: Add canvas-effects utility for advanced visual effects**

```typescript
// src/lib/canvas-effects.ts
export function createParticleEffect(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const particles: Particle[] = [];
  const particleCount = 50;

  class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityX: number;
    velocityY: number;
    alpha: number;

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`; // cyan-blue range
      this.velocityX = (Math.random() - 0.5) * 0.5;
      this.velocityY = (Math.random() - 0.5) * 0.5;
      this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

      // Fade out slowly
      this.alpha = Math.max(0, this.alpha - 0.002);
      if (this.alpha <= 0) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }

    requestAnimationFrame(animate);
  };

  animate();

  return {
    resize: () => {
      canvas.width = canvas.clientWidth;
      canvas.height = clientHeight;
    }
  };
}
```

- [ ] **Step 4: Run the application to verify the hero visual asset displays correctly**

```bash
npm run dev
```

Expected: Hero section now shows animated canvas with gradient background and floating particles instead of static stripes

- [ ] **Step 5: Commit the hero visual asset changes**

```bash
git add src/components/brut/HeroVisualAsset.tsx src/components/brut/Hero.tsx src/lib/canvas-effects.ts
git commit -m "feat: add interactive hero visual asset with animated canvas background"
```

### Task 2: Implement High-Contrast Borders and Background Grid

**Files:**
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/app/globals.css`
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/app/[locale]/layout.tsx`

- [ ] **Step 1: Add CSS variables for border and background styles**

```css
/* Add to :root in globals.css */
:root {
  --border-strong: 1px solid rgba(255, 255, 255, 0.1);
  --border-medium: 1px solid rgba(255, 255, 255, 0.08);
  --border-weak: 1px solid rgba(255, 255, 255, 0.05);
  --background-grid: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.03) 20px,
      rgba(255, 255, 255, 0.03) 21px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.03) 20px,
      rgba(255, 255, 255, 0.03) 21px
    );
}
```

- [ ] **Step 2: Apply background grid to the body or main container**

```css
/* In globals.css, add to body or html,body */
html, body {
  background: var(--background-grid);
  background-color: #0a0a0a; /* Deep black base */
  min-height: 100vh;
}
```

- [ ] **Step 3: Update section components to use consistent border styling**

Modify each section component (Hero.tsx, WorkList.tsx, ExperienceStrip.tsx, etc.) to use consistent border styling:

```typescript
// Example for a section wrapper - update the section tag in each component
<section 
  className="relative py-24 border-t border-b"
  style={{
    borderTopWidth: "1px",
    borderBottomWidth: "1px", 
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderBottomColor: "rgba(255, 255, 255, 0.1)"
  }}
>
```

However, better approach is to use CSS classes:

```css
/* Add to globals.css */
.section-border {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* For stronger separation when needed */
.section-border-strong {
  border-top: 2px solid rgba(255, 255, 255, 0.15);
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
}
```

Then apply to sections:
```typescript
<section className="relative py-24 section-border">
```

- [ ] **Step 4: Run the application to verify borders and background grid are visible**

```bash
npm run dev
```

Expected: Page now has subtle grid background and consistent section borders with white transparency

- [ ] **Step 5: Commit the border and background grid changes**

```bash
git add src/app/globals.css
git commit -m "feat: add background grid pattern and consistent section borders"
```

### Task 3: Implement Vibrant Color Accents for Badges and Metadata

**Files:**
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/lib/constants.ts` (add color constant)
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/components/brut/WorkList.tsx`
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/components/brut/ExperienceStrip.tsx`

- [ ] **Step 1: Add vibrant accent color to constants**

```typescript
// Add to constants.ts
export const COLORS = {
  primaryAccent: "#00f3ff", // Electric cyan
  secondaryAccent: "#00ff88", // Neon green
  accentHover: "#33ffff",
} as const;
```

- [ ] **Step 2: Update WorkList.tsx to use accent colors for badges and numbers**

```typescript
// Import the colors
import { COLORS } from "@/lib/constants";

// Update the number badge styling
<span className="num-badge" style={{ 
  color: COLORS.primaryAccent,
  fontWeight: "600"
}}>
  {String(i + 1).padStart(2, "0")} —
</span>

// Update category badge styling to use accent color
<span className="hidden md:inline mono text-ink-mute">
  [{categoryString(p.category)}]
</span>

// Change to:
<span className="hidden md:inline" style={{ 
  color: COLORS.primaryAccent,
  fontWeight: "500"
}}>
  [{categoryString(p.category)}]
</span>
```

- [ ] **Step 3: Update ExperienceStrip.tsx to use accent colors for numbers and labels**

```typescript
// Import colors
import { COLORS } from "@/lib/constants";

// Update number badge
<span className="num-badge md:col-span-1" style={{ 
  color: COLORS.primaryAccent,
  fontWeight: "600"
}}>
  {String(i + 1).padStart(2, "0")}
</span>

// Update company name to use accent color optionally
<span
  className="md:col-span-4 text-ink"
  style={{ 
    fontFamily: "var(--font-display)",
    fontWeight: "700",
    fontSize: "1.5rem",
    letterSpacing: "-0.02em",
    lineHeight: "1.05",
    color: COLORS.primaryAccent // or keep original for subtlety
  }}
>
  {w.company}
</span>
```

- [ ] **Step 4: Run the application to verify accent colors are applied**

```bash
npm run dev
```

Expected: Number badges (01, 02, etc.) and category labels now use vibrant accent colors instead of monochrome

- [ ] **Step 5: Commit the color accent changes**

```bash
git add src/lib/constants.ts src/components/brut/WorkList.tsx src/components/brut/ExperienceStrip.tsx
git commit -m "feat: add vibrant accent colors to badges and metadata elements"
```

### Task 4: Implement Interactive Arcade Cards with Hover Effects

**Files:**
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/components/brut/MiniGames/MiniGamesSection.tsx` (or create new ArcadeWidget component)
- Create: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/components/brut/ArcadeWidget.tsx`
- Modify: `/Users/garryavetissian/Desktop/Claude/garri-portfolio/src/app/[locale]/page.tsx` (to replace MiniGamesSection with ArcadeWidget)

- [ ] **Step 1: Create ArcadeWidget component with styled cards and hover effects**

```typescript
"use client";

import Link from "next/link";
import { COLORS } from "@/lib/constants";

interface ArcadeGame {
  id: number;
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

const arcadeGames: ArcadeGame[] = [
  {
    id: 1,
    title: "QUIZZLER",
    description: "Reaction-based quiz game with procedurally generated questions.",
    href: "/games/quizzler",
  },
  {
    id: 2,
    title: "CANVASR",
    description: "Experimental canvas with generative brush physics and color theory.",
    href: "/games/canvasr",
  },
  {
    id: 3,
    title: "SYNTHLAB",
    description: "WebAudio-based synthesizer with visual oscilloscope and envelope controls.",
    href: "/games/synthlab",
  },
];

export default function ArcadeWidget() {
  return (
    <section id="arcade" className="relative py-24">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mono text-ink-faint mb-3">— ARCADE</p>
            <h2 className="headline-md text-ink">
              INTERACTIVE EXPERIENCES<span className="text-acid">.</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 mono text-ink-mute">
            <span>{arcadeGames.length}</span>
            <span>GAMES • PLAYABLE</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {arcadeGames.map((game) => (
            <Link 
              key={game.id} 
              href={game.href} 
              className="group block hover:-translate-y-1 transition-transform duration-300"
            >
              <div 
                className="relative overflow-hidden border border-acid/20 bg-paper/80 backdrop-blur-sm p-6"
                style={{
                  borderRadius: "12px",
                  borderImage: `linear-gradient(45deg, ${COLORS.primaryAccent}40, transparent) 1`,
                  backgroundImage: `linear-gradient(
                    135deg,
                    rgba(0, 243, 255, 0.05) 0%,
                    transparent 50%,
                    rgba(0, 243, 255, 0.05) 100%
                  )`
                }}
              >
                <div className="mb-3 flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center mb-2" style={{
                    backgroundColor: `${COLORS.primaryAccent}20`,
                    borderRadius: "8px",
                    color: COLORS.primaryAccent,
                    fontWeight: "600",
                    fontSize: "0.875rem"
                  }}>
                    {game.id}
                  </span>
                  <span className="ml-3 text-ink font-mono text-xl font-bold">
                    {game.title}
                  </span>
                </div>
                
                <p className="mb-4 text-ink-mute line-clamp-3">
                  {game.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-acid/10">
                  <span className="text-acid/80 text-xs font-mono tracking-widest">
                    PLAY NOW
                  </span>
                  <span className="ml-2 inline-block transform transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update the page layout to use ArcadeWidget instead of MiniGamesSection**

```typescript
// In src/app/[locale]/page.tsx
// Replace:
// import MiniGamesSection from "@/components/brut/MiniGames/MiniGamesSection";
// With:
import ArcadeWidget from "@/components/brut/ArcadeWidget";

// And in the JSX:
// Replace:
// <MiniGamesSection />
// With:
// <ArcadeWidget />
```

- [ ] **Step 3: Run the application to verify arcade cards have hover effects and styling**

```bash
npm run dev
```

Expected: Arcade cards now have subtle lift effect on hover, colored borders, and enhanced visual styling with the accent color

- [ ] **Step 4: Commit the arcade widget changes**

```bash
git add src/components/brut/ArcadeWidget.tsx src/app/[locale]/page.tsx
git commit -m "feat: add interactive arcade widget with hover effects and accent styling"
```

### Task 5: Final Integration and Testing

**Files:**
- All modified files from previous tasks

- [ ] **Step 1: Run comprehensive tests to ensure all components work together**

```bash
npm run dev
```

Verify:
- Hero section shows animated canvas gradient
- Page has subtle background grid
- Sections have consistent borders
- Badges and numbers use accent colors
- Arcade cards have hover effects
- No console errors
- Responsive behavior works correctly

- [ ] **Step 2: Run any existing tests to ensure nothing is broken**

```bash
npm run test
```
or if using vitest/jest:
```bash
npm test
```

- [ ] **Step 3: Perform final cleanup - remove any console.logs or temporary code**

- [ ] **Step 4: Commit all final changes**

```bash
git add .
git commit -m "feat: complete homepage visual enhancements - hero canvas, borders, accents, arcade widgets"
```

### Summary

This implementation plan delivers the requested high-fidelity visual enhancements:

1. **Enhanced Hero Asset**: Interactive canvas with animated gradient background and floating particles
2. **High-Contrast Borders & Grid**: Subtle background grid pattern and consistent section borders with white transparency
3. **Color Accents**: Vibrant electric cyan applied to badges, numbers, and interactive elements
4. **Interactive Arcade Cards**: Styled cards with hover lift effects replacing the separate mini-games route

All changes maintain existing functionality while significantly upgrading the visual fidelity to match the reference inspiration of tigranvardanyan.com with a bento-grid structural approach.