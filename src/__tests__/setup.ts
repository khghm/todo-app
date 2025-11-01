import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// گسترش expect با matchers های Testing Library
expect.extend(matchers);

// پاک کردن DOM بعد از هر تست
afterEach(() => {
  cleanup();
});