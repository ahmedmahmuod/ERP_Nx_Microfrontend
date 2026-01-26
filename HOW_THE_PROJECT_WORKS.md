# How the ERP Project Works Internally

Welcome to the ERP project. This guide is designed to help you understand the "why" and "how" behind our architecture. We use a **Micro-Frontend (MFE)** approach built with **Angular**, **Nx**, and **Module Federation**.

---

## 1. High-Level Idea (The Big Picture)

### What is a Micro-Frontend?

Think of it like microservices, but for the browser. Instead of one massive Angular application ("The Monolith"), we split the ERP into smaller, independent pieces called **Remotes** (e.g., HR, Finance, SRM) and one **Shell** (the Host).

### Why this architecture?

- **Scaling Teams**: Multiple teams can work on different modules (HR vs. Finance) without stepping on each other's toes.
- **Independent Deployment**: You can deploy a bug fix to the Finance module without rebuilding or re-deploying the entire ERP.
- **Isolation**: A crash or error in the "Warehouses" module shouldn't take down the entire system or affect the "Auth" flow.

---

## 2. Workspace Structure (Nx Monorepo)

The project lives in an **Nx Monorepo**. This means all apps and shared code are in one repository, but they are strictly separated.

- **`apps/`**: Contains the deployable units.
  - **`shell`**: The portal/entry point.
  - **`remote-*`**: The actual business modules (HR, Finance, etc.).
- **`libs/`**: Contains shared logic and components.
  - **`shared/ui`**: Our internal Design System (Buttons, Tables, etc.).
  - **`shared/theme`**: Logic for dynamic branding and accent colors.
  - **`shared/models`**: TypeScript interfaces used by everyone.

**Why Nx?** Nx gives us "Dependency Graph" tools to ensure that Remotes never import from each other directly, preventing "spaghetti code."

---

## 3. The Shell Application (The Host)

The Shell is the "glue." It is the first thing the user loads.

- **Responsibilities**: Authentication, Layout (Header/Sidebar), Theme switching, and loading the correct Remote.
- **What it NEVER does**: It should **never** contain business logic for a specific module (e.g., don't put "Calculate Payroll" logic here).
- **Runtime Loading**: The Shell doesn't have the code for HR or Finance at build time. It fetches it from a separate URL only when the user navigates to that section.

---

## 4. Remote Applications (The Modules)

Each Remote (like `remote-hr`) is a standalone Angular app that is "plugged" into the Shell at runtime.

- **`remoteRoutes`**: Each remote exports its own routes.
- **`remoteManifest`**: A JSON-like configuration that tells the Shell what its menu items look like and what its special "accent color" is.
- **Pluggable Design**: A Remote doesn't know the Shell exists. It just exports what it's told, and the Shell handles the rest.

---

## 5. Routing Flow: How the "Magic" Happens

When you navigate:

1.  **User goes to `/hr`**: The Shell's `app.routes.ts` sees the `/hr` path.
2.  **Dynamic Import**: The Shell uses `loadRemoteModule` to download the specific JavaScript bundle for the HR app.
3.  **Route Injection**: The Shell takes the `remoteRoutes` from the HR bundle and injects them into the main Angular router.
4.  **Fallback**: If the HR server is down, the Shell catches the error and shows a `RemoteUnavailableComponent` instead of a blank white screen.

---

## 6. Sidebar & Navigation System

The Sidebar lives in the **Shell**, but its content is dynamic.

- **Navigation Manifest**: When a user enters a module, the `NavigationFacade` in the Shell loads the `remoteManifest` from that module.
- **Context Switching**: If you move from Finance to HR, the Sidebar instantly updates its labels and icons to reflect the HR menu.
- **State Management**: We use **Signals** to track which menu group is open, which item is active, and the current search query.

---

## 7. Shared Libraries: The "Single Source of Truth"

To keep the ERP looking consistent, we use shared libraries:

- **Shared UI**: Every button and table in HR looks exactly like the ones in Finance because they import from `@erp/shared/ui`.
- **Shared Theme**: We use **CSS Variables** (`--accent-primary`). When you switch to HR, the Shell updates these variables to "HR Orange." When you switch to Finance, they change to "Finance Green."

---

## 8. State & Communication

**Rule #1: Remotes do not talk to each other.**

- **Shell to Remote**: Communication happens via the URL or shared services in `libs/`.
- **Facades**: We use Facade services to hide complex logic. Components only talk to the Facade, and the Facade talks to the State (Signals).
- **Global State**: Things like the "Current User," "Active Company," and "Language" live in the Shell's core services and are accessible to Remotes via shared libs.

---

## 9. Internationalization (Transloco)

We use **Transloco** for multi-language support (English/Arabic).

- **Scoped Translations**: The Shell has its own translation files, and each Remote has its own. This prevents one huge, unmanageable translation file.
- **RTL/LTR**: Direction is handled at the Shell level. When the language changes to Arabic, the Shell updates the `dir="rtl"` attribute on the `<html>` tag, and our CSS adapts automatically.

---

## 10. CI/CD & Deployment

In a standard Angular app, you build everything together. Here:

- We can build **only** the `remote-hr` app if that's all that changed.
- In production, each Remote can live on a different subdomain or port.
- The Shell reads a `module-federation.manifest.json` to know where to find each remote.

---

## 11. Common Mistakes to Avoid

1.  **Direct Imports**: Never do `import { ... } from '../../apps/remote-finance'`. This breaks the micro-frontend boundary. Always use shared libraries.
2.  **Hardcoded URLs**: Never hardcode production URLs in your code. Use environment variables or the manifest registry.
3.  **Heavy Remotes**: Don't put huge global libraries inside a Remote. If it's used by everyone, move it to `libs/`.

---

## 12. Mental Model Summary

If you remember only one thing: **The Shell is the stage, and Remotes are the actors.**

The stage (Shell) provides the lights, the curtains, and the entrance/exit (Routing/Sidebar). The actors (Remotes) perform their specific scene (Business Logic) when they are called to the stage. They don't need to know who the other actors are; they just need to know their own script.

---

_Created by the Principal Frontend Architect._
