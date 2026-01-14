/**
 * Header Component
 * 
 * Top navigation bar with branding, user menu, and theme toggle.
 * Dumb component - all state from LayoutService.
 */

import { Component, output, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@erp/shared/ui';
import { LayoutService, UserProfile } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <header class="header">
      <div class="header-left">
        <button 
          class="menu-toggle"
          (click)="menuToggle.emit()"
          aria-label="Toggle menu">
          <span class="menu-icon">☰</span>
        </button>
        
        <a routerLink="/" class="brand">
          <span class="brand-icon">🏢</span>
          <span class="brand-text">ERP System</span>
        </a>
      </div>
      
      <div class="header-right">
        <button 
          class="theme-toggle"
          (click)="themeToggle.emit()"
          [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
          <span class="theme-icon">{{ isDarkMode() ? '☀️' : '🌙' }}</span>
        </button>
        
        @if (currentUser()) {
          <div class="user-menu">
            <button class="user-button" aria-label="User menu">
              @if (currentUser()?.avatar) {
                <img [src]="currentUser()!.avatar" [alt]="currentUser()!.name" class="user-avatar">
              } @else {
                <span class="user-avatar-placeholder">{{ getUserInitials() }}</span>
              }
              <span class="user-name">{{ currentUser()?.name }}</span>
            </button>
          </div>
        } @else {
          <erp-button 
            variant="primary" 
            size="sm"
            routerLink="/auth/login">
            Sign In
          </erp-button>
        }
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
      padding: 0 1.5rem;
      background-color: white;
      border-bottom: 1px solid rgb(229 231 235);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    :host-context(.dark) .header {
      background-color: rgb(31 41 55);
      border-bottom-color: rgb(55 65 81);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border: none;
      background-color: transparent;
      color: rgb(55 65 81);
      cursor: pointer;
      border-radius: 0.375rem;
      transition: background-color 0.2s;
    }

    .menu-toggle:hover {
      background-color: rgb(243 244 246);
    }

    :host-context(.dark) .menu-toggle {
      color: rgb(209 213 219);
    }

    :host-context(.dark) .menu-toggle:hover {
      background-color: rgb(55 65 81);
    }

    .menu-icon {
      font-size: 1.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: rgb(17 24 39);
      font-weight: 600;
      font-size: 1.25rem;
    }

    :host-context(.dark) .brand {
      color: rgb(243 244 246);
    }

    .brand-icon {
      font-size: 1.75rem;
    }

    .brand-text {
      display: none;
    }

    @media (min-width: 640px) {
      .brand-text {
        display: inline;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border: none;
      background-color: transparent;
      cursor: pointer;
      border-radius: 0.375rem;
      transition: background-color 0.2s;
    }

    .theme-toggle:hover {
      background-color: rgb(243 244 246);
    }

    :host-context(.dark) .theme-toggle:hover {
      background-color: rgb(55 65 81);
    }

    .theme-icon {
      font-size: 1.25rem;
    }

    .user-menu {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background-color: transparent;
      color: rgb(55 65 81);
      cursor: pointer;
      border-radius: 0.5rem;
      transition: background-color 0.2s;
    }

    .user-button:hover {
      background-color: rgb(243 244 246);
    }

    :host-context(.dark) .user-button {
      color: rgb(209 213 219);
    }

    :host-context(.dark) .user-button:hover {
      background-color: rgb(55 65 81);
    }

    .user-avatar,
    .user-avatar-placeholder {
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      object-fit: cover;
    }

    .user-avatar-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(59 130 246);
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .user-name {
      display: none;
      font-weight: 500;
    }

    @media (min-width: 768px) {
      .user-name {
        display: inline;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly layoutService = inject(LayoutService);
  
  readonly currentUser = input<UserProfile | null>(null);
  readonly isDarkMode = input<boolean>(false);
  
  readonly menuToggle = output<void>();
  readonly themeToggle = output<void>();
  
  getUserInitials(): string {
    const user = this.currentUser();
    if (!user) return '';
    
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  }
}
