[![Netlify Status](https://api.netlify.com/api/v1/badges/eec789fa-0306-4471-b7b6-166706f0e001/deploy-status)](https://app.netlify.com/sites/lbarnes-labforward-challenge/deploys) ![Vue](https://img.shields.io/badge/vue-3.x-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-4.x-blue)
![Vite](https://img.shields.io/badge/vite-fast-purple)
![Vuetify](https://img.shields.io/badge/Vuetify-3.x-1867C0?logo=vuetify&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-fast-F69220?logo=pnpm&logoColor=white) ![Playwright](https://img.shields.io/badge/playwright-testing-blue)

# Labforward Frontend Challenge 🚀

This is a Vue.js 3-based application built to interact with the Protocols.io API. It allows users to search, filter, and display protocol information efficiently with pagination and sorting features. The app uses modern tools and follows best practices to ensure smooth performance, security, and scalability.

### 🚀 Live Demo

**https://lbarnes-labforward-challenge.netlify.app/**

## 📌 Highlights

- ⚙️ Built with **Vue 3**, **TypeScript**, **Vite**, **Vue Query**, and **Vuetify**
- 🔍 Search, sort, and paginate protocols via the **Protocols.io API v3**
- 💡 Supports both **card** and **table** views for results
- 🧪 **Unit tests automatically run on every push** via GitHub Actions
- 🧵 Clean composable architecture: `useSearchTerm`, `useProtocols`, etc.
- ⚡ Smart in-memory caching using Vue Query to avoid redundant API calls and improve perceived speed
- 🛠️ ESLint v9 with Flat config and Prettier integration
- 📱 Fully responsive design for both desktop and mobile

---

## 📦 Getting Started

### Prerequisites

- **Node.js version:** 16 or higher
- **pnpm**: A fast, disk space-efficient package manager. If you don't have it installed, you can install it via:

  ```bash
  npm install -g pnpm
  ```

### 1. Install Dependencies

Clone the repo and install the required dependencies.

```bash
pnpm install
```

### 2. Create `.env` file

To run the application, you'll need to add your Protocols.io client token in the `.env` file:

```bash
VITE_PROTOCOLS_TOKEN=your-client-token
```

### 3. Run the Application

To run the application locally:

```bash
pnpm run dev
```

By default, the app will be available at [http://localhost:4000](http://localhost:4000)

---

## 🚀 Running Tests and Linter

### Run End-to-End (E2E) Tests

To run the **E2E tests** with **Playwright**, you can execute:

```bash
pnpm run test:e2e
```

This will run all tests in the `tests/e2e` folder. Make sure you have a valid **Test environment** set up (e.g., `.env` variables) and the application running.

### Run Unit Tests

To run unit tests with **Vitest**:

```bash
pnpm run test
```

### Linting

To check for linting errors:

```bash
pnpm run lint
```

### TypeScript Checks

To run TypeScript checks:

```bash
pnpm run tsc
```

---

## 📸 Preview

### Search Screen

<img src="https://lbarnes-labforward-challenge.netlify.app/screenshots/mobile-welcome-screen.jpg" 
     alt="Mobile welcome screen showing the search bar and intro text" 
     width="450"/>

### Desktop Views

<img src="https://lbarnes-labforward-challenge.netlify.app/screenshots/desktop-cards-loading.jpg" 
     alt="Desktop view showing loading state for protocol cards using skeleton UI" 
     width="600"/>

<img src="https://lbarnes-labforward-challenge.netlify.app/screenshots/desktop-table-view.jpg" 
     alt="Desktop view of protocol table with one row expanded to show additional details" 
     width="600"/>

### Mobile Views

<img src="https://lbarnes-labforward-challenge.netlify.app/screenshots/mobile-cards-view.jpg" 
     alt="Mobile view displaying protocol search results in card layout" 
     width="300"/><img src="https://lbarnes-labforward-challenge.netlify.app/screenshots/mobile-table-view.jpg" 
     alt="Mobile view displaying protocol search results in table layout" 
     width="300"/>

---

## 🛠️ Development Setup

The app uses several modern tools and practices to ensure the highest quality and performance:

- **Vue 3** with Composition API and `<script setup lang="ts">` for better structure and readability.
- **TypeScript** for static typing and catching errors during development.
- **Vuetify** for UI components, utilizing utility classes to keep the bundle size small.
- **VueUse** to manage debouncing for efficient search experience with `useDebounceFn`.
- **TanStack Query** for data fetching with caching, refetching, and pagination.
- **Dompurify** for sanitizing HTML content to ensure safe rendering and prevent security risks.
- **PnPM** for efficient package management.
- **Left Hook** and **ESLint** for pre-commit checks to maintain code quality.

---

## 🌟 Key Features

### 1. **Search & Filter**

Users can search for protocols and filter them by sort order. Sort options include relevance, activity, and more.

### 2. **Pagination**

Data is paginated to prevent overloading the UI. Pagination is shared across table and card views.

### 3. **Smooth User Experience**

- Loading state (using skeletons) shows that the app is fetching additional data, providing clear feedback to users.
- Optimized for both desktop and mobile devices.
- The app only sends new requests when necessary to reduce API load.

---

## ⚠️ Known Limitations and Assumptions

### Missing Data from API

Some features, such as **user avatars** and **badges**, are visible on the Protocols.io website but are missing in the current version of the API (v3). These are essential visual components that could enhance user interaction, but they aren’t returned in the current API response. As a result, some user information will be incomplete. Here's an example:

#### Example:

- **Avatars**: In Protocols.io, authors' avatars are typically shown next to their names, but this data is currently unavailable via the API. As a result, the UI may display a placeholder or a blank area where avatars should appear.

- **Badges**: Authors and protocols often have badges (like "Verified" or "Featured") that help identify credibility or popularity, but these are not included in the data returned by the Protocols.io API in its current version.

This limitation means that these visual elements will not be displayed in the application, even though they are present on the website.

### TypeScript Build-time Errors

While TypeScript errors are being caught during build time, we are currently not catching these errors during runtime. This may lead to issues with runtime behavior that aren’t detected until the build is triggered. The build fails in the deployment pipeline, which helps ensure issues are flagged sooner. This process can be improved to catch errors earlier in the development process.

- **Example**: If an incorrect data type is passed to a function, the TypeScript compiler will catch it during the build process, but it might go unnoticed during development unless explicitly tested.

### Backend Request Behavior

We pre-set `orderField` and `orderDir` using the Protocols.io API's default values to prevent redundant requests and improve the user experience. This reduces the chance of sending unnecessary API requests when the data has not changed.

---

## 🛡️ Security

- **Sanitization of HTML**: The app uses **Dompurify** to sanitize raw HTML content, preventing any potential security risks such as XSS attacks. This ensures that any data rendered on the frontend is safe and does not break the UI with malformed HTML.

---

## 📈 Performance Optimizations

- **Chunking**: The app is optimized to reduce bundle size using Vite’s dynamic import and chunk naming strategies. We group related components like the table and card views together, ensuring that only necessary parts of the application are loaded initially.
- **Modern Browser Focus**: The application is designed with modern browsers and devices in mind. We do not focus on backward compatibility, which helps deliver a smaller, faster app that loads quickly and works smoothly across desktop and mobile.
- **In-Memory Caching with Vue Query**: Vue Query handles client-side caching and deduplication of requests, making the app feel faster without storing data in persistent storage like localStorage.

---

## 🚧 Further Improvements

### 1. **Bundle Size Optimization**

Currently, the **main bundle** size is over **500KB**, which affects initial loading time. With gzip compression, the bundle size reduces to around **170KB**, but there is still room for improvement. We plan to reduce the initial loading time by optimizing and splitting bundles further. Here's a quick overview of improvements we could implement:

- **Lazy Loading**: Dynamically import only the necessary components as the user interacts with the app.
- **Tree Shaking**: Ensure unused code and dependencies are removed during the build process.
- **Code Splitting**: Break the app into smaller, focused chunks to only load the relevant parts of the app when needed.

### 2. **Folder Structure Refactor**

Currently, the folder structure could be more modular and better organized. To ensure scalability, we plan to:

- Group composables, components, and views in dedicated folders to improve maintainability and clarity.
- Modularize reusable utilities into separate files or directories.

### 3. E2E Tests in the Deployment Pipeline

We plan to include **E2E tests** in our **CI/CD pipeline** on Netlify. Specifically, we aim to run these tests on the **preview branch** that Netlify creates for each pull request. This will ensure that all tests are validated in the preview environment before changes are merged into the main branch. Here's what we will focus on:

- Automatically run the E2E tests on the preview deployment.
- Monitor the results and ensure that only passing tests can be merged.
- Run tests on various network conditions (e.g., status 500 errors).

---

## 🔧 Deployment

The app is deployed to **Netlify**, with streamlined **CI/CD** to ensure smooth updates.

- ✅ **Unit tests and linter checks** are automatically run on every push via **GitHub Actions**
- 🚦 Pull requests are validated before they can be merged
- 🌐 Production is updated automatically when changes are merged into the main branch

This setup ensures the app is always in a reliable, tested state, with fast feedback loops during development.

---

## 🧪 Tests Summary

Here’s a summary of the key tests that have been implemented:

- **Main Happy Path**: Test the full user flow, from landing on the welcome screen to submitting the search and navigating to the main application, including error handling.
- **Search API Request**: Validate that the app sends the correct API request when a user searches for protocols.
- **Network Request Monitoring**: Ensure that all network requests are correctly triggered and logged for monitoring.
- **Network Failures (Status 500)**: Test the app’s behavior when the network request fails (e.g., status code 500).
- **Mocks/Fixtures**: Use mocks and fixtures to reduce network traffic and speed up test run time by simulating API responses.
- **Pagination Behavior**: Verify that pagination is working correctly, including clicking through pages and verifying network requests are triggered.

---

## 💭 Reflections & Learnings

> Initially, I approached the `/protocols` endpoint as a way to list protocols freely, but I later realized the **searchKey is a required parameter**. To work around this early on, I defaulted to a predefined key. Eventually, I restructured the app to reflect its true nature as a search engine — leading to a cleaner experience where users land on a dedicated search screen and trigger queries themselves.

This project was a great opportunity to explore:

- Rapid iteration using a clean **Vue 3 + Vite** setup
- **Type-safe API integration** using `@tanstack/vue-query`
- Managing shared pagination and search state between multiple views
- CI/CD with GitHub Actions and using **Left Hook** to enforce pre-commit checks
- Optimizing bundle size — gzip is currently ~170 kB, but further improvements could reduce the initial JS payload

I also took care to align closely with the **Protocols.io documentation**, ensuring the API was used effectively and minimizing potential bugs through strict typings.
