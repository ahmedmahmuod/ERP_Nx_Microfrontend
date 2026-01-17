# Sidebar & Header UX Upgrade - Verification Checklist

## Quick Start

```bash
# Start shell
npm start

# Start Finance remote (in separate terminal)
nx serve remote-finance

# Start HR remote (in separate terminal)
nx serve remote-hr
```

Navigate to: `http://localhost:4200`

---

## ✅ Verification Checklist

### 1. Single-Expand Accordion Behavior

**Test Steps**:
1. Navigate to `/finance`
2. Click "Invoices" group
3. Click "Accounts" group
4. Click "Accounts" again
5. Navigate to `/finance/invoices/pending`

**Expected Results**:
- [ ] Step 2: Invoices group expands
- [ ] Step 3: Invoices closes, Accounts opens (only one open)
- [ ] Step 4: Accounts closes
- [ ] Step 5: Invoices group auto-opens (contains active route)

**Status**: ⬜ Pass / ⬜ Fail

---

### 2. Module-Branded Active States

**Test Steps**:
1. Navigate to `/finance/invoices/all`
2. Observe "Invoices" parent item
3. Observe "All Invoices" child item
4. Navigate to `/hr/employees/all`
5. Observe "Employees" parent item

**Expected Results**:
- [ ] Finance: Parent shows **emerald** accent color (#10b981)
- [ ] Finance: Child has **emerald** left border
- [ ] Finance: Icon in **emerald** color
- [ ] HR: Parent shows **amber** accent color (#f59e0b)
- [ ] HR: Child has **amber** left border

**Status**: ⬜ Pass / ⬜ Fail

---

### 3. Nested Route Visual Differentiation

**Test Steps**:
1. Navigate to `/finance`
2. Expand "Invoices" group
3. Observe visual hierarchy

**Expected Results**:
- [ ] Children indented from parent
- [ ] Left border guide (2px solid accent-light)
- [ ] Bullet points visible for children
- [ ] Children font smaller than parent (0.8125rem vs 0.875rem)
- [ ] Smooth expand/collapse animation (0.3s)

**Status**: ⬜ Pass / ⬜ Fail

---

### 4. Search Functionality

**Test Steps**:
1. Navigate to `/finance`
2. Open "Reports" group manually
3. Type "invoice" in search box
4. Clear search

**Expected Results**:
- [ ] Step 3: Filters to show only Invoices group
- [ ] Step 3: Invoices group auto-expands
- [ ] Step 3: Reports group closes
- [ ] Step 4: Reports group re-opens (restored state)
- [ ] Step 4: All items visible again

**Status**: ⬜ Pass / ⬜ Fail

---

### 5. Dynamic Header Branding

**Test Steps**:
1. Stay on shell/dashboard
2. Navigate to `/finance`
3. Navigate to `/hr`
4. Navigate to `/supply`

**Expected Results**:
- [ ] Step 1: "Assemble ERP" (no module suffix)
- [ ] Step 2: "Assemble ERP • Finance" (emerald module name)
- [ ] Step 3: "Assemble ERP • Human Resources" (amber module name)
- [ ] Step 4: "Assemble ERP • Supply Chain" (blue module name)
- [ ] Product name has gradient (blue to purple)

**Status**: ⬜ Pass / ⬜ Fail

---

### 6. Accessibility - Keyboard Navigation

**Test Steps**:
1. Navigate to `/finance`
2. Press Tab repeatedly
3. Focus on "Invoices" group
4. Press Enter
5. Press Escape (on mobile)

**Expected Results**:
- [ ] Step 2: Focus moves through menu items
- [ ] Step 2: Focus indicators visible (2px accent outline)
- [ ] Step 4: Invoices group toggles expansion
- [ ] Step 5: Mobile sidebar closes

**Status**: ⬜ Pass / ⬜ Fail

---

### 7. Accessibility - Screen Reader

**Test Steps**:
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate to `/finance`
3. Tab through menu items

**Expected Results**:
- [ ] Navigation announced as "Finance navigation"
- [ ] Groups announced with "expanded/collapsed" state
- [ ] Active items announced with "current page"
- [ ] Proper role announcements (menu, menuitem)

**Status**: ⬜ Pass / ⬜ Fail

---

### 8. Collapsed Sidebar State

**Test Steps**:
1. Navigate to `/finance`
2. Click collapse button (chevron)
3. Hover over menu icons
4. Expand sidebar again

**Expected Results**:
- [ ] Step 2: Sidebar narrows to ~80px
- [ ] Step 2: Only icons visible
- [ ] Step 2: Groups hidden
- [ ] Step 3: Tooltip appears with item label
- [ ] Step 4: Sidebar expands, labels visible

**Status**: ⬜ Pass / ⬜ Fail

---

### 9. Mobile Responsive

**Test Steps**:
1. Resize browser to mobile width (<1024px)
2. Click menu toggle (if available)
3. Click backdrop
4. Click a menu item

**Expected Results**:
- [ ] Step 1: Sidebar hidden off-screen
- [ ] Step 2: Sidebar slides in from left
- [ ] Step 2: Backdrop appears
- [ ] Step 3: Sidebar closes
- [ ] Step 4: Sidebar closes after navigation

**Status**: ⬜ Pass / ⬜ Fail

---

### 10. Reduced Motion Support

**Test Steps**:
1. Enable reduced motion in OS settings
2. Refresh browser
3. Toggle accordion groups
4. Collapse/expand sidebar

**Expected Results**:
- [ ] No animations play
- [ ] State changes instant
- [ ] No transition delays

**Status**: ⬜ Pass / ⬜ Fail

---

### 11. Dark Mode

**Test Steps**:
1. Toggle dark mode (moon icon in header)
2. Navigate through menu items
3. Observe active states

**Expected Results**:
- [ ] Sidebar background changes to dark
- [ ] Text colors adjust for contrast
- [ ] Active states visible in dark mode
- [ ] Accent colors remain vibrant
- [ ] Header gradient adjusts for dark mode

**Status**: ⬜ Pass / ⬜ Fail

---

### 12. Remote Manifest Loading

**Test Steps**:
1. Start shell only (no remotes)
2. Navigate to `/hr`
3. Start HR remote
4. Click "Retry" button

**Expected Results**:
- [ ] Step 2: Shows "Human Resources (Unavailable)"
- [ ] Step 2: Error message with Retry button
- [ ] Step 2: Console shows detailed error diagnostics
- [ ] Step 4: Manifest loads successfully
- [ ] Step 4: Menu items appear

**Status**: ⬜ Pass / ⬜ Fail

---

## Automated Tests

### Unit Tests

```bash
# Run SidebarFacade tests
npm test -- sidebar-facade.service.spec.ts
```

**Expected**: All 21 tests pass
- [ ] Accordion behavior: 5/5 tests pass
- [ ] Search behavior: 5/5 tests pass
- [ ] Active state tracking: 5/5 tests pass
- [ ] Collapsed & mobile state: 6/6 tests pass

**Status**: ⬜ Pass / ⬜ Fail

---

## Performance Checks

### Load Time

**Test Steps**:
1. Open DevTools Performance tab
2. Navigate to `/finance`
3. Measure time to interactive

**Expected Results**:
- [ ] First Paint: < 100ms
- [ ] Time to Interactive: < 500ms
- [ ] No layout shifts

**Status**: ⬜ Pass / ⬜ Fail

---

### Animation Performance

**Test Steps**:
1. Open DevTools Performance tab
2. Toggle accordion groups rapidly
3. Check frame rate

**Expected Results**:
- [ ] Maintains 60fps
- [ ] No jank or stuttering
- [ ] Smooth transitions

**Status**: ⬜ Pass / ⬜ Fail

---

## Console Diagnostics

### Expected Console Output

When navigating to `/finance`:

```
[NavigationFacade] 2026-01-17T... Detected app from URL: { url: '/finance', appId: 'finance' }
[NavigationFacade] 2026-01-17T... Loading manifest for: { appId: 'finance', remoteName: 'remoteFinance', ... }
[NavigationFacade] 2026-01-17T... Module loaded successfully: { loadTimeMs: '...', moduleKeys: [...] }
[NavigationFacade] 2026-01-17T... Manifest validated successfully: { appId: 'finance', menuItemsCount: 7 }
[NavigationFacade] 2026-01-17T... Manifest cached for: finance
```

**Check**:
- [ ] No errors in console
- [ ] Manifest loads successfully
- [ ] Load time < 200ms

**Status**: ⬜ Pass / ⬜ Fail

---

## Browser Compatibility

### Browsers to Test

- [ ] Chrome 90+ (Windows/Mac)
- [ ] Firefox 88+ (Windows/Mac)
- [ ] Safari 14+ (Mac)
- [ ] Edge 90+ (Windows)

**Expected**: All features work in all browsers

**Status**: ⬜ Pass / ⬜ Fail

---

## Final Sign-Off

### Summary

**Total Tests**: 12 manual + 1 automated + 2 performance = 15 tests

**Passed**: _____ / 15

**Failed**: _____ / 15

**Blockers**: (List any critical issues)
- 
- 

**Notes**: (Additional observations)
- 
- 

---

### Approval

**Tested By**: _____________________

**Date**: _____________________

**Status**: ⬜ Approved for Production / ⬜ Needs Fixes

**Signature**: _____________________

---

## Quick Reference

### Key Files Modified

1. `apps/shell/src/app/layout/components/sidebar/sidebar.component.ts` - Refactored with SidebarFacade
2. `apps/shell/src/app/layout/components/sidebar/sidebar.component.scss` - Enterprise styles
3. `apps/shell/src/app/layout/components/header/header.component.ts` - Dynamic branding
4. `apps/shell/src/app/layout/services/sidebar-facade.service.ts` - State management
5. `apps/shell/src/app/core/services/navigation-facade.service.ts` - Enhanced logging

### Key Features

- ✅ Single-expand accordion
- ✅ Module-branded active states
- ✅ Enhanced nested routes
- ✅ Dynamic header branding
- ✅ Full accessibility
- ✅ Design token-based

### Support

For issues or questions, refer to:
- `SIDEBAR_UX_UPGRADE_DOCUMENTATION.md` - Full documentation
- `SIDEBAR_UPGRADE_SUMMARY.md` - Previous implementation summary
