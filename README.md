# ERP Micro-Frontend System

**Enterprise-Grade Modular ERP Platform**  
Built with Angular 21, Nx, and Native Module Federation

---

## 🎯 Overview

A **scalable, enterprise-grade ERP system** built as a **micro-frontend architecture** using Angular 21+, Nx 22+, and native Webpack Module Federation. The system supports independent deployment of business domains while maintaining a cohesive user experience.

### Key Features

- ✅ **Modular Architecture**: Independent business domains (HR, Finance, SRM, PM, Warehouses)
- ✅ **Independent Deployment**: Deploy modules separately without system-wide redeployment
- ✅ **Manifest-Driven Navigation**: Dynamic sidebar based on loaded modules
- ✅ **Comprehensive Design System**: Dark mode, design tokens, accessible components
- ✅ **Type-Safe**: TypeScript strict mode throughout
- ✅ **Production-Ready**: CI/CD pipelines, testing, and deployment strategies

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v20.19.x, v22.12.x, or v24.x
- **npm**: 10.8.2+

### Installation

```bash
# Clone repository
git clone <repository-url>
cd ERP_Nx_Microfrontend

# Install dependencies
npm install
```

### Running the Application

```bash
# Start Shell only (port 4200)
npx nx serve shell

# Start Shell + specific remote
npx nx serve shell --devRemotes=remoteFinance

# Start Shell + all remotes
npx nx serve shell --devRemotes=remoteAuth,remoteFinance,remoteHr,remoteSrm,remotePm,remoteWarehouses
```

### Building for Production

```bash
# Build Shell
npx nx build shell --configuration=production

# Build all applications
npx nx run-many --target=build --all --configuration=production
```

### Testing

```bash
# Run tests
npx nx test shell

# Run all tests
npx nx run-many --target=test --all

# E2E tests
npx nx e2e shell-e2e
```

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

| Document | Description |
|----------|-------------|
| **[00_OVERVIEW](./docs/00_OVERVIEW.md)** | System overview, modules, and quick start |
| **[01_ARCHITECTURE](./docs/01_ARCHITECTURE.md)** | Architecture design, domain boundaries, and ADRs |
| **[02_TOOLING_STACK](./docs/02_TOOLING_STACK.md)** | Technology stack and tool choices |
| **[03_WORKSPACE_STRUCTURE](./docs/03_WORKSPACE_STRUCTURE.md)** | Monorepo layout and naming conventions |
| **[04_MICROFRONTEND_MODULE_FEDERATION](./docs/04_MICROFRONTEND_MODULE_FEDERATION.md)** | Module Federation setup and remote loading |
| **[05_DESIGN_SYSTEM](./docs/05_DESIGN_SYSTEM.md)** | Design tokens, theming, and UI components |
| **[06_ROUTING_AND_NAVIGATION](./docs/06_ROUTING_AND_NAVIGATION.md)** | Routing strategy and navigation patterns |
| **[07_CICD](./docs/07_CICD.md)** | CI/CD pipelines and automation |
| **[08_DEPLOYMENT](./docs/08_DEPLOYMENT.md)** | Deployment strategies and hosting |
| **[09_USER_GUIDE](./docs/09_USER_GUIDE.md)** | End-user documentation |
| **[10_DEVELOPER_GUIDE](./docs/10_DEVELOPER_GUIDE.md)** | Deep dive for developers |
| **[11_TROUBLESHOOTING](./docs/11_TROUBLESHOOTING.md)** | Common issues and solutions |

**Start here**: [📖 Documentation Overview](./docs/00_OVERVIEW.md)

---

## 🏗️ System Modules

| Module | Port | Description |
|--------|------|-------------|
| **Shell** | 4200 | Host application with layout and orchestration |
| **Auth** | 4201 | Authentication and authorization |
| **Finance** | 4202 | Financial management and reporting |
| **HR** | 4203 | Human resources and payroll |
| **SRM** | 4204 | Supplier relationship management |
| **PM** | 4205 | Project management |
| **Warehouses** | 4206 | Warehouse and inventory management |

---

## 🛠️ Technology Stack

- **Framework**: Angular 21.0.8+
- **Build System**: Nx 22.3.3+
- **Module Federation**: Webpack 5 + @module-federation/enhanced
- **Styling**: Tailwind CSS 3.4+ + PrimeNG 21+
- **Testing**: Vitest 4.0+ + Cypress 15+
- **CI/CD**: GitHub Actions
- **Language**: TypeScript 5.9+ (strict mode)

---

## 📊 Project Status

**Status**: Production-Ready ✅  
**Completion**: 95%

### Completed Features

- ✅ Workspace setup and configuration
- ✅ All remote applications (6 modules)
- ✅ Module Federation configuration
- ✅ Comprehensive design system with dark mode
- ✅ Shell layout (header, sidebar, footer)
- ✅ Manifest-driven navigation
- ✅ Back to Home navigation
- ✅ Authentication flow
- ✅ CI/CD pipelines
- ✅ Complete documentation suite

### In Progress

- 🚧 Remote application feature implementation
- 🚧 E2E test coverage expansion

---

## 🤝 Contributing

Before contributing, please review:

1. [Architecture Guide](./docs/01_ARCHITECTURE.md) - Understand the system design
2. [Developer Guide](./docs/10_DEVELOPER_GUIDE.md) - Development guidelines
3. [Workspace Structure](./docs/03_WORKSPACE_STRUCTURE.md) - Code organization

---

## 🆘 Need Help?

- **Quick Start**: See [00_OVERVIEW.md](./docs/00_OVERVIEW.md)
- **Troubleshooting**: See [11_TROUBLESHOOTING.md](./docs/11_TROUBLESHOOTING.md)
- **Developer Questions**: See [10_DEVELOPER_GUIDE.md](./docs/10_DEVELOPER_GUIDE.md)

---

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ using Angular, Nx, and Module Federation**
