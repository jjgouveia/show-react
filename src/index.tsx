import { memo } from 'react';
import type { ReactNode } from 'react';
import type { ShowProps } from './Show.types';

function ShowComponent({ when, fallback = null, children }: ShowProps): ReactNode {
  const show = Boolean(when);
  if (show) {
    if (typeof children === 'function') {
      return (children as () => ReactNode)();
    }
    return children;
  }
  return fallback ?? null;
}

/**
 * Conditional rendering component. Renders children only when `when` is true.
 * Memoized to avoid re-renders when props are referentially equal.
 * Prefer children as a function for expensive content (lazy evaluation).
 *
 * @example
 * <Show when={isLoaded} fallback={<Loading />}>
 *   <Content />
 * </Show>
 *
 * @example
 * <Show when={isVisible}>
 *   {() => <ExpensiveComponent />}
 * </Show>
 */
export const Show = memo(ShowComponent);
Show.displayName = 'Show';

export { type ShowProps } from './Show.types';
export default Show;
