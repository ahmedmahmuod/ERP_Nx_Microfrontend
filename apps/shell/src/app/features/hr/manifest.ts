/**
 * HR Remote Navigation Manifest
 *
 * Exports navigation configuration for the Human Resources module.
 * This manifest is consumed by the Shell's NavigationFacade.
 */

import { NavigationManifest } from '@erp/shared/models';

/**
 * HR application navigation manifest
 */
export const remoteManifest: NavigationManifest = {
  appId: 'hr',
  appName: 'Human Resources',
  sidebarTitle: 'HR',
  accentToken: 'hr',
  appIcon: 'pi-users',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/hr',
      searchKeywords: ['overview', 'summary', 'home'],
    },
    {
      label: 'Employees',
      icon: 'pi-users',
      route: '/hr/employees',
      searchKeywords: ['staff', 'personnel', 'team'],
      children: [
        {
          label: 'All Employees',
          icon: 'pi-list',
          route: '/hr/employees/all',
        },
        {
          label: 'Add Employee',
          icon: 'pi-user-plus',
          route: '/hr/employees/add',
        },
        {
          label: 'Departments',
          icon: 'pi-sitemap',
          route: '/hr/employees/departments',
        },
      ],
    },
    {
      label: 'Attendance',
      icon: 'pi-calendar',
      route: '/hr/attendance',
      searchKeywords: ['time', 'clock', 'presence'],
      children: [
        {
          label: 'Daily Attendance',
          icon: 'pi-calendar-plus',
          route: '/hr/attendance/daily',
        },
        {
          label: 'Leave Requests',
          icon: 'pi-calendar-times',
          route: '/hr/attendance/leave',
          badge: '3',
          badgeClass: 'badge-warning',
        },
        {
          label: 'Timesheets',
          icon: 'pi-clock',
          route: '/hr/attendance/timesheets',
        },
      ],
    },
    {
      label: 'Payroll',
      icon: 'pi-money-bill',
      route: '/hr/payroll',
      searchKeywords: ['salary', 'wages', 'compensation'],
      children: [
        {
          label: 'Process Payroll',
          icon: 'pi-calculator',
          route: '/hr/payroll/process',
        },
        {
          label: 'Salary Structure',
          icon: 'pi-table',
          route: '/hr/payroll/structure',
        },
        {
          label: 'Payslips',
          icon: 'pi-file',
          route: '/hr/payroll/payslips',
        },
      ],
    },
    {
      label: 'Recruitment',
      icon: 'pi-briefcase',
      route: '/hr/recruitment',
      searchKeywords: ['hiring', 'jobs', 'candidates'],
      children: [
        {
          label: 'Job Openings',
          icon: 'pi-briefcase',
          route: '/hr/recruitment/openings',
        },
        {
          label: 'Candidates',
          icon: 'pi-users',
          route: '/hr/recruitment/candidates',
        },
        {
          label: 'Interviews',
          icon: 'pi-comments',
          route: '/hr/recruitment/interviews',
        },
      ],
    },
    {
      label: 'Performance',
      icon: 'pi-chart-line',
      route: '/hr/performance',
      searchKeywords: ['review', 'appraisal', 'evaluation'],
    },
    {
      label: 'Reports',
      icon: 'pi-chart-bar',
      route: '/hr/reports',
      searchKeywords: ['analytics', 'statistics'],
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/hr/settings',
      searchKeywords: ['configuration', 'preferences'],
    },
  ],
  searchKeywords: ['hr', 'human resources', 'employees', 'staff'],
};
