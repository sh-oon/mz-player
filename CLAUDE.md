# CLAUDE.md - AI Assistant Guide for MZ Player

This document provides comprehensive information about the MZ Player monorepo for AI assistants to effectively work with this codebase.

## Project Overview

**MZ Player** is a TypeScript-based Yarn Berry monorepo that provides a production-ready React HLS media player library with a demo application.

- **Repository**: https://github.com/sh-oon/mz-player.git
- **License**: MIT
- **Author**: sh-oon
- **Package Manager**: Yarn 4.1.0 (Berry with node-modules linker)
- **Primary Product**: `mz-player` npm package (v0.1.1) - A feature-rich HLS media player component

## Codebase Structure

```
mz-player/
├── .github/
│   └── workflows/
│       ├── ci.yml              # PR validation (lint, type-check)
│       ├── release.yml         # Automated versioning & npm publishing
│       └── turbo-cache.yml     # Turbo build caching
│
├── apps/
│   └── web/                    # Next.js 15 demo application
│       ├── src/app/
│       │   ├── layout.tsx      # Root layout with Geist font
│       │   ├── page.tsx        # Demo homepage with player examples
│       │   └── globals.css     # Tailwind CSS v4 configuration
│       ├── next.config.ts
│       ├── tsconfig.json       # Extends @root/tsconfig/nextjs.json
│       └── package.json        # Dependencies: Next 15, React 19, Tailwind 4
│
├── packages/
│   ├── player/                 # 🎯 Core HLS media player library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── MediaPlayer.tsx          # Main component (compound pattern)
│   │   │   │   ├── Controls.tsx             # Basic controls wrapper
│   │   │   │   └── compound/                # Sub-components
│   │   │   │       ├── PlayButton.tsx
│   │   │   │       ├── SeekBar.tsx
│   │   │   │       ├── TimeDisplay.tsx
│   │   │   │       ├── VolumeControl.tsx
│   │   │   │       ├── SubtitleButton.tsx
│   │   │   │       ├── PiPButton.tsx
│   │   │   │       ├── FullscreenButton.tsx
│   │   │   │       ├── ButtonGroup.tsx
│   │   │   │       └── ControlsContainer.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useHLS.ts                # HLS streaming integration
│   │   │   │   ├── useMediaControls.ts      # Media control logic
│   │   │   │   └── useSubtitles.ts          # Subtitle management
│   │   │   ├── context/
│   │   │   │   └── MediaPlayerContext.tsx   # Centralized state
│   │   │   ├── types/
│   │   │   │   ├── index.ts                 # TypeScript interfaces
│   │   │   │   └── fullscreen.d.ts          # Fullscreen API types
│   │   │   ├── styles/
│   │   │   │   └── player.css               # Component styles
│   │   │   └── index.ts                     # Barrel exports
│   │   ├── tsup.config.ts      # Build config (ESM + CJS + CSS)
│   │   ├── biome.json          # Package-specific lint rules
│   │   └── package.json        # Published as "mz-player" on npm
│   │
│   ├── ui/                     # Shared UI components
│   │   └── src/
│   │       ├── Button.tsx      # Example button component
│   │       └── index.ts
│   │
│   ├── utils/                  # Utility functions
│   │   └── src/
│   │       ├── formatDate.ts   # Date formatting
│   │       ├── debounce.ts     # Debounce function
│   │       └── index.ts
│   │
│   └── tsconfig/               # Shared TypeScript configs
│       ├── base.json           # Base config (ES2020, strict)
│       ├── nextjs.json         # Next.js specific
│       └── react-library.json  # React library config
│
├── package.json                # Root workspace configuration
├── turbo.json                  # Turbo build system config
├── biome.json                  # Linter/formatter configuration
├── tsconfig.json               # Root TypeScript references
└── .yarnrc.yml                 # Yarn Berry configuration
```

## Technology Stack

### Core Technologies
- **Language**: TypeScript 5.3.3
- **Package Manager**: Yarn 4.1.0 (Berry, node-modules mode)
- **Build Orchestration**: Turbo 2.5.8
- **Linter/Formatter**: Biome 2.2.5 (replaces ESLint + Prettier)

### Frontend Stack
- **Framework**: Next.js 15.5.4 (apps/web)
- **React**: 19.2.0 (all packages)
- **Styling**: Tailwind CSS 4 (apps/web), CSS Modules (packages/player)
- **Media Streaming**: hls.js 1.5.26

### Build Tools
- **Library Bundler**: tsup (for all packages)
- **App Bundler**: Next.js with Turbopack
- **Output Formats**: ESM + CJS with TypeScript declarations

## Key Packages

### packages/player (mz-player)
**Purpose**: Production-ready HLS media player component with compound component pattern

