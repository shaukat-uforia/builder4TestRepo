# Monorepo: Web App + UI Component Library

This monorepo contains:

- `apps/web`: The main React application.
- `packages/ui`: A shared UI component library using **Tailwind CSS**, **ShadCN**, and **Storybook**.

Managed using **pnpm workspaces** for local development and shared code between projects.

---

## 📁 Workspace Structure

```
.
├── apps/
│   └── web/           # Main React App
├── packages/
│   └── ui/            # UI Component Library with ShadCN + Storybook
├── pnpm-workspace.yaml
├── package.json       # Root config for monorepo
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.x
- [pnpm](https://pnpm.io/) ≥ 8.x

---

### 🛠️ Initial Setup

1. **Clone the repo**:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install all dependencies**:

   ```bash
   pnpm install
   ```

   This installs packages and links local workspaces (`@my/ui`).

---

## 📦 UI Component Development (`packages/ui`)

The `ui` package is a reusable component library using:

- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Storybook](https://storybook.js.org/)

### Run Storybook:

```bash
cd packages/ui
pnpm storybook
```

Use this environment to:

- Build & preview new UI components
- Create `.stories.tsx` for documentation & testing

### Folder Structure:

```
packages/ui/
├── src/
│   ├── components/     # Your reusable UI components
│   ├── stories/        # Storybook stories
│   ├── index.ts        # Exports for UI library
```

### Example Component Import (in web app):

```tsx
import { Button } from '@my/ui';
```

---

## 🌐 Main Web App (`apps/web`)

The `web` app consumes UI components from the `@my/ui` package and builds the actual product frontend.

### Run Web App:

```bash
cd apps/web
pnpm dev
```

Any updates made to `@my/ui` will reflect automatically if the dev server is running.

---

## 🧩 Workspace Configuration

### Root `pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - packages/*
```

### `@my/ui` package.json:

```json
{
  "name": "@my/ui",
  "version": "0.0.1",
  "main": "src/index.ts"
}
```

### Consuming `@my/ui` in `apps/web`:

```json
{
  "dependencies": {
    "@my/ui": "workspace:*"
  }
}
```

---

## 🧑‍💻 Developer Workflow

### UI Developer (Component Library)

```bash
cd packages/ui
pnpm storybook
```

- Build UI components
- Add stories
- Push updates to Git

### App Developer (Main App)

```bash
cd apps/web
pnpm dev
```

- Use components from `@my/ui`
- Pages, routing, app logic

---

## 🧹 Scripts

| Script | Location | Description |
|--------|----------|-------------|
| `pnpm storybook` | `packages/ui` | Launch Storybook UI |
| `pnpm dev` | `apps/web` | Start main app (Vite, Next.js, etc.) |
| `pnpm install` | root | Install all dependencies and link packages |

---

## 📄 License

MIT – Feel free to use and modify.
