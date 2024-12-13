// setup-tests.ts
import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

// Mở rộng expect với các matchers từ jest-dom
expect.extend(matchers)
