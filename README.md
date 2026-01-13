# Micro-Frontend ERP System

**Managed by Cascade AI**  
**Current Phase**: Phase 2 - Design System (40% Complete) 🚧

---

## 🚀 Project Objective

To architect and bootstrap a scalable, enterprise-grade **Micro-Frontend ERP System** using **Angular 21+**, **Nx**, and **native Webpack Module Federation**. The system addresses the need for independent domain deployment, team autonomy, and strict architectural boundaries.

---

## 📐 Architecture Overview

- **Pattern**: Monorepo with Shell (Host) + Remote Applications.
- **Tooling**: Nx Workspace (Angular Monorepo Preset).
- **Integration**: Native Webpack Module Federation (No `single-spa`, no `iframes`).
- **Styling**: SCSS.
- **Routing**: Angular Standalone Router (Lazy loading Remotes).

### Domain Boundaries

1.  **Shell**: Orchestration, Layout, Global Auth State.
2.  **Auth (Remote)**: Login, Registration, Session Management.
3.  **Finance (Remote)**: Invoicing, Reporting, Ledgers.
4.  **HR (Remote)**: Employee Management, Payroll.
5.  **Supply (Remote)**: Inventory, Procurement, Vendors.

---

## 🛠 Project Requirements (Non-Negotiable)

- **Framework**: Angular 21.0.8+ (Latest Stable).
- **Build System**: Nx 22.3.3+ (Latest Stable).
- **Node.js**: `v20.19.x`, `v22.12.x`, or `v24.x`.
- **Constraint**: **Strict Mode** enabled (TypeScript).
- **Communication**: Remotes **MUST NOT** import from other Remotes. All communication via Shell or Shared Libs.
- **Libs vs Apps**: Apps are thin shells; Business logic lives in `libs/`.

---

## 📊 Work Completed (Phases 1-3 Completed)

### Phase 1: Architecture Design ✅

- [x] Defined Micro-Frontend strategy (Host-Remote).
- [x] Established Domain Boundaries (Auth, Finance, HR, Supply).
- [x] Approved Monorepo structure.

### Phase 2: Workspace Structure ✅

- [x] Selected **Nx** over plain Angular CLI.
- [x] Defined Directory Structure (`apps/`, `libs/domain/type`).
- [x] Established Naming Conventions (`scope:auth`, `type:feature`).
- [x] Defined Dependency Rules (`type:feature` cannot import `type:app`).

### Phase 3: Technical Preparation ✅

- [x] Validated Environment (Node 20.19.6, npm 10.8.2).
- [x] Defined **EXACT** commands for implementation (See `.gemini/brain/.../technical-preparation.md`).
- [x] Configured Nx Tags schema.

---

## 🚧 Current Status & Phase 1 Completion

**Phase 1 Status**: ✅ COMPLETED

### What Was Accomplished:

1.  ✅ **Shell Configured**: Converted `apps/shell` to Module Federation Host with webpack configuration
2.  ✅ **Remotes Generated**: Created `remoteAuth`, `remoteFinance`, `remoteHr`, `remoteSupply` (Ports 4201-4204)
3.  ✅ **Libraries Created**: Generated `shared/ui`, `shared/utils`, `shared/models`, `auth/feature-login`, `auth/data-access`
4.  ✅ **Boundaries Enforced**: Updated `nx.json` with comprehensive dependency constraints
5.  ✅ **TypeScript Strict Mode**: Enabled in `tsconfig.base.json`
6.  ✅ **Module Federation**: Configured with singleton Angular packages across all apps
7.  ✅ **Nx Tags**: Applied to all projects for architectural boundary enforcement

**See**: [Phase 1 Completion Report](docs/phase1-completion-report.md) for full details.

### 📚 Enterprise Documentation

The following documentation serves as the **Single Source of Truth** for this project.

| Document                                                       | Description                                                       |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| [**Architecture Guide**](docs/architecture.md)                 | High-level system design, domain boundaries, and ADRs.            |
| [**Workspace Structure**](docs/workspace-structure.md)         | Nx Apps/Libs layout, naming conventions, and dependency rules.    |
| [**CI/CD Strategy**](docs/ci-cd.md)                            | Pipeline stages, artifact management, and caching.                |
| [**Deployment Guide**](docs/deployment.md)                     | Dynamic remote discovery, versioning, and rollback.               |
| [**Runtime Architecture**](docs/runtime.md)                    | Bootstrapping, error handling, and lazy loading flow.             |
| [**Technical Prep**](docs/technical-preparation.md)            | **Exact commands** to bootstrap the environment (Phase 3 output). |
| [**Phase 1 Completion Report**](docs/phase1-completion-report.md) | ✅ **Phase 1 implementation summary and verification checklist.** |
| [**Design System**](docs/DESIGN_SYSTEM.md)                     | 🎨 **Comprehensive design system documentation and guidelines.**   |
| [**Phase 2 Status**](docs/PHASE2_DESIGN_SYSTEM_STATUS.md)      | 🚧 **Phase 2 design system implementation progress (40%).**       |
| [**Cheat Sheet**](docs/examples.md)                            | Common CLI commands and code snippets.                            |

---

### Phase 1: Foundation Setup ✅ COMPLETED

**Completed**: All workspace setup, remote generation, library creation, and architectural constraints.

### Phase 2: Design System Implementation 🚧 IN PROGRESS (40%)

**Completed**:
- ✅ Tailwind CSS v3.x installed and configured with design tokens
- ✅ PrimeNG v18.x installed
- ✅ Theme library (`libs/shared/theme`) created with global styles
- ✅ Comprehensive design tokens (colors, typography, spacing, shadows)
- ✅ Dark mode support with CSS variables
- ✅ Button component (7 variants, 5 sizes, fully accessible)
- ✅ Shell integrated with design system

**In Progress**:
- 🚧 Core UI components (Input, Card, Modal, Table)
- 🚧 Form components (Checkbox, Radio, Switch, Select)
- 🚧 Navigation components (Navbar, Sidebar, Breadcrumbs)
- 🚧 Theme service with dark mode toggle
- 🚧 PrimeNG theme customization

**See**: [Design System Documentation](docs/DESIGN_SYSTEM.md) | [Phase 2 Status](docs/PHASE2_DESIGN_SYSTEM_STATUS.md)

**Next Phase**: Complete remaining components and Shell layout

---

## 💻 Running the Project

**Start Shell (Port 4200)**

```bash
npx nx serve shell
```

**Start Shell + One Remote (e.g., Auth)**

```bash
npx nx serve shell --devRemotes=remoteAuth
```

**Start Shell + All Remotes**

```bash
npx nx serve shell --devRemotes=remoteAuth,remoteFinance,remoteHr,remoteSupply
```

**Build Shell**

```bash
npx nx build shell
```

**Lint & Test**

```bash
npx nx lint shell
npx nx test shell
```

**View Dependency Graph**

```bash
npx nx graph
```

---

_Phase 1 completed, Phase 2 started by Cascade AI on 2026-01-13._
