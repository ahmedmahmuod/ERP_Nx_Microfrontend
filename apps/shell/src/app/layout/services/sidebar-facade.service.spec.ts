/**
 * Sidebar Facade Service Unit Tests
 *
 * Tests for:
 * - Single-expand accordion behavior
 * - Active parent highlighting when child is active
 * - Search expansion behavior
 */

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SidebarFacadeService } from './sidebar-facade.service';
import { NavigationFacadeService } from '../../core/services/navigation-facade.service';
import { signal } from '@angular/core';
import { NavItem } from '@erp/shared/models';

describe('SidebarFacadeService', () => {
  let service: SidebarFacadeService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNavigationFacade: jasmine.SpyObj<NavigationFacadeService>;

  const mockMenuItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/dashboard',
    },
    {
      label: 'Finance',
      icon: 'pi-wallet',
      route: '/finance',
      children: [
        { label: 'Invoices', route: '/finance/invoices' },
        { label: 'Reports', route: '/finance/reports' },
      ],
    },
    {
      label: 'HR',
      icon: 'pi-users',
      route: '/hr',
      children: [
        { label: 'Employees', route: '/hr/employees' },
        { label: 'Payroll', route: '/hr/payroll' },
      ],
    },
  ];

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate'], {
      events: signal(null).asReadonly(),
      url: '/dashboard',
    });

    mockNavigationFacade = jasmine.createSpyObj('NavigationFacadeService', [
      'searchMenuItems',
    ], {
      menuItems: signal(mockMenuItems),
    });

    TestBed.configureTestingModule({
      providers: [
        SidebarFacadeService,
        { provide: Router, useValue: mockRouter },
        { provide: NavigationFacadeService, useValue: mockNavigationFacade },
      ],
    });

    service = TestBed.inject(SidebarFacadeService);
  });

  describe('Accordion Behavior', () => {
    it('should start with no group expanded', () => {
      expect(service.openGroupId()).toBeNull();
    });

    it('should expand a group when toggled', () => {
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');
      expect(service.isGroupExpanded('Finance')).toBe(true);
    });

    it('should collapse a group when toggled again', () => {
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');

      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBeNull();
      expect(service.isGroupExpanded('Finance')).toBe(false);
    });

    it('should implement single-expand: opening one group closes the other', () => {
      // Open Finance
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');
      expect(service.isGroupExpanded('Finance')).toBe(true);
      expect(service.isGroupExpanded('HR')).toBe(false);

      // Open HR - should close Finance
      service.toggleGroup('HR');
      expect(service.openGroupId()).toBe('HR');
      expect(service.isGroupExpanded('HR')).toBe(true);
      expect(service.isGroupExpanded('Finance')).toBe(false);
    });

    it('should track previous open group', () => {
      service.toggleGroup('Finance');
      service.toggleGroup('HR');

      // Previous should be Finance
      expect(service['_state']().previousOpenGroupId).toBe('Finance');
    });
  });

  describe('Search Behavior', () => {
    beforeEach(() => {
      mockNavigationFacade.searchMenuItems.and.returnValue([
        {
          label: 'Finance',
          icon: 'pi-wallet',
          route: '/finance',
          children: [
            { label: 'Invoices', route: '/finance/invoices' },
          ],
        },
      ]);
    });

    it('should expand matching group when searching', () => {
      service.setSearchQuery('invoice');

      expect(service.searchQuery()).toBe('invoice');
      expect(mockNavigationFacade.searchMenuItems).toHaveBeenCalledWith('invoice');
    });

    it('should save previous open group when starting search', () => {
      service.toggleGroup('HR');
      expect(service.openGroupId()).toBe('HR');

      service.setSearchQuery('invoice');

      expect(service['_state']().previousOpenGroupId).toBe('HR');
    });

    it('should restore previous open group when clearing search', () => {
      service.toggleGroup('HR');
      service.setSearchQuery('invoice');
      service.clearSearch();

      expect(service.searchQuery()).toBe('');
      expect(service.openGroupId()).toBe('HR');
    });

    it('should return filtered items when searching', () => {
      service.setSearchQuery('invoice');

      const filtered = service.filteredMenuItems();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Finance');
    });

    it('should return all items when search is empty', () => {
      service.setSearchQuery('');

      const filtered = service.filteredMenuItems();
      expect(filtered.length).toBe(mockMenuItems.length);
    });
  });

  describe('Active State Tracking', () => {
    it('should track active route', () => {
      service['updateActiveRoute']('/finance/invoices');
      expect(service.activeItemRoute()).toBe('/finance/invoices');
    });

    it('should identify when item is active', () => {
      service['updateActiveRoute']('/finance/invoices');

      const financeItem = mockMenuItems[1];
      expect(service.isItemOrChildActive(financeItem)).toBe(true);
    });

    it('should identify when parent has active child', () => {
      service['updateActiveRoute']('/finance/invoices');

      const itemsWithState = service.menuItemsWithActiveState();
      const financeItem = itemsWithState.find((item) => item.label === 'Finance');

      expect(financeItem?._hasActiveChild).toBe(true);
    });

    it('should not mark parent as active when child is active', () => {
      service['updateActiveRoute']('/finance/invoices');

      const itemsWithState = service.menuItemsWithActiveState();
      const financeItem = itemsWithState.find((item) => item.label === 'Finance');

      expect(financeItem?._isActive).toBe(false);
      expect(financeItem?._hasActiveChild).toBe(true);
    });

    it('should mark child as active', () => {
      service['updateActiveRoute']('/finance/invoices');

      const itemsWithState = service.menuItemsWithActiveState();
      const financeItem = itemsWithState.find((item) => item.label === 'Finance');
      const invoiceChild = financeItem?.children?.find((child) => child.label === 'Invoices');

      expect(invoiceChild?._isActive).toBe(true);
    });
  });

  describe('Collapsed State', () => {
    it('should start not collapsed', () => {
      expect(service.collapsed()).toBe(false);
    });

    it('should toggle collapsed state', () => {
      service.toggleCollapsed();
      expect(service.collapsed()).toBe(true);

      service.toggleCollapsed();
      expect(service.collapsed()).toBe(false);
    });

    it('should set collapsed state directly', () => {
      service.setCollapsed(true);
      expect(service.collapsed()).toBe(true);

      service.setCollapsed(false);
      expect(service.collapsed()).toBe(false);
    });
  });

  describe('Mobile State', () => {
    it('should start with mobile sidebar closed', () => {
      expect(service.mobileOpen()).toBe(false);
    });

    it('should toggle mobile sidebar', () => {
      service.toggleMobileSidebar();
      expect(service.mobileOpen()).toBe(true);

      service.toggleMobileSidebar();
      expect(service.mobileOpen()).toBe(false);
    });

    it('should close mobile sidebar', () => {
      service.toggleMobileSidebar();
      expect(service.mobileOpen()).toBe(true);

      service.closeMobileSidebar();
      expect(service.mobileOpen()).toBe(false);
    });
  });

  describe('Hanging Bug Fix - User Interaction vs Auto-Expand', () => {
    it('should allow user to toggle groups when on an active child route', () => {
      // Simulate being on a child route
      service['updateActiveRoute']('/finance/invoices');

      // User manually opens HR group (different from active Finance group)
      service.toggleGroup('HR');

      // Should open HR, not fight back to Finance
      expect(service.openGroupId()).toBe('HR');
      expect(service.isGroupExpanded('HR')).toBe(true);
      expect(service.isGroupExpanded('Finance')).toBe(false);
    });

    it('should not auto-expand after user has manually interacted', () => {
      // User manually opens Finance
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');

      // Simulate navigating to HR route (programmatically)
      service['updateActiveRoute']('/hr/employees');

      // User then manually opens Finance again
      service.toggleGroup('Finance');

      // Should stay on Finance, not auto-expand to HR
      expect(service.openGroupId()).toBe('Finance');
    });

    it('should reset user interaction flag on route change to allow auto-expand for new routes', () => {
      // User manually opens Finance
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');

      // Navigate to a different route (e.g., via browser back button or direct link)
      service['updateActiveRoute']('/hr/employees');

      // After route change, auto-expand should work again
      // The effect should auto-expand HR group
      // Note: In real app, the effect runs automatically. In test, we verify the flag is reset.
      const state = service['_state']();
      expect(state.userInteracted).toBe(false);
    });

    it('should handle rapid group toggles without hanging', () => {
      // Simulate rapid clicking between groups
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');

      service.toggleGroup('HR');
      expect(service.openGroupId()).toBe('HR');

      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');

      service.toggleGroup('HR');
      expect(service.openGroupId()).toBe('HR');

      // Should end on last clicked group
      expect(service.isGroupExpanded('HR')).toBe(true);
      expect(service.isGroupExpanded('Finance')).toBe(false);
    });

    it('should allow toggling groups even when child route is active', () => {
      // Start on Finance child route
      service['updateActiveRoute']('/finance/invoices');

      // User clicks HR group
      service.toggleGroup('HR');
      expect(service.openGroupId()).toBe('HR');

      // User clicks Finance group
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBe('Finance');

      // User clicks Finance again to collapse
      service.toggleGroup('Finance');
      expect(service.openGroupId()).toBeNull();

      // All interactions should work smoothly without hanging
    });
  });
});
