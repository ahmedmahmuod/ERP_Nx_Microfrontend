# ERP Micro-Frontend System Overview

This repository contains an enterprise ERP frontend built with Angular and Nx using a micro-frontend architecture.

## What This App Is

The system is split into one host app (`shell`) and multiple business-domain remotes.
Each remote can be developed and deployed independently while still being integrated into one user experience.

## Architecture Summary

- Monorepo managed with Nx.
- Angular applications for host and remotes.
- Webpack Module Federation for runtime remote loading.
- Shared libraries under `libs/` for common UI, config, models, and utilities.
- Dependency constraints in Nx and ESLint to keep clear domain boundaries.

## Applications and Ports

| Application | Nx Project Name | Default Port | Role |
| --- | --- | --- | --- |
| Shell | `shell` | `4200` | Host app, layout, orchestration, routing |
| Auth Remote | `remoteAuth` | `4201` | Authentication and authorization domain |
| Finance Remote | `remoteFinance` | `4202` | Finance domain |
| HR Remote | `remoteHr` | `4203` | Human resources domain |
| SRM Remote | `remoteSrm` | `4207` | Supplier relationship management domain |
| PM Remote | `remotePm` | `4205` | Project management domain |
| Warehouses Remote | `remoteWarehouses` | `4206` | Warehousing and inventory domain |

## Core Features

- Modular domain-based frontend architecture.
- Independent remote deployment capability.
- Dynamic remote loading through federation.
- Shared design system and reusable component libraries.
- TypeScript-based codebase with strict tooling.
- CI-ready workspace with linting, testing, and build targets.

## Local Development

Prerequisites:

- Node.js `20.19.x`, `22.12.x`, or `24.x`
- npm `10.8.2+`

Install dependencies:

```bash
npm install
```

Run shell only:

```bash
npx nx serve shell
```

Run shell with selected remotes:

```bash
npx nx run shell:serve-mf --devRemotes=remoteAuth,remoteFinance,remoteHr
```

Run shell with all remotes:

```bash
npx nx run shell:serve-mf --devRemotes=remoteAuth,remoteFinance,remoteHr,remoteSrm,remotePm,remoteWarehouses
```

## Build and Test

Build shell (production):

```bash
npx nx build shell --configuration=production
```

Build all apps (production):

```bash
npx nx run-many --target=build --all --configuration=production
```

Run tests:

```bash
npx nx run-many --target=test --all
```

Run lint:

```bash
npx nx run-many --target=lint --all
```

## Documentation Index

- [01_ARCHITECTURE](./01_ARCHITECTURE.md)
- [02_TOOLING_STACK](./02_TOOLING_STACK.md)
- [03_WORKSPACE_STRUCTURE](./03_WORKSPACE_STRUCTURE.md)
- [04_MICROFRONTEND_MODULE_FEDERATION](./04_MICROFRONTEND_MODULE_FEDERATION.md)
- [05_DESIGN_SYSTEM](./05_DESIGN_SYSTEM.md)
- [06_ROUTING_AND_NAVIGATION](./06_ROUTING_AND_NAVIGATION.md)
- [07_CICD](./07_CICD.md)
- [08_DEPLOYMENT](./08_DEPLOYMENT.md)
- [09_USER_GUIDE](./09_USER_GUIDE.md)
- [10_DEVELOPER_GUIDE](./10_DEVELOPER_GUIDE.md)
- [11_TROUBLESHOOTING](./11_TROUBLESHOOTING.md)
- [12_DESIGN_PATTERNS](./12_DESIGN_PATTERNS.md)
