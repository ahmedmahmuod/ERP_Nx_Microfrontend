import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  inject,
  computed,
  effect,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BRAND } from '@erp/shared/config';
import { NavigationFacadeService } from '../../../core/services/navigation-facade.service';
import { SidebarFacadeService } from '../../services/sidebar-facade.service';
import { ShellTabsComponent } from '../shell-tabs/shell-tabs.component';
import {
  TranslocoDirective,
  TranslocoPipe,
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TranslocoDirective,
    TranslocoPipe,
    ShellTabsComponent,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly navigationFacade = inject(NavigationFacadeService);
  readonly sidebarFacade = inject(SidebarFacadeService);

  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() mobileClose = new EventEmitter<void>();

  @ViewChild('sidebarNav') sidebarNavRef!: ElementRef<HTMLElement>;

  // Branding constants
  readonly brandName = BRAND.SHORT_NAME;
  readonly brandLogo = BRAND.LOGO_PATH;

  logoError = false;

  // Computed menu items with active state
  readonly menuItemsWithState = computed(() => {
    return this.sidebarFacade.menuItemsWithActiveState();
  });

  // Sync collapsed state with facade
  constructor() {
    effect(() => {
      const facadeCollapsed = this.sidebarFacade.collapsed();
      if (facadeCollapsed !== this.collapsed) {
        this.collapsed = facadeCollapsed;
        this.collapsedChange.emit(facadeCollapsed);
      }
    });

    // Auto-scroll to active item
    effect(() => {
      // Depend on menu state change
      this.menuItemsWithState();

      // Schedule scroll after view update
      setTimeout(() => {
        this.scrollToActiveItem();
      }, 100);
    });
  }

  private scrollToActiveItem(): void {
    if (!this.sidebarNavRef?.nativeElement) return;

    const container = this.sidebarNavRef.nativeElement;
    // Find the active item (either top-level or sub-item)
    const activeItem = container.querySelector('.nav-item.active');

    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  toggleCollapse(): void {
    this.sidebarFacade.toggleCollapsed();
  }

  handleMobileClose(): void {
    this.sidebarFacade.closeMobileSidebar();
    this.mobileClose.emit();
  }

  onNavItemClick(): void {
    // Close mobile menu when nav item is clicked
    if (this.mobileOpen) {
      setTimeout(() => {
        this.handleMobileClose();
      }, 100);
    }
  }

  onLogoError(): void {
    this.logoError = true;
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.sidebarFacade.setSearchQuery(input.value);
  }

  clearSearch(): void {
    this.sidebarFacade.clearSearch();
  }

  toggleGroup(label: string): void {
    this.sidebarFacade.toggleGroup(label);
  }

  isGroupExpanded(label: string): boolean {
    return this.sidebarFacade.isGroupExpanded(label);
  }

  retryLoadManifest(): void {
    this.navigationFacade.reloadManifest();
  }
}
