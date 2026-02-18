# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-02-18

### Added

- `Show` component for conditional rendering with `when` prop.
- `fallback` prop to display content when the condition is false.
- Support for `children` as a function for lazy evaluation and better performance.
- TypeScript typings with exported `ShowProps` interface.
- Memoized component with `React.memo` to avoid unnecessary re-renders.
- ESM and CJS build with tsup.
- Tests with Vitest and React Testing Library.
- CI on GitHub Actions (tests and build on push/PR).
- Optional NPM publish workflow triggered by version tags.
