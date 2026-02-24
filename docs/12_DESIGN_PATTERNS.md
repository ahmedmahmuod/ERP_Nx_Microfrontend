# Design Patterns Used in the ERP Micro-Frontend

## Purpose

This document lists the software and architectural design patterns currently used in the application and explains why each pattern is used.

## Architectural Patterns

| Pattern | Why It Is Used |
| --- | --- |
| Micro-Frontend Host and Remotes | Enables independent development and deployment of business domains while keeping one integrated user experience in the Shell. |
| Domain-Bounded Contexts (DDD style) | Keeps each domain (Auth, Finance, HR, SRM, PM, Warehouses) isolated to reduce coupling and improve maintainability. |
| Module Federation Plugin Contract (`./Routes`, `./Manifest`) | Defines a consistent integration contract for remotes so the Shell can load them dynamically at runtime. |
| Shared Dependency Singleton (Module Federation `shared`) | Ensures one runtime instance of critical packages (for example Angular and RxJS) to avoid DI/runtime conflicts across host and remotes. |

## Application and UI Patterns

| Pattern | Why It Is Used |
| --- | --- |
| Facade Pattern | Centralizes orchestration logic in services (navigation, auth, sidebar, permissions) so components remain focused on presentation. |
| Registry Pattern | Uses centralized maps for remote metadata and navigation metadata to avoid scattered hardcoded configuration. |
| Builder Pattern | Builds menus from registry data plus permissions in a consistent, reusable way. |
| Route Guard Pattern | Enforces authentication, company context, and permission checks before route activation. |

## State and Reactivity Patterns

| Pattern | Why It Is Used |
| --- | --- |
| Reactive State with Signals (`signal`, `computed`, `effect`) | Provides predictable reactive updates with low boilerplate and clear derived state definitions. |
| Store plus Facade Separation | Separates state persistence/loading concerns from consumption APIs used by UI and feature flows. |
| Read-through Cache Pattern (manifests) | Reduces repeated remote manifest loading and improves responsiveness during navigation. |

## Integration and Infrastructure Patterns

| Pattern | Why It Is Used |
| --- | --- |
| Adapter Pattern (Token storage abstraction) | Decouples auth/business logic from storage implementation details through `TokenStorage` and `TOKEN_STORAGE`. |
| Chain of Responsibility (HTTP interceptors) | Applies cross-cutting concerns (correlation ID, auth token, error mapping) in a composable request pipeline. |
| API Gateway Client Wrapper (`ApiClient`) | Standardizes HTTP access, timeout behavior, URL building, and error normalization behind one API client abstraction. |
| Fallback Pattern (remote unavailable routes/pages) | Preserves usability by showing controlled fallback UI when a remote cannot be loaded. |

## Governance Patterns

| Pattern | Why It Is Used |
| --- | --- |
| Enforced Dependency Constraints (Nx tags and `depConstraints`) | Prevents architectural boundary violations at lint/build time and supports long-term modular scalability. |
| Convention-over-Configuration for project structure | Keeps apps/libs organized consistently so teams can navigate and extend the system faster. |
