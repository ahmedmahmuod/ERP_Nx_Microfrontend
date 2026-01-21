import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { NavigationFacadeService } from '../../../core/services/navigation-facade.service';
import { RouteContextService } from '../../../core/services/route-context.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfileDropdownComponent, TranslocoDirective],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  template: `
    <header
      *transloco="let t; read: 'shell'"
      class="flex items-center justify-between h-16 px-4 sm:px-6 sticky top-0 z-50 bg-white dark:bg-[#1e1e1e] border-b border-gray-100 dark:border-gray-800 transition-colors"
    >
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <!-- Mobile Menu Toggle -->
        <button
          class="lg:hidden flex items-center justify-center w-10 h-10 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          (click)="layoutService.toggleSidebar()"
          [attr.aria-label]="t('header.toggleMenu')"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>

        <!-- Back to Home Button (Remote Areas Only) -->
        @if (routeContext.isInRemoteArea()) {
          <button
            class="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm group"
            (click)="routeContext.navigateToHome()"
            [attr.aria-label]="t('header.backToHome')"
          >
            <i class="pi pi-arrow-left no-rtl-flip"></i>
            <span class="hidden sm:inline font-medium text-sm">{{
              t('header.backToHome')
            }}</span>
          </button>
        }

        <h1 class="flex items-center gap-2 m-0 mt-0.5">
          @if (currentModuleName()) {
            <span class="text-[var(--accent-primary)] font-semibold text-lg">{{
              currentModuleName()
            }}</span>
          } @else {
            <span
              class="text-[var(--accent-primary)] font-bold text-xl tracking-tight"
              >{{ t('header.appTitle') }}</span
            >
          }
        </h1>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-1 sm:gap-3">
        <!-- Theme Toggle -->
        <button
          class="hidden sm:flex items-center justify-center w-9 h-9 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          (click)="layoutService.toggleTheme()"
          [attr.aria-label]="t('header.toggleTheme')"
        >
          <i class="pi pi-moon text-lg"></i>
        </button>

        <!-- User Menu -->
        <div class="ms-1 sm:ms-2">
          <app-profile-dropdown></app-profile-dropdown>
        </div>
      </div>
    </header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly layoutService = inject(LayoutService);
  readonly navigationFacade = inject(NavigationFacadeService);
  readonly routeContext = inject(RouteContextService);

  readonly pageTitle = input<string>('Dashboard');
  readonly menuToggle = output<void>();

  // Computed module name from navigation facade
  readonly currentModuleName = computed(() => {
    const appId = this.navigationFacade.activeAppId();
    if (!appId || appId === 'shell') {
      return null;
    }
    return this.navigationFacade.activeManifest()?.appName || null;
  });

  // Mock user data (replace with auth service)
  readonly userName = 'Ahmed Mahmoud';
  readonly userEmail = 'ahmed@company.com';
  readonly userInitials = 'AM';
}
