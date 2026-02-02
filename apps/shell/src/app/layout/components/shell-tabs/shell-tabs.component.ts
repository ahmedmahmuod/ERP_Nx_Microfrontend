import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
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

  onTabClick(tabId: ShellTabCategory): void {
    this.tabsService.setActiveTab(tabId);
  }
}
