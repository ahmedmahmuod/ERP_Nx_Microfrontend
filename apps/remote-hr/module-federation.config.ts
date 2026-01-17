import {
  createRemoteConfig,
  REMOTE_NAMES,
  REMOTE_ENTRY_POINTS,
  REMOTE_EXPOSES,
  MF_COMMENTS,
} from '@erp/shared/config';

/**
 * Remote HR Module Federation Configuration
 * Using centralized factory for consistency and DRY principle
 */
const config = createRemoteConfig({
  name: REMOTE_NAMES.HR,
  exposes: {
    [REMOTE_EXPOSES.ROUTES]: REMOTE_ENTRY_POINTS[REMOTE_NAMES.HR],
    [REMOTE_EXPOSES.MANIFEST]: 'apps/remote-hr/src/app/remote-entry/manifest.ts',
  },
});

/**
 * ${MF_COMMENTS.NX_REQUIREMENT}
 */
export default config;
