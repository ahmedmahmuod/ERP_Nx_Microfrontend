# Deployment Guide

**Deployment Strategies and Hosting**

---

## 🎯 Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│              CDN / Static Hosting                   │
├─────────────────────────────────────────────────────┤
│  Shell:        https://erp.example.com              │
│  Auth:         https://auth.erp.example.com         │
│  Finance:      https://finance.erp.example.com      │
│  HR:           https://hr.erp.example.com           │
│  SRM:          https://srm.erp.example.com          │
│  PM:           https://pm.erp.example.com           │
│  Warehouses:   https://warehouses.erp.example.com   │
└─────────────────────────────────────────────────────┘
```

---

## 🏗️ Build for Production

### Build All Applications

```bash
# Build all apps
npx nx run-many --target=build --all --configuration=production

# Build specific app
npx nx build shell --configuration=production
npx nx build remoteFinance --configuration=production
```

### Output Structure

```
dist/
├── apps/
│   ├── shell/
│   │   ├── index.html
│   │   ├── main.js
│   │   ├── polyfills.js
│   │   └── styles.css
│   │
│   ├── remoteFinance/
│   │   ├── remoteEntry.js
│   │   ├── main.js
│   │   └── ...
│   │
│   └── ...
```

---

## 🌐 Hosting Options

### Option 1: AWS S3 + CloudFront

```bash
# Deploy Shell
aws s3 sync dist/apps/shell s3://erp-shell-bucket --delete
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"

# Deploy Remote
aws s3 sync dist/apps/remoteFinance s3://erp-finance-bucket --delete
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy Shell
netlify deploy --dir=dist/apps/shell --prod

# Deploy Remote
netlify deploy --dir=dist/apps/remoteFinance --prod
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 🔧 Module Federation Manifest

### Production Manifest

**File**: `apps/shell/module-federation.manifest.json`

```json
{
  "remoteAuth": "https://auth.erp.example.com",
  "remoteFinance": "https://finance.erp.example.com",
  "remoteHr": "https://hr.erp.example.com",
  "remoteSrm": "https://srm.erp.example.com",
  "remotePm": "https://pm.erp.example.com",
  "remoteWarehouses": "https://warehouses.erp.example.com"
}
```

### Dynamic URL Resolution

Webpack automatically resolves remote URLs from the manifest at runtime.

---

## 🔄 Rollback Strategy

### Version Tagging

```bash
# Tag deployment
git tag -a "shell-v1.2.3" -m "Shell deployment v1.2.3"
git push origin "shell-v1.2.3"
```

### Rollback Process

1. Identify previous stable version
2. Checkout the tag
3. Rebuild and redeploy
4. Verify functionality

```bash
git checkout shell-v1.2.2
npx nx build shell --configuration=production
# Deploy
```

---

## 🎯 Best Practices

### ✅ DO
- Use CDN for static assets
- Enable caching headers
- Compress assets (gzip/brotli)
- Use HTTPS everywhere
- Monitor deployment health
- Tag releases

### ❌ DON'T
- Deploy without testing
- Skip version tagging
- Ignore error monitoring
- Deploy all apps at once (unless necessary)

---

## 📚 Further Reading

- [CI/CD Guide](./07_CICD.md)
- [Module Federation](./04_MICROFRONTEND_MODULE_FEDERATION.md)
