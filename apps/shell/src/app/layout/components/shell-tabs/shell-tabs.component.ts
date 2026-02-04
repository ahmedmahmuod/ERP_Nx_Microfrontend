import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  ElementRef,
  ViewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';
import {
  ShellTabsService,
  ShellTabCategory,
} from '../../../core/services/shell-tabs.service';
import { ShellMenuService } from '../../../core/services/shell-menu.service';

/**
 * Shell Tabs Component
 * Displays tab navigation for Shell (Main/Payment/Needs/Docs)
 * Follows Design System rules - no hardcoded styles
 */
@Component({
  selector: 'app-shell-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslocoDirective],
  templateUrl: './shell-tabs.component.html',
  styleUrl: './shell-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellTabsComponent {
  readonly tabsService = inject(ShellTabsService);
  readonly menuService = inject(ShellMenuService);
  readonly collapsed = input<boolean>(false);

  @ViewChild('tabContent') tabContentRef!: ElementRef<HTMLElement>;

  constructor() {
    // Auto-scroll to active item when menu content changes or tab switches
    effect(() => {
      // Depend on menu items
      this.menuService.menuItems();

      // Also depend on active tab to re-trigger
      this.tabsService.activeTab();

      // Schedule scroll
      setTimeout(() => {
        this.scrollToActiveItem();
      }, 100);
    });
  }

  onTabClick(tabId: ShellTabCategory): void {
    this.tabsService.setActiveTab(tabId);
  }

  private scrollToActiveItem(): void {
    if (!this.tabContentRef?.nativeElement) return;

    const container = this.tabContentRef.nativeElement;
    // Find active menu item
    // Note: RouterLinkActive applies the class 'menu-item-active'
    const activeItem = container.querySelector('.menu-item-active');

    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
}