**Key Features**:
- HLS streaming support (adaptive bitrate)
- Compound component pattern for flexible customization
- Full controls: play/pause, seek, volume, fullscreen, PiP
- Multi-language subtitle support (.vtt)
- Context-based state management
- TypeScript with full type safety

**Exports**:
- `MediaPlayer` + compound components (PlayButton, SeekBar, etc.)
- Hooks: `useHLS`, `useMediaControls`, `useSubtitles`
- Context: `useMediaPlayerContext`
- All TypeScript types

**Dependencies**:
- `hls.js@^1.5.26` (production)
- Peer deps: `react@>=18.0.0`, `react-dom@>=18.0.0`

**Build**: tsup → ESM + CJS + CSS + DTS

### packages/ui (@root/ui-components)
**Purpose**: Shared React UI components

**Current Exports**: `Button` component

**Build**: tsup → ESM + CJS + DTS

### packages/utils (@root/utils)
**Purpose**: Shared utility functions

**Exports**:
- `formatDate(date: Date): string` - Date to YYYY-MM-DD
- `debounce<T>(fn: T, delay: number): T` - Generic debounce

**Build**: tsup → ESM + CJS + DTS

**Note**: Strictest linting rules (noExplicitAny: error)

### packages/tsconfig (@root/tsconfig)
**Purpose**: Centralized TypeScript configurations

**Configs**:
- `base.json` - Base config for all packages
- `nextjs.json` - Next.js apps (DOM, Next.js plugin)
- `react-library.json` - React libraries (JSX react-jsx)

## Development Workflows

### Getting Started
```bash
# Enable Yarn Berry
corepack enable

# Install dependencies
yarn install

# Run all apps in dev mode
yarn dev

# Build all packages
yarn build

# Lint with Biome
yarn lint

# Auto-fix lint issues
yarn lint:fix

# Format code
yarn format

# Type check
yarn type-check
```

### Working with Specific Packages
```bash
# Run player package in watch mode
yarn workspace @root/player dev

# Build player package
yarn workspace @root/player build

# Run web app
yarn workspace @root/web dev
```

### Adding Dependencies
```bash
# Add to root workspace
yarn add -D <package>

# Add to specific package
yarn workspace @root/player add <package>

# Add to specific app
yarn workspace @root/web add <package>
```

## Important Conventions

### 1. Compound Component Pattern
The MediaPlayer uses React's compound component pattern for maximum flexibility:

```tsx
// Basic usage
<MediaPlayer src="video.m3u8" />

// Custom composition
<MediaPlayer src="video.m3u8">
  <MediaPlayer.Controls>
    <MediaPlayer.TimeDisplay />
    <MediaPlayer.SeekBar />
    <MediaPlayer.ButtonGroup>
      <MediaPlayer.PlayButton />
      <MediaPlayer.VolumeControl />
    </MediaPlayer.ButtonGroup>
  </MediaPlayer.Controls>
</MediaPlayer>
```

### 2. Naming Conventions
- **Internal packages**: `@root/*` scope
- **Published packages**: No scope (e.g., `mz-player`)
- **Components**: PascalCase (MediaPlayer, PlayButton)
- **Hooks**: camelCase with `use` prefix (useHLS, useMediaControls)
- **Types**: PascalCase interfaces (MediaPlayerProps, SubtitleTrack)

### 3. Import Organization (Biome)
Imports are automatically organized in this order:
1. `react` - React library
2. `next`, `next/**` - Next.js (apps/web only)
3. External libraries (node_modules)
4. `@root/**` - Internal monorepo packages
5. Relative imports (`./`, `../`)
6. Type imports (`import type { ... }`)

### 4. Context-Based State Management
- `MediaPlayerContext` provides centralized media state
- Use `useMediaPlayerContext()` hook to access state
- State includes: isPlaying, currentTime, duration, volume, subtitle tracks, etc.

### 5. TypeScript Configuration Hierarchy
```
packages/tsconfig/base.json (strict, ES2020)
  ↓
  ├─→ nextjs.json (DOM libs, Next.js plugin)
  └─→ react-library.json (JSX support)
```

All packages extend one of these shared configs.

### 6. Workspace Dependencies
Internal packages use `"*"` as version:
```json
{
  "dependencies": {
    "@root/ui-components": "*",
    "mz-player": "*"
  }
}
```

## Configuration Files Reference

### biome.json (Root)
- **Formatter**: 2-space indent, 100-char line width, single quotes
- **Linter**: Recommended rules with customizations
  - `useImportType`: error (enforce type imports)
  - `noExplicitAny`: warn (error in packages/utils)
  - `useExhaustiveDependencies`: off (React hooks lenient)
  - `noUnusedVariables`: warn (error in packages/utils)
- **Overrides**:
  - React files: Enable a11y rules
  - packages/utils: Strictest rules

