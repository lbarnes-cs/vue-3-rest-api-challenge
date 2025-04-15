// vitest.setup.ts
import { beforeAll } from 'vitest';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
