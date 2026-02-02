// export * from './lib/shared-ui/shared-ui';

// Core
export * from './lib/core/types/component.types';
export * from './lib/core/abstracts/base-component.abstract';

// Components
export * from './lib/button/button.component';
export * from './lib/input/input.component';
export * from './lib/card/card.component';
export * from './lib/modal/modal.component';
export * from './lib/table/table.component';

// Services
export * from './lib/services/theme.service';
export * from './lib/services/responsive.service';
export * from './lib/services/accessibility.service';
export * from './lib/services/toast.service';

// Features (PrimeNG-free)
export * from './lib/standalone-language-switch/standalone-language-switch';

// Directives
export * from './lib/directives/has-action.directive';

// Navigation
export * from './lib/navigation';

// NOTE: Components with PrimeNG dependencies are exported from primeng-components.ts
// Import from '@erp/shared/ui/primeng-components' if you need them
