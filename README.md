# 💗 NutriGuiide — Elevate Your Health

> **Personalized diet plans designed to help you feel your best every single day.**
> Science-backed nutrition · Macro-optimized meals · Real-time tracking

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#)

---

## 📸 Overview

NutriGuiide is a **modern, fully responsive nutrition and diet planning website** that helps users discover personalized meal plans, track their macros, and achieve their health goals. The platform features a beautiful pink-themed UI with smooth animations, glassmorphism effects, and a premium feel throughout.

---

## ✨ Features

### 🏠 Landing Page (`index.html`)
- **Hero section** with animated floating food icons and orbit ring visual
- **How It Works** — 3-step guide (Tell Us About You → Get Your Meal Plan → Track & Improve)
- **Diet Plans** — Three pricing tiers: Essentials (₹799/mo), Advanced (₹1,999/mo), and Elite (₹4,999/mo)
- **Testimonials** — Member reviews with star ratings
- **CTA section** with floating food emojis
- **Footer** with company links and navigation
- Scroll-reveal animations & interactive card tilt effects
- Animated stat counters (50K+ members, 98% success rate, 4.9★ rating)

### 🔐 Login Page (`login.html`)
- **Dual authentication** — Email/Password & Phone OTP tabs
- **Email login** with real-time validation:
  - Email format checking
  - Password strength meter (8+ chars, number, special character)
  - Remember me & Forgot password options
- **Phone OTP login**:
  - Indian mobile number validation (+91)
  - 6-digit OTP input with auto-focus & paste support
  - Countdown timer with resend functionality
- **Social login buttons** (Google & Apple — demo)
- **Success overlay** with redirect progress bar to dashboard
- Animated background blobs and floating food icons

### 📋 Onboarding Flow (`onboarding.html`)
- **6-step health profile wizard**:
  1. **Personal Information** — Name, DOB, email, gender
  2. **Body Metrics** — Height, weight, target weight, waist, hips, body fat %
  3. **Goals & Activity** — Fitness goals, activity level
  4. **Dietary Preferences** — Diet type, allergies, cuisine preferences
  5. **Lifestyle** — Sleep, stress, water intake, meal frequency
  6. **Review & Confirm** — Summary of all entered data
- Step progress bar with animated pips
- Form validation with inline error messages
- Pill-style radio/checkbox selectors
- Range sliders for numeric inputs
- Success screen with redirect to dashboard

### 📊 Dashboard (`dashboard.html`)
- **Sidebar navigation** with sections: Dashboard, Meal Plan, Analytics, Hydration, Grocery List, Progress, Settings
- **Stats overview** — Calories consumed, protein, water intake, streak counter
- **Today's Meal Plan** — Breakfast, Lunch, Dinner, Snacks with calorie counts and completion status
- **Macro Progress** — Visual progress bars for Protein, Carbs, and Fat
- **Weekly Progress** — Bar chart visualization of daily adherence
- **Hydration Tracker** — Interactive cup-filling tracker
- **Daily Health Tip** card
- Personalized greeting using stored user data
- Logout functionality

---

## 🗂️ Project Structure

```
NutriGuide/
├── index.html          # Landing page (home)
├── login.html          # Sign-in page (email + phone OTP)
├── onboarding.html     # 6-step health profile setup
├── dashboard.html      # Personal dashboard (post-login)
├── style.css           # Landing page styles
├── login.css           # Login page styles
├── main.js             # Landing page JavaScript
├── login.js            # Login page JavaScript (validation, OTP)
└── README.md           # This file
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                      |
|------------|--------------------------------------------------|
| Structure  | HTML5 (semantic elements)                        |
| Styling    | Vanilla CSS3 (custom properties, gradients, glassmorphism, keyframe animations) |
| Logic      | Vanilla JavaScript (ES6+)                        |
| Fonts      | [Inter](https://fonts.google.com/specimen/Inter) & [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts |
| Icons      | Native emoji-based iconography                   |

> **No frameworks or build tools required** — the project runs as static files directly in the browser.

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaishuu24/NutriGuide.git
   cd NutriGuide
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Use a local server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js (npx)
     npx serve .
     ```
   - Then visit `http://localhost:8000`

---

## 🔄 User Flow

```
Landing Page  →  Get Started  →  Onboarding (6 steps)  →  Dashboard
     │                                                        ↑
     └──────────  Log In  →  Sign In (Email / OTP)  ──────────┘
```

1. **New users** click "Get Started" → complete the 6-step onboarding → land on the dashboard
2. **Returning users** click "Log In" → sign in via email/password or phone OTP → redirected to the dashboard

---

## 🎨 Design Highlights

- **Color palette**: Pink/rose gradient theme (`#db2777` → `#f472b6` → `#fbcfe8`)
- **Typography**: Outfit (headings) + Inter (body) — clean and modern
- **Animations**: Scroll-reveal, floating blobs, orbit rings, card tilt on hover, stat counter rollup
- **Glassmorphism**: Frosted-glass navbar and card effects
- **Responsive**: Mobile-friendly layout with hamburger menu and adaptive grids
- **Micro-interactions**: Button hover lifts, input focus glows, OTP box auto-advance

---

## 🧪 Demo Credentials

Since this is a frontend demo with simulated authentication:

| Method | Details |
|--------|---------|
| **Email** | Any valid email + a password with 8+ chars, a number, and a special character |
| **Phone OTP** | Any 10-digit Indian mobile number (starts with 6–9). Demo OTP: `456789` |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `> 900px`  | Full sidebar + multi-column layouts |
| `640–900px` | Collapsed sidebar, 2-column grids |
| `< 640px`  | Single-column, hamburger nav, stacked cards |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- **Google Fonts** — Inter & Outfit typefaces
- Built with ❤️ and 🥑 for a healthier world

---

<p align="center">
  <strong>© 2025 NutriGuiide. All rights reserved.</strong><br>
  <em>Nourish better, feel lighter, live fully.</em>
</p>
