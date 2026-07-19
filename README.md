# use-temporal-state-history

> A high-performance, lightweight React hook for managing state with full time-travel (undo/redo) capabilities.

## 🚀 Features
- **Time Travel:** Built-in undo/redo functionality.
- **Strict Typing:** Written in TypeScript with full Generic support.
- **Memory Efficient:** Customizable history limit to prevent memory leaks.
- **Mutable Safe:** Optional deep cloning (via `structuredClone`) to prevent state mutation bugs.
- **Skip Logic:** Ability to update state without creating a new history entry.

## 📦 Installation
```bash
pnpm add use-temporal-state-history
```

## 🛠 Usage
```tsx
import { useTemporal } from 'use-temporal-state-history';

function MyComponent() {
  const [text, setText, { undo, redo, canUndo, canRedo }] = useTemporal("", { 
    clone: true, 
    limit: 20 
  });

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
```

## ⚙️ Options
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `clone` | boolean | `false` | Enables deep cloning for complex objects. |
| `limit` | number | `Infinity` | Maximum history steps to keep in memory. |

## 📄 License
MIT
```

---
