# Quick Start Guide - ERP Nx Microfrontend

## 🚀 Getting Started

### Prerequisites
- Node.js: v20.19.x, v22.12.x, or v24.x
- npm: 10.x+

### Installation
```bash
npm install
```

---

## 🏃 Running the Application

### Development Mode

**Option 1: Shell Only**
```bash
npx nx serve shell
```
Access at: `http://localhost:4200`

**Option 2: Shell + One Remote**
```bash
npx nx serve shell --devRemotes=remoteAuth
```
- Shell: `http://localhost:4200`
- Auth Remote: `http://localhost:4201`

**Option 3: Shell + All Remotes**
```bash
npx nx serve shell --devRemotes=remoteAuth,remoteFinance,remoteHr,remoteSupply
```
All remotes will be available on ports 4201-4204.

---

## 🏗️ Project Structure

```
├── apps/
│   ├── shell/               # Host application (Port 4200)
│   ├── remote-auth/         # Auth remote (Port 4201)
│   ├── remote-finance/      # Finance remote (Port 4202)
│   ├── remote-hr/           # HR remote (Port 4203)
│   └── remote-supply/       # Supply remote (Port 4204)
└── libs/
    ├── shared/
    │   ├── ui/              # @erp/shared/ui
    │   ├── utils/           # @erp/shared/utils
    │   └── models/          # @erp/shared/models
    └── auth/
        ├── feature-login/   # @erp/auth/feature-login
        └── data-access/     # @erp/auth/data-access
```

---

## 📦 Common Commands

### Build
```bash
# Build shell
npx nx build shell

# Build specific remote
npx nx build remoteAuth

# Build all affected projects
npx nx affected:build
```

### Test
```bash
# Test shell
npx nx test shell

# Test specific library
npx nx test shared-ui

# Test all affected projects
npx nx affected:test
```

### Lint
```bash
# Lint shell
npx nx lint shell

# Lint all affected projects
npx nx affected:lint
```

### Visualize
```bash
# View dependency graph
npx nx graph

# Show project details
npx nx show project shell
```

---

## 🔧 Creating New Components

### Generate a Component in a Library
```bash
npx nx g @nx/angular:component button --project=shared-ui --export
```

### Generate a New Feature Library
```bash
npx nx g @nx/angular:library --name=finance-feature-invoicing --directory=libs/finance/feature-invoicing --importPath=@erp/finance/feature-invoicing --buildable=true --tags=scope:finance,type:feature
```

---

## 🏷️ Nx Tags & Boundaries

### Tag Schema
- **Scope**: `scope:shell`, `scope:auth`, `scope:finance`, `scope:hr`, `scope:supply`, `scope:shared`
- **Type**: `type:app`, `type:feature`, `type:data-access`, `type:ui`, `type:util`, `type:model`

### Dependency Rules
- **Features** can depend on: `data-access`, `ui`, `util`, `model`
- **Data-access** can depend on: `util`, `model`
- **UI** can depend on: `util`, `model`
- **Utils** can depend on: `model`
- **Domain libs** can only depend on their own domain or `shared`

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4200 (Windows)
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Clear Nx Cache
```bash
npx nx reset
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- [Architecture Guide](docs/architecture.md)
- [Workspace Structure](docs/workspace-structure.md)
- [Phase 1 Completion Report](docs/phase1-completion-report.md)
- [Technical Preparation](docs/technical-preparation.md)

---

## 🆘 Need Help?

1. Check the [Phase 1 Completion Report](docs/phase1-completion-report.md)
2. Review the [Technical Preparation](docs/technical-preparation.md) guide
3. Run `npx nx graph` to visualize dependencies
4. Check for lint errors: `npx nx lint <project>`

---

**Last Updated**: 2026-01-13  
**Phase**: 1 - COMPLETED ✅
