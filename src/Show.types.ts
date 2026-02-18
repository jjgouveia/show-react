import type { ReactNode } from 'react';

export interface ShowProps {
  /**
   * The condition to check. If truthy, children are rendered.
   */
  when: boolean | undefined | null;
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
