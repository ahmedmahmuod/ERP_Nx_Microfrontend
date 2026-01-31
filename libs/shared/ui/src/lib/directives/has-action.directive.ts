/**
 * Has Action Directive
 * Structural directive to show/hide elements based on action permissions
 * Usage: *erpHasAction="'UserEntity.CreateBusinessEntity'"
 */

import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  OnInit,
  OnDestroy,
  effect,
  untracked,
} from '@angular/core';
import { PermissionsFacade } from '@erp/shared/util-state';

@Directive({
  selector: '[libHasAction]',
  standalone: true,
})
export class HasActionDirective implements OnInit, OnDestroy {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly permissionsFacade = inject(PermissionsFacade);

  private hasView = false;

  @Input({ required: true }) erpHasAction!: string;

  ngOnInit(): void {
    // React to permission changes
    effect(() => {
      const activeModule = this.permissionsFacade.activeModuleKey();

      untracked(() => {
        this.updateView();
      });
    });

    // Initial check
    this.updateView();
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }

  private updateView(): void {
    const hasPermission = this.permissionsFacade.hasActionInActiveModule(
      this.erpHasAction
    );

    if (hasPermission && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
