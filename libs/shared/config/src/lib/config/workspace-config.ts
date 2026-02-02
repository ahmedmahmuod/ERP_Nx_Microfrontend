import { WorkspaceConfig } from '../models/config.models';

export const WORKSPACE_CONFIG: WorkspaceConfig = {
  globals: {
    domain: 'www.assemblestage.com',
    envName: 'stage',
    servicePorts: {
      gateway: 44382, // GETWAY_API_ENDPOINT
      auth: 44381, // MAIN_GetwAY_API_ENDPOINT
      basicData: 44385, // BASIC_DATA_API_ENDPOINT
      activity: 44323, // ACTIVITY_API_ENDPOINT
      crm: 8020, // CRM_API_ENDPOINT
      finance: 44321, // FINANCE_API_ENDPOINT
      payrollHr: 44324, // PAYROLL_HR_ENDPOINT
      warehouse: 44320, // WAREHOUSE_API_ENDPOINT
      tickets: 8010, // TICKETS_API_ENDPOINT
      pipeline: 8011, // PIPELINE_API_ENDPOINT
      srm: 44326, // SRM_API_ENDPOINT
    },
  },
  solutions: {
    shell: {
      name: 'Assemble ERP - Shell',
      moduleId: 10,
      services: [
        'gateway',
        'auth',
        'basicData',
        'finance',
        'payrollHr',
        'warehouse',
        'srm',
        'activity',
        'crm',
        'tickets',
        'pipeline',
        'supply',
      ],
    },
    auth: {
      name: 'Assemble ERP - Authentication',
      moduleId: 1, // Keeping 1 tentatively as per user discussion, can be 0 or null if not needed
      services: ['auth', 'basicData', 'gateway'],
    },
    finance: {
      name: 'Assemble ERP - Finance',
      moduleId: 8,
      services: ['finance', 'gateway'],
    },
    hr: {
      name: 'Assemble ERP - HR',
      moduleId: 12,
      services: ['payrollHr', 'gateway'],
    },
    srm: {
      name: 'Assemble ERP - SRM',
      moduleId: 7,
      services: ['srm', 'gateway'],
    },
    warehouses: {
      name: 'Assemble ERP - Warehouses',
      moduleId: 9,
      services: ['warehouse', 'gateway'],
    },
    pm: {
      name: 'Assemble ERP - PM',
      moduleId: 5,
      services: ['gateway'],
    },
    supply: {
      name: 'Assemble ERP - Supply',
      moduleId: 40, // Keeping 40 as not specified in latest list, defaulting to old if exists or can ask
      services: ['gateway', 'supply'],
    },
  },
};
