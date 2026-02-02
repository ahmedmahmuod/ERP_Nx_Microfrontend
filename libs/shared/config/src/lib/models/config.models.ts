/**
 * Application Configuration Interface
 * Single Source of Truth for all apps (Shell + Remotes)
 */
export interface WorkspaceConfig {
  globals: {
    domain: string;
    envName: 'dev' | 'stage' | 'prod';
    servicePorts: Record<string, number | string>;
  };
  solutions: Record<
    string,
    {
      name: string;
      moduleId: number;
      services: (keyof AppConfig['api'])[];
    }
  >;
}

export interface AppConfig {
  envName: 'dev' | 'stage' | 'prod';
  domain: string;
  baseUrl: string;
  api: {
    gateway: string;
    basicData?: string;
    finance?: string;
    payrollHr?: string;
    warehouse?: string;
    srm?: string;
    auth?: string;
    shell?: string;
    supply?: string;
    activity?: string;
    crm?: string;
    tickets?: string;
    pipeline?: string;
  };
  app: {
    name: string;
    code: string;
    moduleId: number;
  };
  constants?: {
    version?: string;
    supportEmail?: string;
    featureFlags?: Record<string, boolean>;
    enableCorrelationId?: boolean;
  };
}
