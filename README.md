![Netlify Deployment Badge](https://api.netlify.com/api/v1/badges/eec789fa-0306-4471-b7b6-166706f0e001/deploy-status)

# Labforward Frontend Challenge 🚀

This is a Vue.js 3-based application built to interact with the Protocols.io API. It allows users to search, filter, and display protocol information efficiently with pagination and sorting features. The app uses modern tools and follows best practices to ensure smooth performance, security, and scalability.

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

---

## ⚙️ Running Tests and Linter

### Run Tests

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

- **Example**: If an incorrect data type is passed to a function, the TypeScript compiler will catch it during the build process, but it might not be noticed during the coding phase unless explicitly tested.

### Backend Request Behavior

We pre-set `orderField` and `orderDir` using the Protocols.io API's default values to prevent redundant requests and improve the user experience. This reduces the chance of sending unnecessary API requests when the data has not changed.

---

## 🛡️ Security

- **Sanitization of HTML**: The app uses **Dompurify** to sanitize raw HTML content, preventing any potential security risks such as XSS attacks. This ensures that any data rendered on the frontend is safe and does not break the UI with malformed HTML.

---

## 📈 Performance Optimizations

- **Chunking**: The app is optimized to reduce bundle size using Vite’s dynamic import and chunk naming strategies. We group related components like the table and card views together, ensuring that only necessary parts of the application are loaded initially.
- **Modern Browser Focus**: The application is designed with modern browsers and devices in mind. We do not focus on backward compatibility, which helps deliver a smaller, faster app that loads quickly and works smoothly across desktop and mobile.

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

---

## 🔧 Deployment

The app is deployed to **Netlify**, with streamlined **CI/CD** to ensure smooth updates. Each pull request is tested in isolation before changes are deployed to production.