### turbo.json
- **Tasks**: build, dev, lint, type-check
- **Caching**: Enabled for build, disabled for dev
- **Dependencies**: `^build` ensures dependencies build first

### tsconfig.json (Root)
- **References**: packages/ui, packages/utils
- **Base config**: ES2020, moduleResolution: bundler, strict: true

### .yarnrc.yml
- **nodeLinker**: node-modules (not PnP for compatibility)
- **Cache**: Local .yarn/cache directory

## CI/CD Pipeline

### Pull Request Workflow (ci.yml)
**Triggers**: PR to main branch

**Steps**:
1. Checkout code
2. Setup Node.js 20
3. Enable Corepack
4. Cache Yarn dependencies
5. Install dependencies (`yarn install --immutable`)
6. Run type-check (`yarn type-check`)
7. Run lint (`yarn lint`)

### Release Workflow (release.yml)
**Triggers**: Push to main branch

**Automated Process**:
1. Analyze commits in `packages/player/` since last tag
2. Determine version bump via conventional commits:
   - `feat:` → minor version
   - `fix:`, `perf:`, `refactor:`, `revert:` → patch version
   - Breaking change (`!` or `BREAKING CHANGE:`) → major version
3. Update `packages/player/package.json` version
4. Create git commit and tag (`@root/player@x.y.z`)
5. Publish to npm with `--provenance --access public`
6. Generate GitHub Release with changelog

**Important**: Only `packages/player` (published as `mz-player`) is released automatically.

### Conventional Commits
Follow conventional commit format for automatic versioning:
```
feat: add subtitle download feature       # → minor bump
fix: resolve fullscreen button issue      # → patch bump
feat!: redesign player API                # → major bump
```

## Common Tasks for AI Assistants

### Adding a New Component to packages/player
1. Create component in `packages/player/src/components/compound/`
2. Export from `packages/player/src/components/compound/index.ts`
3. Add to MediaPlayer compound components in `MediaPlayer.tsx`
4. Export from `packages/player/src/index.ts`
5. Update types in `packages/player/src/types/index.ts` if needed
6. Run `yarn workspace @root/player build` to test

### Updating Shared Configuration
1. Modify `packages/tsconfig/` files for TypeScript configs
2. Modify root `biome.json` for linting/formatting rules
3. Modify `turbo.json` for build configuration
4. Test changes: `yarn build && yarn lint && yarn type-check`

