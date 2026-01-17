import {
  createRemoteConfig,
  REMOTE_NAMES,
  REMOTE_ENTRY_POINTS,
  REMOTE_EXPOSES,
  MF_COMMENTS,
} from '@erp/shared/config';

/**
 * Remote PM Module Federation Configuration
 * Using centralized factory for consistency and DRY principle
 */
const config = createRemoteConfig({
  name: REMOTE_NAMES.PM,
  exposes: {
    [REMOTE_EXPOSES.ROUTES]: REMOTE_ENTRY_POINTS[REMOTE_NAMES.PM],
    [REMOTE_EXPOSES.MANIFEST]: 'apps/remotePm/src/app/remote-entry/manifest.ts',
  },
});

/**
 * ${MF_COMMENTS.NX_REQUIREMENT}
 */
export default config;
