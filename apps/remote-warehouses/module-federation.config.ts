import {
  createRemoteConfig,
  REMOTE_NAMES,
  REMOTE_ENTRY_POINTS,
  REMOTE_EXPOSES,
  MF_COMMENTS,
} from '@erp/shared/config';

/**
 * Remote Warehouses Module Federation Configuration
 * Using centralized factory for consistency and DRY principle
 */
const config = createRemoteConfig({
  name: REMOTE_NAMES.WAREHOUSES,
  exposes: {
    [REMOTE_EXPOSES.ROUTES]: REMOTE_ENTRY_POINTS[REMOTE_NAMES.WAREHOUSES],
    [REMOTE_EXPOSES.MANIFEST]: 'apps/remote-warehouses/src/app/remote-entry/manifest.ts',
  },
});

/**
 * ${MF_COMMENTS.NX_REQUIREMENT}
 */
export default config;
