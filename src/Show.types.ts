import type { ReactNode } from 'react';

export interface ShowProps {
  /**
   * The condition to check. Coerced to boolean (strict), so 0, NaN and "" do not render children.
   * If truthy, children are rendered.
   */
  when: unknown;
  /**
   * Content to render when the condition is falsy.
   */
  fallback?: ReactNode;
  /**
   * Children to render when the condition is truthy.
   * Can be a function for lazy evaluation.
   */
  children: ReactNode | (() => ReactNode);
}
