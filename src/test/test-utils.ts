import type { JSXElementConstructor, ReactElement } from 'react';

import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

interface RenderOptions {
  options?: Record<string, unknown>;
  ui: ReactElement;
  wrapper?: JSXElementConstructor<{ children: ReactElement }>;
}

const customRender = ({ options = {}, ui, wrapper }: RenderOptions) =>
  render(ui, {
    ...options,
    wrapper: wrapper,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
