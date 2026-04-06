# FHSU GPA Calculator — Project Spec

# SYSTEM: BUILDER
You are a Lead Frontend Developer building a React application. Your goal is to write clean, modular, and highly efficient code based exactly on the provided Project Specification. 
- Do not invent new features outside the spec.
- Prioritize pure functions for logic and functional components for the UI.
- Only output the requested code and brief, necessary explanations.

## Overview

Build a single-page GPA calculator web app tailored for Fort Hays State University (FHSU) students. The design should feel modern and polished, using FHSU brand colors (black and gold), with smooth animations powered by [React Bits](https://reactbits.dev). Reference site for feature inspiration: [gpacalculator.io](https://gpacalculator.io).

---

## Tech Stack

- **Framework**: React (Vite scaffold)
- **Styling**: Tailwind CSS
- **Animations**: React Bits component library (install components via CLI as needed)
- **Hosting target**: GitHub Pages or Vercel (static build, no backend)


---

## FHSU Grading Scale

Use this exact mapping — do not round GPA, truncate to 2 decimal places.

| Letter Grade | Grade Points |
|---|---|
| A | 4.0 |
| B | 3.0 |
| C | 2.0 |
| D | 1.0 |
| F | 0.0 |
| P / NC | Not counted |
| W / WF | Not counted |

> **Repeat policy**: If a course is retaken, only the last grade counts. Mark repeated courses with an "RP" indicator — exclude the old grade from GPA calculation.

---

## GPA Calculation Logic

### Semester GPA
```
Quality Points per course = Grade Points × Credit Hours
Semester GPA = Sum(Quality Points) / Sum(Credit Hours)
```

### Cumulative GPA
```
Cumulative GPA = (Previous Quality Points + Current Semester Quality Points)
                 / (Previous Credit Hours + Current Semester Credit Hours)
```
- Previous quality points = previous cumulative GPA × previous credit hours attempted
- Truncate final result to 2 decimal places (do not round)

### GPA Classifications
| GPA Range | Standing |
|---|---|
| 3.90 – 4.00 | Summa Cum Laude |
| 3.80 – 3.89 | Magna Cum Laude |
| 3.60 – 3.79 | Cum Laude |
| 3.50 – 3.59 | Dean's List |
| 2.00 – 3.49 | Good Standing |
| Below 2.00 | Academic Probation |

---

## Page Structure

### Section 1 — Hero
- FHSU logo or wordmark (top left)
- Animated headline using **React Bits `SplitText` or `BlurText`**
- Short tagline: *"Calculate your FHSU GPA instantly"*
- Subtle background texture or animated background using **React Bits `Particles` or `Aurora`** (keep it light, don't distract)
- CTA button: "Start Calculating" — scrolls to calculator section

### Section 2 — Semester GPA Calculator
- Table/list of course rows, each with:
  - Course name (text input, optional)
  - Letter grade (dropdown: A, B, C, D, F, P, NC, W, WF)
  - Credit hours (number input: 1–5)
  - Remove row button (×)
- "Add Course" button — adds a new row with **React Bits `AnimatedList`** slide-in animation
- Live GPA display below the table — updates on every input change
  - Animate the GPA number using **React Bits `CountUp`**
  - Show GPA classification badge below the number

### Section 3 — Cumulative GPA Calculator
- Two inputs:
  - Previous cumulative GPA (number, 0.00–4.00)
  - Previous credit hours attempted (number)
- Pulls current semester data from Section 2 automatically
- Displays cumulative GPA with same CountUp animation and classification badge
- **GPA Donut Ring** — circular/donut SVG progress indicator (0.0–4.0 scale):
  - Ring color interpolates smoothly: red (1.0 and below) → yellow (2.0–2.5) → green/cyan (3.5–4.0)
  - Use HSL color interpolation: `hsl(0, 100%, 50%)` at 0.0 → `hsl(60, 100%, 50%)` at 2.0 → `hsl(160, 100%, 40%)` at 4.0
  - GPA number displayed in center of the ring with classification label below it
  - Ring animates (stroke-dashoffset) when GPA value changes
  - Empty/unfilled portion of ring stays a neutral gray (`#E5E7EB`)
- Progress text below ring: "X.XX away from [next threshold]"

### Section 4 — What-If Mode (optional, Phase 2)
- Let user change a grade in the course list and see live impact on GPA
- Toggle button to enter/exit what-if mode
- Changed rows highlighted in gold

---

## Component Structure

```
src/
├── components/
│   ├── Hero.jsx               # Section 1
│   ├── SemesterCalculator.jsx # Section 2 — main calculator
│   ├── CourseRow.jsx          # Single course input row
│   ├── GPADisplay.jsx         # Animated GPA number + badge
│   ├── CumulativeCalculator.jsx # Section 3
│   └── GPADonutRing.jsx       # SVG circular donut ring — color + animation
├── utils/
│   └── gpaLogic.js            # All GPA math — pure functions, no UI
├── constants/
│   └── grading.js             # Grade → points map, classifications
├── App.jsx
└── main.jsx
```

---

## React Bits Components to Use

Install each via the React Bits CLI when you're ready for that section:

| Component | Where | Purpose |
|---|---|---|
| `SplitText` or `BlurText` | Hero | Animate headline on load |
| `Particles` or `Aurora` | Hero background | Subtle animated background |
| `AnimatedList` | Semester Calculator | Slide-in when adding a course row |
| `CountUp` | GPA Display | Animate GPA number on change |
| `GradientText` | GPA Display | Gold gradient on the GPA number |
| `FadeContent` | All sections | Fade-in on scroll |

---

## FHSU Brand Colors

```css
/* Add to tailwind.config.js */
colors: {
  'fhsu-black': '#000000',
  'fhsu-gold': '#F1B300',
  'fhsu-gold-light': '#FDE68A',
  'fhsu-gray': '#4A4A4A',
}
```

---

## Build Order (recommended)

1. Scaffold project + Tailwind setup
2. Build `gpaLogic.js` — write and test all math functions first, no UI
3. Build `CourseRow.jsx` and `SemesterCalculator.jsx` — static, no animations yet
4. Build `GPADisplay.jsx` — live GPA updates working
5. Build `CumulativeCalculator.jsx`
6. Add Hero section
7. Drop in React Bits animations as polish layer
8. FHSU color theming + responsive layout
9. Deploy to GitHub Pages or Vercel

---

## Notes for CLI

- Keep all GPA logic in `utils/gpaLogic.js` as pure functions — no state, no React imports. This makes it easy to test independently.
- Use `useState` in `SemesterCalculator.jsx` to manage the course list array.
- Pass courses as props down to `GPADisplay.jsx` and `CumulativeCalculator.jsx` — lift state up to `App.jsx` if both sections need the same data.
- P, NC, W, WF grades should be accepted in the dropdown but excluded from all calculations (filter them out before computing).
- GPA truncation: use `Math.floor(gpa * 100) / 100` — do NOT use `toFixed()` alone as it rounds.
- **Donut ring color logic**: interpolate HSL hue based on GPA value — `hue = (gpa / 4.0) * 160` gives 0° (red) at 0.0 and 160° (green/cyan) at 4.0. Apply as `stroke: hsl(${hue}, 100%, 45%)` on the SVG circle element. Animate `stroke-dashoffset` with a CSS transition for smooth fill change.
- **Donut ring SVG pattern**:
```jsx
const radius = 54;
const circumference = 2 * Math.PI * radius;
const progress = (gpa / 4.0) * circumference;
const hue = (gpa / 4.0) * 160;

<svg viewBox="0 0 120 120" width="160" height="160">
  {/* Background track */}
  <circle cx="60" cy="60" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10"/>
  {/* GPA fill */}
  <circle cx="60" cy="60" r={radius} fill="none"
    stroke={`hsl(${hue}, 100%, 45%)`}
    strokeWidth="10"
    strokeDasharray={circumference}
    strokeDashoffset={circumference - progress}
    strokeLinecap="round"
    transform="rotate(-90 60 60)"
    style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.6s ease' }}
  />
  {/* Center label */}
  <text x="60" y="56" textAnchor="middle" fontSize="22" fontWeight="600" fill="currentColor">{gpa.toFixed(2)}</text>
  <text x="60" y="74" textAnchor="middle" fontSize="10" fill="#6B7280">{classification}</text>
</svg>
```