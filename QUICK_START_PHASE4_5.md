# Quick Start Guide - Phase 4-5

## 🚀 What's New

Phase 4-5 adds:
- ✅ Professional ERP Layout (Header, Sidebar, Footer)
- ✅ Authentication UI (Login & Register)
- ✅ Micro-Frontend Routing
- ✅ CI/CD Pipelines

## 📦 Installation

```bash
# Install dependencies (if not already done)
npm install
```

## 🏃 Running the Application

### Option 1: Run Shell Only
```bash
npx nx serve shell
```
Navigate to: `http://localhost:4200`

### Option 2: Run Shell + Auth Remote
```bash
# Terminal 1: Shell
npx nx serve shell

# Terminal 2: Auth Remote
npx nx serve remote-auth --port 4201
```

### Option 3: Run All Applications
```bash
npx nx run-many --target=serve --projects=shell,remote-auth,remote-finance,remote-hr,remote-supply --parallel
```

## 🧭 Navigation

### Main Routes
- `/` or `/dashboard` - Dashboard (default)
- `/auth/login` - Login page
- `/auth/register` - Register page
- `/design-system` - Design System preview
- `/finance` - Finance module (remote)
- `/hr` - HR module (remote)
- `/supply` - Supply Chain module (remote)

### Demo Credentials
**Email**: `admin@erp.com`  
**Password**: `admin123`

## 🎨 Features to Test

### Layout
1. **Sidebar**
   - Click hamburger menu to toggle sidebar
   - On mobile: Sidebar slides in as drawer
   - On desktop: Sidebar collapses to icons only
   - Click navigation items to navigate

2. **Header**
   - Click theme toggle (🌙/☀️) to switch dark/light mode
   - User menu shows when logged in
   - Sign In button shows when logged out

3. **Responsive**
   - Resize browser to see responsive behavior
   - Mobile: < 768px
   - Tablet: 768px - 1023px
   - Desktop: ≥ 1024px

### Authentication
1. **Login**
   - Navigate to `/auth/login`
   - Enter demo credentials
   - Click "Sign In"
   - Redirects to dashboard on success

2. **Register**
   - Navigate to `/auth/register`
   - Fill in all fields
   - Accept terms
   - Click "Create Account"
   - Redirects to dashboard on success

3. **Validation**
   - Try submitting empty form
   - Try invalid email
   - Try short password
   - Try mismatched passwords (register)
   - See real-time validation

### Dark Mode
1. Click theme toggle in header
2. All components switch to dark mode
3. Preference saved in localStorage
4. Persists across page refreshes

### Routing
1. Navigate between pages using sidebar
2. Use browser back/forward buttons
3. Refresh page (state preserved)
4. Deep link to specific pages

## 🧪 Testing

### Unit Tests
```bash
# Test shell
npx nx test shell

# Test auth remote
npx nx test remote-auth

# Test all
npx nx run-many --target=test --all
```

### E2E Tests
```bash
# Shell E2E
npx nx e2e shell-e2e

# Auth Remote E2E
npx nx e2e remote-auth-e2e
```

### Linting
```bash
# Lint shell
npx nx lint shell

# Lint auth remote
npx nx lint remote-auth

# Lint all
npx nx run-many --target=lint --all
```

## 🏗️ Building

### Development Build
```bash
npx nx build shell
npx nx build remote-auth
```

### Production Build
```bash
npx nx build shell --configuration=production
npx nx build remote-auth --configuration=production
```

### Build All
```bash
npx nx run-many --target=build --all --configuration=production
```

## 📊 CI/CD

### GitHub Actions Workflows

**Triggers**:
- Push to `main` or `develop`
- Pull request to `main` or `develop`
- Manual trigger (workflow_dispatch)

**Pipelines**:
1. `ci-shell.yml` - Shell application
2. `ci-remote-auth.yml` - Auth remote
3. `ci-all-remotes.yml` - All applications (parallel)

**Stages**:
1. Lint
2. Test (with coverage)
3. Build (production)
4. Deploy Staging (develop branch)
5. Deploy Production (main branch)

### Running Locally
```bash
# Simulate CI pipeline locally
npm ci
npx nx lint shell
npx nx test shell
npx nx build shell --configuration=production
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npx nx serve shell --port 4300
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Nx cache
npx nx reset

# Rebuild
npx nx build shell
```

### Remote Not Loading
1. Ensure remote is running on correct port
2. Check Module Federation configuration
3. Check browser console for errors
4. Verify `module-federation.config.ts`

## 📚 Documentation

- **Phase 3 Report**: `docs/PHASE3_DESIGN_SYSTEM_COMPLETION.md`
- **Phase 4-5 Report**: `docs/PHASE4_5_LAYOUT_AUTH_CICD.md`
- **Design System**: Navigate to `/design-system` in app
- **Architecture**: `docs/PROJECT_COMPLETE_REPORT.md`

## 🎯 Next Steps

1. **Test the Layout**
   - Navigate through all pages
   - Test responsive behavior
   - Test dark mode
   - Test sidebar collapse

2. **Test Authentication**
   - Login with demo credentials
   - Register new account
   - Test form validation
   - Test error handling

3. **Test Routing**
   - Navigate between remotes
   - Test deep linking
   - Test browser back/forward
   - Test page refresh

4. **Review Code**
   - Check layout components
   - Check auth components
   - Check services (LayoutService, AuthFacade)
   - Check routing configuration

5. **Run Tests**
   - Unit tests
   - E2E tests
   - Linting

## 💡 Tips

- **Development**: Use `--watch` flag for auto-reload
- **Debugging**: Use browser DevTools and Angular DevTools
- **Performance**: Use Nx cache for faster builds
- **Testing**: Use `--watch` flag for test-driven development
- **CI/CD**: Check GitHub Actions tab for pipeline status

## 🆘 Support

If you encounter issues:
1. Check this guide
2. Review documentation in `docs/`
3. Check browser console for errors
4. Review Nx documentation
5. Check Angular documentation

## ✅ Checklist

Before moving to next phase:
- [ ] Shell runs without errors
- [ ] Auth remote runs without errors
- [ ] Layout displays correctly
- [ ] Sidebar works (collapse/expand)
- [ ] Dark mode works
- [ ] Login works with demo credentials
- [ ] Register works
- [ ] Form validation works
- [ ] Routing works between pages
- [ ] Responsive design works
- [ ] All tests pass
- [ ] Linting passes
- [ ] Production build succeeds

---

**Happy Coding! 🚀**
