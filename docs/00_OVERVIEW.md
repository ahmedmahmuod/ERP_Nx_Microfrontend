# ERP Micro-Frontend System - Overview

**Enterprise-Grade Modular ERP Platform**  
Built with Angular 21, Nx, and Native Module Federation

---

## 🎯 What is This?

This is a **scalable, enterprise-grade ERP system** built as a **micro-frontend architecture**. The system is designed to support independent deployment of business domains while maintaining a cohesive user experience.

### Key Characteristics

- **Modular Architecture**: Each business domain (HR, Finance, SRM, PM, Warehouses) is an independent application
- **Independent Deployment**: Remotes can be deployed separately without redeploying the entire system
- **Team Autonomy**: Different teams can work on different modules without conflicts
- **Strict Boundaries**: Enforced architectural constraints prevent tight coupling
- **Modern Stack**: Angular 21+, Nx 22+, TypeScript strict mode, Tailwind CSS, PrimeNG

---

## 📦 System Modules

### Shell (Host Application)
**Port**: 4200  
**Purpose**: Orchestration, layout, authentication, and routing

The Shell is the main entry point that:
- Provides the layout (header, sidebar, footer)
- Manages authentication and authorization
- Dynamically loads remote applications
- Handles global state and navigation

### Remote Applications

| Module | Port | Description | Key Features |
|--------|------|-------------|--------------|
| **Auth** | 4201 | Authentication & Authorization | Login, Registration, Password Reset, Session Management |
| **Finance** | 4202 | Financial Management | Invoicing, Reporting, Ledgers, Accounts Payable/Receivable |
| **HR** | 4203 | Human Resources & Payroll | Employee Management, Payroll, Time Tracking, Benefits |
| **SRM** | 4204 | Supplier Relationship Management | Vendor Management, Procurement, Purchase Orders |
| **PM** | 4205 | Project Management | Projects, Tasks, Milestones, Resource Allocation |
| **Warehouses** | 4206 | Warehouse & Inventory | Stock Management, Locations, Transfers, Picking/Packing |

---

## ✨ Key Features

### 🏗️ Architecture
- **Native Module Federation**: No single-spa, no iframes—pure Webpack Module Federation
- **Monorepo Structure**: All code in one repository with Nx for orchestration
- **Lazy Loading**: Remotes are loaded on-demand for optimal performance
- **Manifest-Driven Navigation**: Each remote exposes its own navigation manifest

### 🎨 Design System
- **Comprehensive Design Tokens**: Colors, typography, spacing, shadows
- **Dark Mode Support**: Full dark/light theme with CSS variables
- **Accessible Components**: WCAG 2.1 AA compliant
- **Responsive Design**: Mobile-first approach with breakpoints

### 🔒 Security & Auth
- **Route Guards**: Protected routes with authentication checks
- **Role-Based Access**: Authorization based on user roles
- **Session Management**: Secure token handling

### 🚀 Developer Experience
- **TypeScript Strict Mode**: Maximum type safety
- **Nx Dependency Constraints**: Enforced architectural boundaries
- **Hot Module Replacement**: Fast development feedback
- **Comprehensive Linting**: ESLint with Angular-specific rules

---

## 🚀 Quick Start

### Prerequisites
- Node.js: `v20.19.x`, `v22.12.x`, or `v24.x`
- npm: `10.8.2+`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ERP_Nx_Microfrontend

# Install dependencies
npm install
```

### Running the Application

```bash
# Start Shell only (port 4200)
npx nx serve shell

# Start Shell + specific remote (e.g., Finance)
npx nx serve shell --devRemotes=remoteFinance

# Start Shell + all remotes
npx nx serve shell --devRemotes=remoteAuth,remoteFinance,remoteHr,remoteSrm,remotePm,remoteWarehouses
```

### Building for Production

```bash
# Build Shell
npx nx build shell --configuration=production

# Build specific remote
npx nx build remoteFinance --configuration=production

# Build all applications
npx nx run-many --target=build --all --configuration=production
```

### Testing

```bash
# Run tests for Shell
npx nx test shell

# Run tests for all projects
npx nx run-many --target=test --all

# Run E2E tests
npx nx e2e shell-e2e
```

### Linting

```bash
# Lint Shell
npx nx lint shell

# Lint all projects
npx nx run-many --target=lint --all
```

---

## 📚 Documentation Structure

This documentation is organized into focused guides:

| Document | Purpose |
|----------|---------|
| **[01_ARCHITECTURE](./01_ARCHITECTURE.md)** | System design, domain boundaries, and architectural decisions |
| **[02_TOOLING_STACK](./02_TOOLING_STACK.md)** | Technology stack and tool choices |
| **[03_WORKSPACE_STRUCTURE](./03_WORKSPACE_STRUCTURE.md)** | Monorepo layout, naming conventions, and organization |
| **[04_MICROFRONTEND_MODULE_FEDERATION](./04_MICROFRONTEND_MODULE_FEDERATION.md)** | Module Federation setup and remote loading |
| **[05_DESIGN_SYSTEM](./05_DESIGN_SYSTEM.md)** | Design tokens, theming, and UI components |
| **[06_ROUTING_AND_NAVIGATION](./06_ROUTING_AND_NAVIGATION.md)** | Routing strategy and navigation patterns |
| **[07_CICD](./07_CICD.md)** | CI/CD pipelines and deployment automation |
| **[08_DEPLOYMENT](./08_DEPLOYMENT.md)** | Deployment strategies and hosting |
| **[09_USER_GUIDE](./09_USER_GUIDE.md)** | End-user documentation |
| **[10_DEVELOPER_GUIDE](./10_DEVELOPER_GUIDE.md)** | Deep dive for developers |
| **[11_TROUBLESHOOTING](./11_TROUBLESHOOTING.md)** | Common issues and solutions |

---

## 🎯 Project Status

**Current Phase**: Production-Ready ✅  
**Completion**: 95%

### Completed
- ✅ Workspace setup and configuration
- ✅ All remote applications generated
- ✅ Module Federation configured
- ✅ Comprehensive design system
- ✅ Shell layout with header, sidebar, footer
- ✅ Manifest-driven navigation
- ✅ Dark mode support
- ✅ CI/CD pipelines
- ✅ Authentication flow
- ✅ Back to Home navigation

### In Progress
- 🚧 Remote application feature implementation
- 🚧 E2E test coverage expansion

---

## 🤝 Contributing

This project follows strict architectural guidelines. Before contributing:

1. Read the [Architecture Guide](./01_ARCHITECTURE.md)
2. Review the [Developer Guide](./10_DEVELOPER_GUIDE.md)
3. Follow the [Workspace Structure](./03_WORKSPACE_STRUCTURE.md) conventions
4. Ensure all tests pass and linting is clean

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🆘 Need Help?

- **Troubleshooting**: See [11_TROUBLESHOOTING.md](./11_TROUBLESHOOTING.md)
- **Developer Questions**: See [10_DEVELOPER_GUIDE.md](./10_DEVELOPER_GUIDE.md)
- **Architecture Questions**: See [01_ARCHITECTURE.md](./01_ARCHITECTURE.md)

---

**Built with ❤️ using Angular, Nx, and Module Federation**