### Adding a New Package
1. Create directory: `mkdir -p packages/new-package/src`
2. Create `package.json` with `@root/new-package` name
3. Add to root `package.json` workspaces (if not in packages/*)
4. Add TypeScript config extending `@root/tsconfig/base.json`
5. Add to root `tsconfig.json` references
6. Run `yarn install` to register package

### Modifying the Player API
1. Update types in `packages/player/src/types/index.ts`
2. Update implementation in relevant component/hook
3. Update context if state changes needed
4. Update demo in `apps/web/src/app/page.tsx`
5. Test locally: `yarn workspace @root/web dev`
6. Consider if this is a breaking change (affects versioning)

### Updating Dependencies
1. Use `yarn add` or `yarn workspace <name> add`
2. Never manually edit `package.json` versions
3. Run `yarn install` after changes
4. Commit `yarn.lock` changes
5. Test: `yarn build && yarn type-check`

## Code Quality Guidelines

### Linting Rules
- **All files**: Biome recommended rules
- **React files**: a11y (accessibility) rules enabled
- **packages/utils**: Strictest rules (no `any`, unused vars are errors)
- **Type imports**: Always use `import type { ... }` for types

### TypeScript Best Practices
- **Strict mode**: Always enabled
- **Explicit return types**: Recommended for exported functions
- **No `any`**: Avoid (error in packages/utils, warn elsewhere)
- **Null checks**: Use optional chaining and nullish coalescing

### React Best Practices
- **Hooks**: Follow Rules of Hooks
- **Dependencies**: Dependency arrays are lenient (useExhaustiveDependencies: off)
- **Accessibility**: a11y rules enabled (use semantic HTML, aria-labels)
- **Props**: Define TypeScript interfaces for all component props

### CSS/Styling
- **packages/player**: CSS files in `src/styles/`, bundled via tsup
- **apps/web**: Tailwind CSS v4 with utility-first approach
- **Responsive**: Use responsive design patterns (mobile-first)

## Git Workflow

### Branch Strategy
- **Main branch**: Protected, requires CI passing
- **Feature branches**: Use descriptive names (e.g., `feat/subtitle-download`)
- **Claude branches**: AI-generated branches start with `claude/`

### Commit Messages
Follow conventional commits:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore

**Examples**:
```
feat(player): add picture-in-picture support
fix(ui): resolve button hover state issue
docs: update README with new examples
chore(deps): upgrade hls.js to 1.5.27
```

### Push and PR Process
1. Create feature branch
2. Make changes and commit with conventional commits
3. Push to remote: `git push -u origin branch-name`
4. Create PR (CI will run automatically)
5. Merge to main after CI passes
6. Release workflow runs automatically

## Security Considerations

### General Security
- **No credentials**: Never commit API keys, tokens, or secrets
- **Dependencies**: Dependabot runs weekly to update dependencies
- **npm provenance**: Enabled for published packages (supply chain security)

### Code Security
- **XSS Prevention**: Be cautious with `dangerouslySetInnerHTML`
- **Injection**: Validate and sanitize user inputs
- **CORS**: Configure properly for media sources
- **CSP**: Consider Content Security Policy for apps

## Testing (Future)

**Current Status**: No testing framework configured yet.

**Recommendations**:
- Jest or Vitest for unit tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests
- Coverage target: 80%+

## Tips for AI Assistants

### Before Making Changes
1. **Read the context**: Use Read tool to examine relevant files
2. **Check dependencies**: Understand package relationships
3. **Review conventions**: Follow established patterns
4. **Test locally**: Verify changes work before committing

### When Adding Features
1. **Start with types**: Define TypeScript interfaces first
2. **Follow patterns**: Use compound component pattern for player components
3. **Update demos**: Add examples to apps/web if relevant
4. **Consider versioning**: Is this a breaking change?

### When Fixing Bugs
1. **Reproduce first**: Understand the issue
2. **Minimal changes**: Fix only what's necessary
3. **Test thoroughly**: Verify fix works
4. **Update types**: Ensure TypeScript reflects changes

### When Refactoring
1. **Preserve behavior**: Don't change functionality
2. **Incremental changes**: Small, focused commits
3. **Run tests**: Ensure nothing breaks (once tests exist)
4. **Update docs**: Keep documentation in sync

### Tool Usage
- **Prefer specialized tools**: Use Read/Edit/Write instead of Bash for file ops
- **Parallel operations**: Run independent tasks in parallel
- **Task tool**: Use for complex multi-step operations
- **Glob/Grep**: Use for searching files/content

### Common Pitfalls to Avoid
- ❌ Don't modify `yarn.lock` manually
- ❌ Don't use `@ts-ignore` or `@ts-nocheck`
- ❌ Don't skip CI checks
- ❌ Don't commit `node_modules` or `.yarn/cache`
- ❌ Don't use `console.log` in production code
- ❌ Don't bypass Biome formatting rules

### Best Practices
- ✅ Run `yarn lint:fix` before committing
- ✅ Use conventional commit messages
- ✅ Keep changes focused and atomic
- ✅ Update TypeScript types when changing APIs
- ✅ Test in both development and production builds
- ✅ Consider accessibility in UI changes

## Useful File Paths

### Configuration
- `/home/user/mz-player/package.json` - Root workspace config
- `/home/user/mz-player/turbo.json` - Build orchestration
- `/home/user/mz-player/biome.json` - Linting/formatting
- `/home/user/mz-player/tsconfig.json` - TypeScript root config

### Player Package
- `/home/user/mz-player/packages/player/src/components/MediaPlayer.tsx` - Main component
- `/home/user/mz-player/packages/player/src/hooks/` - Custom hooks
- `/home/user/mz-player/packages/player/src/types/index.ts` - TypeScript types
- `/home/user/mz-player/packages/player/package.json` - Package manifest

### Demo App
- `/home/user/mz-player/apps/web/src/app/page.tsx` - Homepage with examples
- `/home/user/mz-player/apps/web/src/app/layout.tsx` - Root layout
- `/home/user/mz-player/apps/web/package.json` - App dependencies

### CI/CD
- `/home/user/mz-player/.github/workflows/ci.yml` - PR validation
- `/home/user/mz-player/.github/workflows/release.yml` - Auto-release

## Project Metadata

- **Created**: 2024-2025 (based on commit history)
- **Primary Language**: TypeScript (100%)
- **Node.js Version**: 20+ (CI requirement)
- **React Version**: 19.2.0
- **Next.js Version**: 15.5.4
- **Package Registry**: npm (public)
- **Main Package**: mz-player@0.1.1

## Support and Resources

- **Repository**: https://github.com/sh-oon/mz-player
- **Issues**: https://github.com/sh-oon/mz-player/issues
- **NPM Package**: https://www.npmjs.com/package/mz-player
- **Biome Docs**: https://biomejs.dev/
- **Turbo Docs**: https://turbo.build/
- **Yarn Berry Docs**: https://yarnpkg.com/

---

**Last Updated**: 2025-11-14

This document should be updated whenever significant architectural changes, new patterns, or major features are added to the project.
