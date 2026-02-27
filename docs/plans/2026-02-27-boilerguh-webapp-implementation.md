# BoilerGuh WebApp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the static menu into a modern React WebApp with a shopping cart, search, and WhatsApp ordering, while keeping the original `index.html` functional.

**Architecture:** A modular React application built with Vite, utilizing Context API for cart state management and a centralized data file for products.

**Tech Stack:** React (TypeScript), Vite, Vanilla CSS (Modern), React Context API.

---

### Task 1: Project Initialization
**Files:**
- Create: `webapp/` (directory)
- Create: `webapp/package.json`

**Step 1: Initialize Vite Project**
Run: `npx -y create-vite@latest webapp --template react-ts`
Expected: `webapp` folder created with standard Vite structure.

**Step 2: Install dependencies**
Run: `cd webapp && npm install`
Expected: `node_modules` populated.

**Step 3: Commit**
```bash
git add webapp
git commit -m "chore: initial vite react-ts setup"
```

### Task 2: Data Extraction
**Files:**
- Create: `webapp/src/data/products.ts`

**Step 1: Extract products from index.html**
Define a `Product` interface and the full list of drinks, combos, and items found in the current `index.html`.

**Step 2: Commit**
```bash
git add webapp/src/data/products.ts
git commit -m "feat: extract menu data to products.ts"
```

### Task 3: Core Design System (CSS)
**Files:**
- Modify: `webapp/src/index.css`
- Modify: `webapp/src/App.css`

**Step 1: Implement Sunset Design Tokens**
Define CSS variables for colors (night, dark-purple, accent, glass, border) as seen in `index.html`. Implement the global glassmorphism and background gradient styles.

**Step 2: Commit**
```bash
git add webapp/src/index.css webapp/src/App.css
git commit -m "style: set up core design system and tokens"
```

### Task 4: Cart State Management
**Files:**
- Create: `webapp/src/contexts/CartContext.tsx`
- Modify: `webapp/src/main.tsx`

**Step 1: Create CartContext**
Implement a context to handle adding/removing items, quantity updates, and calculating the total.

**Step 2: Wrap App with CartProvider**
Modify `main.tsx` (or `App.tsx`) to provide the context to the entire component tree.

**Step 3: Commit**
```bash
git add webapp/src/contexts/CartContext.tsx webapp/src/main.tsx
git commit -m "feat: implement CartContext for state management"
```

### Task 5: Menu Components (Header & Category Chips)
**Files:**
- Create: `webapp/src/components/Header.tsx`
- Create: `webapp/src/components/CategoryChips.tsx`

**Step 1: Build the Sunset Header**
Implement the logo and tagline from the original design.

**Step 2: Build Category Filtering**
Create a horizontal scroll of chips (Drinks, Combos, etc.) that filters the product list.

**Step 3: Commit**
```bash
git add webapp/src/components/Header.tsx webapp/src/components/CategoryChips.tsx
git commit -m "feat: add Header and CategoryChips components"
```

### Task 6: Product Cards & Menu List
**Files:**
- Create: `webapp/src/components/ProductCard.tsx`
- Create: `webapp/src/components/ProductList.tsx`

**Step 1: Implement ProductCard**
Create an interactive card with "Add to Cart" functionality and glassmorphism styling.

**Step 2: Implement Search Filter**
Add a search input at the top of the `ProductList` to filter items by name in real-time.

**Step 3: Commit**
```bash
git add webapp/src/components/ProductCard.tsx webapp/src/components/ProductList.tsx
git commit -m "feat: add ProductCard and searchable ProductList"
```

### Task 7: Shopping Cart Drawer & Checkout
**Files:**
- Create: `webapp/src/components/CartDrawer.tsx`
- Create: `webapp/src/components/OrderForm.tsx`

**Step 1: Implement CartDrawer**
A slide-up modal showing selected items, quantities, and the total.

**Step 2: Build OrderForm**
Collect the user's Name and Table Number before finalizing.

**Step 3: Commit**
```bash
git add webapp/src/components/CartDrawer.tsx webapp/src/components/OrderForm.tsx
git commit -m "feat: implement CartDrawer and OrderForm"
```

### Task 8: WhatsApp Integration & Final Polish
**Files:**
- Modify: `webapp/src/utils/whatsapp.ts`
- Modify: `webapp/src/App.tsx`

**Step 1: Build Message Generator**
Create a utility function to format the cart items and user details into the requested WhatsApp message format.

**Step 2: Final UI Refinements**
Adjust animations, transitions, and ensure the "Full Menu" experience matches the premium feel of the BoilerGuh brand.

**Step 3: Commit**
```bash
git add webapp/src/utils/whatsapp.ts webapp/src/App.tsx
git commit -m "feat: integrate WhatsApp ordering and add final polish"
```
