# Coding Challange for Labforward

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Assumptions

### Why using PNPM

### Why I choose to use Vuetify

### Thoughts

- On the table view, we re-fetch the API request with the order and page_size, as these are set by defaults. Maybe these should automatically be included in the first API request, saves us calling the request twice?

## Reduce bundle size

The key reduction in size comes from the index-C9volBcU.js file, where there is a difference of:

- Before treeshaking: 587.13 kB
- After treeshaking: 265.33 kB

Size reduction: 587.13 kB - 265.33 kB = 321.80 kB

CSS size reduction:

- Before treeshaking: 462.83 kB
- After treeshaking: 350.85 kB

Size reduction: 462.83 kB - 350.85 kB = 111.98 kB
