# CI/CD Pipeline

**Continuous Integration and Deployment**

---

## 🎯 Overview

The project uses **GitHub Actions** for CI/CD with separate pipelines for each application.

---

## 🏗️ Pipeline Structure

### Per-App Pipelines

- `ci-shell.yml`: Shell application
- `ci-remote-auth.yml`: Auth remote
- `ci-all-remotes.yml`: All remotes

### Pipeline Stages

```
┌─────────────┐
│   Lint      │  → ESLint checks
└─────────────┘
       │
       ▼
┌─────────────┐
│   Test      │  → Unit tests with coverage
└─────────────┘
       │
       ▼
┌─────────────┐
│   Build     │  → Production build
└─────────────┘
       │
       ▼
┌─────────────┐
│   Deploy    │  → Deploy to environment
└─────────────┘
```

---

## 📝 Example Pipeline

**File**: `.github/workflows/ci-shell.yml`

```yaml
name: CI/CD - Shell

on:
  push:
    branches: [main, develop]
    paths:
      - 'apps/shell/**'
      - 'libs/**'
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20.x'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npx nx lint shell

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx nx test shell --coverage

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx nx build shell --configuration=production
      - uses: actions/upload-artifact@v3
        with:
          name: shell-dist
          path: dist/apps/shell

  deploy-production:
    needs: [build]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
      - run: echo "Deploy to production"
```

---

## 🚀 Nx Affected Commands

### Optimize CI with Affected

```bash
# Only lint affected projects
npx nx affected --target=lint

# Only test affected projects
npx nx affected --target=test

# Only build affected projects
npx nx affected --target=build
```

### Benefits
- **Faster CI**: Only runs tasks for changed code
- **Cost Savings**: Less compute time
- **Parallel Execution**: Nx runs tasks in parallel

---

## 📦 Artifact Management

### Build Artifacts

```yaml
- uses: actions/upload-artifact@v3
  with:
    name: shell-dist
    path: dist/apps/shell
    retention-days: 7
```

### Download Artifacts

```yaml
- uses: actions/download-artifact@v3
  with:
    name: shell-dist
    path: dist
```

---

## 🎯 Environment Strategy

### Environments

- **Development**: Feature branches
- **Staging**: `develop` branch
- **Production**: `main` branch

### Environment Variables

```yaml
env:
  NODE_VERSION: '20.x'
  NX_CLOUD_ACCESS_TOKEN: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
  API_URL: ${{ secrets.API_URL }}
```

---

## 📚 Further Reading

- [Deployment Guide](./08_DEPLOYMENT.md)
- [Nx Documentation](https://nx.dev)
