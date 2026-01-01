 # Kyvo AI
 
 ## Tech stack
 
 - React
 - Vite
 - React Router
 - Tailwind CSS
 - Redux Toolkit (store)
 - MSW
 
 ## Run
 
 ```bash
 npm install
 npm run dev
 ```

 ## Project structure
 
 ```text
kyvo-ai/
├─ index.html                  # App entry HTML
├─ package.json                # Dependencies & scripts
├─ vite.config.js              # Vite configuration
├─ tailwind.config.js          # Tailwind theme config
├─ postcss.config.js           # PostCSS setup
├─ eslint.config.js            # Linting rules
├─ public/
│  ├─ mockServiceWorker.js     # MSW service worker
│             
├─ src/
│  ├─ main.jsx                 
│  ├─ App.jsx                  
│  ├─ index.css                          
│  ├─ assets/                  
│  │  ├─ react.svg
│  │  └─ img/
│  │     ├─ logo.png
│  │     └─ kyvo_procurement_QR.png
│  ├─ theme/                   # Design tokens
│  │  └─ brandColors.js
│  ├─ pages/                   # Route-level pages
│  │  ├─ index.js              # Page exports
│  │  ├─ Landing/
│  │  │  └─ LandingPage.jsx    # Landing page UI
│  │  ├─ Results/
│  │  │  └─ ResultsPage.jsx    # Search results page
│  │  └─ Details/
│  │     └─ DetailsPage.jsx    # Product/details page
│  ├─ components/              # Reusable UI components
│  │  ├─ landing/
│  │  │  ├─ SearchBar.jsx
│  │  │  └─ SuggestionChips.jsx
│  │  ├─ results/
│  │  │  └─ ResultsTable.jsx
│  │  ├─ filters/
│  │  │  └─ FiltersPanel.jsx
│  │  ├─ details/
│  │  │  └─ DetailsCard.jsx
│  │  ├─ layout/
│  │  │  ├─ PublicLayout.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ GridBackground.jsx
│  │  │  ├─ Footer.jsx
│  │  │  └─ index.js
│  │  └─ loading/              # Skeleton & loading states
│  │     ├─ SkeletonProvider.jsx
│  │     ├─ PublicLayoutSkeleton.jsx
│  │     ├─ HeaderSkeleton.jsx
│  │     ├─ GridBackgroundSkeleton.jsx
│  │     ├─ FooterSkeleton.jsx
│  │     ├─ SearchBarSkeleton.jsx
│  │     ├─ SuggestionChipsSkeleton.jsx
│  │     ├─ FiltersPanelSkeleton.jsx
│  │     ├─ ResultsTableSkeleton.jsx
│  │     ├─ ResultsPageSkeleton.jsx
│  │     ├─ LandingPageSkeleton.jsx
│  │     ├─ DetailsPageSkeleton.jsx
│  │     └─ DetailsCardSkeleton.jsx
│  ├─ store/                   # Global state management
│  │  ├─ index.js
│  │  ├─ store.js
│  │  ├─ rootReducer.js
│  │  ├─ api/
│  │  │  └─ api.js             # API layer
│  ├─ utils/                   # Helper utilities
│  │  └─ componentSearch.js
│  └─ mocks/                   # MSW mocks
│     ├─ browser.js
│     ├─ handlers.js
│     ├─ Data.js
│     └─ SuggestionChips.js
 ```