/**
 * Project Management Remote Navigation Manifest
 *
 * Exports navigation configuration for the Project Management module.
 * This manifest is consumed by the Shell's NavigationFacade.
 */

import { NavigationManifest } from '@erp/shared/models';

/**
 * Project Management application navigation manifest
 */
export const remoteManifest: NavigationManifest = {
  appId: 'pm',
  appName: 'Project Management',
  sidebarTitle: 'Projects',
  accentToken: 'pm',
  appIcon: 'pi-sitemap',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/pm',
      searchKeywords: ['overview', 'summary', 'home'],
    },
    {
      label: 'Projects',
      icon: 'pi-folder',
      route: '/pm/projects',
      searchKeywords: ['project', 'portfolio'],
      children: [
        {
          label: 'All Projects',
          icon: 'pi-list',
          route: '/pm/projects/all',
        },
        {
          label: 'Create Project',
          icon: 'pi-plus',
          route: '/pm/projects/create',
        },
        {
          label: 'Templates',
          icon: 'pi-clone',
          route: '/pm/projects/templates',
        },
      ],
    },
    {
      label: 'Tasks',
      icon: 'pi-check-square',
      route: '/pm/tasks',
      searchKeywords: ['task', 'todo', 'activity'],
      children: [
        {
          label: 'My Tasks',
          icon: 'pi-user',
          route: '/pm/tasks/my',
          badge: '5',
          badgeClass: 'badge-primary',
        },
        {
          label: 'All Tasks',
          icon: 'pi-list',
          route: '/pm/tasks/all',
        },
        {
          label: 'Kanban Board',
          icon: 'pi-th-large',
          route: '/pm/tasks/kanban',
        },
      ],
    },
    {
      label: 'Team',
      icon: 'pi-users',
      route: '/pm/team',
      searchKeywords: ['members', 'team', 'resources'],
      children: [
        {
          label: 'Team Members',
          icon: 'pi-users',
          route: '/pm/team/members',
        },
        {
          label: 'Workload',
          icon: 'pi-chart-bar',
          route: '/pm/team/workload',
        },
        {
          label: 'Roles',
          icon: 'pi-id-card',
          route: '/pm/team/roles',
        },
      ],
    },
    {
      label: 'Milestones',
      icon: 'pi-flag',
      route: '/pm/milestones',
      searchKeywords: ['milestone', 'deadline', 'goal'],
    },
    {
      label: 'Reports',
      icon: 'pi-chart-line',
      route: '/pm/reports',
      searchKeywords: ['analytics', 'report', 'insights'],
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/pm/settings',
      searchKeywords: ['configuration', 'preferences'],
    },
  ],
  searchKeywords: ['pm', 'project', 'management', 'tasks', 'team'],
};
