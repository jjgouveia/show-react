import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Show } from './index';

describe('Show', () => {
  describe('when "when" is true', () => {
    it('renders children', () => {
      render(
        <Show when={true}>
          <span data-testid="child">Visible</span>
        </Show>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Visible')).toBeInTheDocument();
    });

    it('does not render fallback', () => {
      render(
        <Show when={true} fallback={<span data-testid="fallback">Fallback</span>}>
          <span>Visible</span>
        </Show>
      );
      expect(screen.getByText('Visible')).toBeInTheDocument();
      expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
    });

    it('calls children function and renders result when children is a function', () => {
      const renderChild = vi.fn(() => <span data-testid="lazy">Lazy</span>);
      render(<Show when={true}>{renderChild}</Show>);
      expect(renderChild).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('lazy')).toBeInTheDocument();
      expect(screen.getByText('Lazy')).toBeInTheDocument();
    });
  });

  describe('when "when" is false', () => {
    it('renders fallback when provided', () => {
      render(
        <Show when={false} fallback={<span data-testid="fallback">Fallback</span>}>
          <span>Visible</span>
        </Show>
      );
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
      expect(screen.getByText('Fallback')).toBeInTheDocument();
      expect(screen.queryByText('Visible')).not.toBeInTheDocument();
    });

    it('renders null when fallback is not provided', () => {
      const { container } = render(
        <Show when={false}>
          <span>Visible</span>
        </Show>
      );
      expect(container.firstChild).toBeNull();
    });

    it('does not call children function when when is false (lazy)', () => {
      const renderChild = vi.fn(() => <span>Lazy</span>);
      render(<Show when={false}>{renderChild}</Show>);
      expect(renderChild).not.toHaveBeenCalled();
    });
  });

  describe('when "when" is undefined or null', () => {
    it('renders fallback when when is undefined', () => {
      render(
        <Show when={undefined} fallback={<span data-testid="fallback">Fallback</span>}>
          <span>Visible</span>
        </Show>
      );
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });

    it('renders fallback when when is null', () => {
      render(
        <Show when={null} fallback={<span data-testid="fallback">Fallback</span>}>
          <span>Visible</span>
        </Show>
      );
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });
  });

  describe('fallback default', () => {
    it('renders null when when is false and fallback is undefined', () => {
      const { container } = render(
        <Show when={false}>
          <span>Visible</span>
        </Show>
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
