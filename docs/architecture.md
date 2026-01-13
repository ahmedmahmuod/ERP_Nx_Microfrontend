# Enterprise ERP Architecture Guide

**Version**: 1.0.0
**Last Updated**: 2026-01-13
**Status**: APPROVED

---

## 1. Project Overview

### 1.1 Objective & Scope

The goal is to build a scalable, resilient, and independent **Enterprise Resource Planning (ERP)** system. The architectural driver is to allow multiple domain teams to work autonomously while maintaining a cohesive user experience.

### 1.2 Micro-Frontend Architecture

We utilize a **Shell (Host) + Remote** architecture pattern implemented via **Native Webpack Module Federation**.

- **Shell (Host)**: The entry point. Responsible for global layout, authentication context, and loading remotes.
- **Remotes**: Independent applications serving specific business domains. They expose their routes to the Shell.
- **No Meta-Frameworks**: We do NOT use `single-spa` or `iframe` based integration. We use native Angular + Webpack federation.

```mermaid
graph TD
    User[User Browser] -->|Routes| Shell
    subgraph "Browser Runtime"
        Shell[Shell App (Host)]
        Shell -->|Lazy Load| Auth[Auth Remote]
        Shell -->|Lazy Load| Finance[Finance Remote]
        Shell -->|Lazy Load| HR[HR Remote]
        Shell -->|Lazy Load| Supply[Supply Remote]
    end
    subgraph "Domain Ownership"
        Auth -- Team A
        Finance -- Team B
        HR -- Team C
        Supply -- Team D
    end
```

### 1.3 Domain Boundaries

The system is divided into strict Bounded Contexts:

| Domain      | Scope     | Responsibilities                            | Ownership       |
| ----------- | --------- | ------------------------------------------- | --------------- |
| **Auth**    | Identity  | Login, Registration, MFA, Session Refresh   | Security Team   |
| **Finance** | Ledger    | Invoicing, Tax, Reporting, Accounts Payable | Finance Team    |
| **HR**      | People    | Employee Data, Payroll, Leave Management    | HR Team         |
| **Supply**  | Logistics | Inventory, Vendors, Procurement, Shipping   | Operations Team |

### 1.4 Monorepo Structure

We use a **Monorepo** managed by **Nx** to house all applications and libraries. This enables:

- **Shared Standards**: Single tooling config (TS, Lint, Build).
- **Code Reuse**: Explicit sharing of UI, Utils, and Auth Logic.
- **Atomic Changes**: Ability to refactor cross-cutting concerns safely.

---

## 2. Workspace & Nx Implementation

### 2.1 Directory Structure

The workspace follows a strict hierarchy to separating "Deployables" from "Logic".

```text
erp/
├── apps/                   # DEPLOYABLE UNITS
│   ├── shell/              # Host Application
│   ├── remote-auth/        # Remote App
│   ├── remote-finance/     # Remote App
│   ├── remote-hr/          # Remote App
│   └── remote-supply/      # Remote App
├── libs/                   # BUSINESS LOGIC & COMPOSITION
│   ├── shared/             # Enterprise-wide reuse
│   │   ├── ui/             # Design System Components
│   │   ├── utils/          # Pure functions (Date, Currency)
│   │   └── models/         # Global Interfaces
│   ├── auth/               # Auth Domain Libs (Private to Auth)
│   ├── finance/            # Finance Domain Libs
│   ├── hr/                 # HR Domain Libs
│   └── supply/             # Supply Domain Libs
└── tools/                  # Workspace scripts & generators
```

### 2.2 Library Types & Boundaries

Nx Tags (`scope:` and `type:`) enforce architectural rules via `nx lint`.

| Library Type    | Tag                | Description                    | Dependencies Allowed        |
| --------------- | ------------------ | ------------------------------ | --------------------------- |
| **Feature**     | `type:feature`     | Smart components, Page routing | `data-access`, `ui`, `util` |
| **Data Access** | `type:data-access` | State (Mgmt), API Services     | `util`, `model`             |
| **UI**          | `type:ui`          | Dumb/Presentational components | `util`, `model`             |
| **Util**        | `type:util`        | Pure functions, formatters     | `model`                     |
| **Model**       | `type:model`       | TypeScript Interfaces          | None                        |

### 2.3 Strict TypeScript & Quality Standards

- **Strict Mode**: Enabled in `tsconfig.base.json`. No `any`, strict null checks.
- **Linting**: ESLint with `@nx/angular` rules + custom boundary constraints.
- **Formatting**: Prettier enforced pre-commit.

---

## 3. Architecture Decision Records (ADR Summary)

### ADR-001: Native Federation

**Decision**: Use Angular CLI + `@nx/angular` + Webpack Module Federation.
**Reason**: Native integration offers better performance and shared dependency management (Singleton Angular Core) compared to `single-spa`.

### ADR-002: Apps vs Libs

**Decision**: Apps are "Thin Shells". 99% of code lives in `libs`.
**Reason**: Enables faster testing (`nx test lib`), better caching, and stricter boundary enforcement.

### ADR-003: No Remote-to-Remote Imports

**Decision**: Remotes cannot import code from other remotes.
**Reason**: Prevents runtime coupling and circular dependencies. Shared code must be moved to `libs/shared`.

---

_This document serves as the high-level source of truth for the Architecture._
