# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MZ Player is a Yarn Berry (v4) monorepo containing a HLS-based React media player library (`mz-player`) and a Next.js demo application. The project uses Turbo for build orchestration and Biome for linting/formatting (replacing ESLint + Prettier).

## Common Commands

### Development
```bash
# Start all apps in dev mode (uses Turbo's --turbopack flag for Next.js)
yarn dev

# Build all packages and apps
yarn build

# Build specific package (e.g., player package only)
yarn turbo run build --filter=mz-player

# Type check across all workspaces
yarn type-check
```

### Linting & Formatting
```bash
# Lint with Biome (check only)
yarn lint

# Lint and auto-fix (includes import organization)
yarn lint:fix

# Format code with Biome
yarn format
```

### Package Management
```bash
# Install dependencies (uses Yarn Berry with node_modules linker)
yarn install

# Add dependency to specific workspace
yarn workspace <workspace-name> add <package>

# Example: Add lodash to web app
yarn workspace @root/web add lodash

# Example: Add dev dependency to player package
yarn workspace mz-player add -D @types/node
```

### Initial Setup
```bash
# Setup script to rename organization from @mz-player to custom name
yarn setup
```

## Architecture

### Monorepo Structure

The repository follows a workspace-based architecture:

**Apps (`apps/`):**
- `@root/web` - Next.js 15 demo application using App Router and Turbopack
  - Located at `apps/web/`
  - Uses `mz-player` package for media playback demo
  - Configured with Tailwind CSS v4

**Packages (`packages/`):**
- `mz-player` - Main HLS-based media player library (published to npm)
  - Uses compound component pattern for flexible UI composition
  - Built with tsup (outputs CJS, ESM, and .d.ts files)
  - Includes "use client" directive for RSC compatibility
  - Dependencies: hls.js for HLS streaming support

- `@root/ui-components` - Shared React UI component library
  - Built with tsup
  - Internal workspace package (not published)

- `@root/utils` - Shared utility functions
  - Built with tsup
  - Internal workspace package (not published)

- `@root/tsconfig` - Shared TypeScript configurations
  - Contains: `base.json`, `nextjs.json`, `react-library.json`

### Media Player Architecture

The `mz-player` package uses a compound component pattern:

**Core Components:**
- `MediaPlayer` - Root component with context provider
- `MediaPlayer.Controls` - Controls container
- `MediaPlayer.ButtonGroup` - Button group wrapper
- Individual controls: PlayButton, VolumeControl, SeekBar, TimeDisplay, SubtitleButton, PiPButton, FullscreenButton

**Context & State:**
- `MediaPlayerContext` provides shared state to all compound components
- Accessed via `useMediaPlayerContext()` hook

**Key Hooks:**
- `useHLS` - Manages HLS.js initialization and cleanup for HLS streaming
- `useMediaControls` - Handles video element state (play, pause, seek, volume, fullscreen, PiP)
- `useSubtitles` - Manages subtitle track selection and rendering

**Export Pattern:**
Component exports support both named imports and compound pattern:
```tsx
import { MediaPlayer } from 'mz-player';

// Compound component usage
<MediaPlayer src="...">
  <MediaPlayer.Controls>
    <MediaPlayer.PlayButton />
  </MediaPlayer.Controls>
</MediaPlayer>
```

## Build System

### Turbo Configuration

Build tasks are orchestrated via Turbo (`turbo.json`):
- `build` - Outputs to `.next/**` (apps) or `dist/**` (packages), depends on `^build`
- `dev` - Non-cached, persistent tasks
- `lint`, `type-check` - Depend on upstream workspace tasks (`^lint`, `^type-check`)

### Package Building

Packages use tsup for bundling:
- Outputs: CJS (`dist/index.js`), ESM (`dist/index.mjs`), TypeScript definitions (`dist/index.d.ts`)
- Player package includes CSS output (`dist/player.css`) via `entry: ['src/index.ts', 'src/styles/player.css']`
- "use client" banner is automatically added to player package for React Server Components compatibility

## Code Quality

### Biome Configuration

Biome replaces ESLint + Prettier with a unified tool. Key settings (`biome.json`):

**Formatter:**
- 2-space indentation
- 100 character line width
- Single quotes (except JSX uses double quotes)
- Semicolons required
- Trailing commas: es5 style

**Linter Rules:**
- `noExplicitAny`: warn (error in `packages/utils`)
- `noUnusedVariables`: warn (error in `packages/utils`)
- `useImportType`: error (enforces type imports)
- `noForEach`: off
- `useExhaustiveDependencies`: off (for React hooks)

**Import Organization:**
Imports are automatically sorted in this order:
1. `react`
2. `next/**` (for Next.js apps)
3. External packages (`:PACKAGE:`)
4. Workspace packages (`@root/**`)
5. Relative imports (`**`)
6. Type imports (`{ "type": true }`)

Trigger with `yarn lint:fix` or save in VSCode (if Biome extension installed).

**Overrides:**
- React files (`apps/*/src/**/*.tsx`, `packages/ui/**/*.tsx`, `packages/player/**/*.tsx`): a11y rules enabled
- Utils package (`packages/utils/**/*.ts`): Stricter rules (noExplicitAny: error)

## CI/CD Workflows

### Pull Request CI (`.github/workflows/ci.yml`)
Triggers on PRs to `main`:
1. Type checking (`yarn type-check`)
2. Linting (`yarn lint`)

### Release Workflow (`.github/workflows/release.yml`)
Triggers on push to `main` branch:

**Automated Versioning:**
- Analyzes conventional commits in `packages/player` directory
- Version bump logic:
  - `feat!:` or `BREAKING CHANGE` → major bump
  - `feat:` → minor bump
  - `fix:`, `perf:`, `refactor:`, `revert:` → patch bump
  - Default → patch bump

**Release Steps:**
1. Build `mz-player` package
2. Determine version from commits
3. Update `package.json` version
4. Commit version bump
5. Create git tag (`v{version}`)
6. Publish to npm with `--access public`
7. Generate changelog from git log
8. Create GitHub Release

**Important:** Only commits in `packages/player/**` affect versioning. Use conventional commit format for proper version bumps.

## Package Publishing

The `mz-player` package is published to npm automatically via GitHub Actions. For manual publishing:

```bash
# Build the package
yarn workspace mz-player build

# Publish (from package directory)
cd packages/player
npm publish --access public
```

Package name in npm: `mz-player` (not scoped)

## TypeScript Configuration

Workspaces extend from `@root/tsconfig`:
- Next.js apps: extend `@root/tsconfig/nextjs.json`
- React libraries: extend `@root/tsconfig/react-library.json`
- Other packages: extend `@root/tsconfig/base.json`

## Yarn Berry Notes

- Uses node_modules linker (not Plug'n'Play) for compatibility
- Local cache in `.yarn/cache/` (ignored in git)
- Workspace protocol: Internal dependencies use `"*"` version
- Package manager enforced: `yarn@4.1.0` (via `packageManager` field)
- Enable with: `corepack enable`
