A lightweight, performant conditional rendering component for React and Next.js.

## Features

- 🚀 **Lightweight**: Zero dependencies (only React as peer dependency, of course).
- ⚡ **Performant**: Supports lazy evaluation of children via render props to avoid unnecessary instantiation.
- 🛡️ **Type-safe**: Built with TypeScript.
- 🧩 **Flexible**: Supports `fallback` prop for "else" cases.

## Installation

```bash
npm install @lazylab/show-react
# or
pnpm add @lazylab/show-react
# or
yarn add @lazylab/show-react
```

## Usage

### Basic Usage

```tsx
import { Show } from '@lazylab/show-react';

function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Show when={isVisible} fallback={<p>Not visible</p>}>
      <div>Now you see me!</div>
    </Show>
  );
}
```

### Lazy Evaluation (Performance Optimization)

If you have expensive components or calculations inside the conditional block, you can pass a function as children. This ensures the content is only evaluated when `when` is true.

```tsx
import { Show } from '@lazylab/show-react';

function MyComponent() {
  return (
    <Show when={isAdmin}>
      {() => <HeavyAdminDashboard />}
    </Show>
  );
}
```

## API

### `<Show />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `when` | `boolean` \| `null` \| `undefined` | Required | The condition to check. |
| `fallback` | `ReactNode` | `null` | Content to render when condition is falsy. |
| `children` | `ReactNode` \| `() => ReactNode` | Required | Content to render when condition is truthy. |

## License

MIT
