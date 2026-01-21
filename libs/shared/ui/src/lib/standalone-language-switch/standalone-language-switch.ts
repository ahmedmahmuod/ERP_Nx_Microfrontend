import { Component, inject, computed, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageFacade, Language } from '@erp/shared/util-state';

/**
 * Standalone Language Switcher Component
 *
 * A PrimeNG-free language switcher for use in applications that don't have PrimeNG configured.
 * Uses pure HTML/CSS with the same logic as the PrimeNG-based LanguageSwitchComponent.
 */
@Component({
  selector: 'lib-standalone-language-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher-container" [class.nested]="isNested()">
      <!-- Trigger Button -->
      <button
        type="button"
        class="language-trigger"
        [class.nested-trigger]="isNested()"
        (click)="toggleDropdown()"
        (blur)="onBlur($event)"
      >
        <span class="flag">{{ activeLangFlag() }}</span>
        <span class="label">{{ activeLangLabel() }}</span>

        @if (isNested()) {
          <svg
            class="chevron nested-chevron"
            [class.open]="isOpen()"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        } @else {
          <svg
            class="chevron"
            [class.open]="isOpen()"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        }
      </button>

      <!-- Dropdown Menu -->
      <div class="language-dropdown" [class.open]="isOpen()">
        @for (lang of availableLanguages(); track lang.code) {
          <button
            type="button"
            class="language-option"
            [class.active]="lang.code === activeLanguage()"
            (click)="selectLanguage(lang.code)"
          >
            <span class="flag">{{ lang.flag }}</span>
            <span class="label">{{ lang.label }}</span>
            @if (lang.code === activeLanguage()) {
              <svg
                class="check-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            }
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .language-switcher-container {
        position: relative;
        display: inline-block;
      }

      .language-switcher-container.nested {
        width: 100%;
      }

      .language-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1rem;
        background-color: var(--color-bg-primary, white);
        border: 1px solid var(--color-border-primary, #e5e7eb);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.15s ease;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-primary, #111827);
      }

      .language-trigger.nested-trigger {
        width: 100%;
        border: none;
        background: transparent;
        border-radius: 0;
        padding: 0.75rem 1rem;
      }

      .language-trigger:hover {
        background-color: var(--color-bg-hover, #f9fafb);
      }

      .language-trigger.nested-trigger:hover {
        background-color: var(--color-bg-hover, #f3f4f6);
      }

      .language-trigger:focus {
        outline: none;
      }

      .flag {
        font-size: 1.125rem;
        line-height: 1;
        display: flex;
        align-items: center;
      }

      .label {
        color: inherit;
      }

      .chevron {
        width: 1rem;
        height: 1rem;
        margin-inline-start: auto;
        color: var(--color-text-tertiary, #9ca3af);
        transition: transform 0.2s ease;
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .nested-chevron {
        width: 0.75rem;
        height: 0.75rem;
      }

      .language-dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        inset-inline-end: 0;
        min-width: 12rem;
        background-color: var(--color-bg-primary, white);
        border: 1px solid var(--color-border-primary, #e5e7eb);
        border-radius: 0.75rem;
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 50;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-0.5rem);
        transition: all 0.2s ease;

        @media (max-width: 640px) {
          position: fixed;
          top: auto;
          bottom: 1rem;
          inset-inline: 1rem;
          min-width: 0;
          transform: translateY(1rem);
        }
      }

      .language-dropdown.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);

        @media (max-width: 640px) {
          transform: translateY(0);
        }
      }

      .language-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem 1rem;
        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.15s ease;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-primary, #111827);
        text-align: inherit;
      }

      .language-option:hover {
        background-color: var(--color-bg-hover, #f3f4f6);
      }

      .language-option.active {
        background-color: rgba(59, 130, 246, 0.1);
        color: var(--accent-primary, #3b82f6);
      }

      .language-option .flag {
        font-size: 1.125rem;
      }

      .language-option .label {
        flex: 1;
        color: inherit;
      }

      .check-icon {
        width: 1rem;
        height: 1rem;
        color: var(--accent-primary, #3b82f6);
      }

      /* Dark mode support */
      :host-context(.dark) .language-trigger {
        background-color: var(--color-bg-primary, #1e1e1e);
        border-color: var(--color-border-primary, #374151);
        color: var(--color-text-primary, #f3f4f6);
      }

      :host-context(.dark) .language-trigger.nested-trigger {
        background-color: transparent;
      }

      :host-context(.dark) .language-trigger:hover {
        background-color: var(--color-bg-hover, #2d2d2d);
      }

      :host-context(.dark) .language-dropdown {
        background-color: var(--color-bg-primary, #1e1e1e);
        border-color: var(--color-border-primary, #374151);
      }

      :host-context(.dark) .language-option {
        color: var(--color-text-primary, #f3f4f6);
      }

      :host-context(.dark) .language-option:hover {
        background-color: var(--color-bg-hover, #2d2d2d);
      }

      :host-context(.dark) .language-option.active {
        background-color: rgba(96, 165, 250, 0.15);
      }
    `,
  ],
})
export class StandaloneLanguageSwitchComponent {
  private languageFacade = inject(LanguageFacade);

  /**
   * If true, it behaves as a menu item (no border, chevron-right).
   * If false, it behaves as a standalone dropdown (border, chevron-down).
   */
  isNested = input<boolean>(true);

  activeLanguage = this.languageFacade.activeLanguage;
  availableLanguages = this.languageFacade.availableLanguages;
  isOpen = signal(false);

  activeLangFlag = computed(() => {
    const active = this.activeLanguage();
    return (
      this.availableLanguages().find((l) => l.code === active)?.flag || '🌐'
    );
  });

  activeLangLabel = computed(() => {
    const active = this.activeLanguage();
    return (
      this.availableLanguages().find((l) => l.code === active)?.label ||
      'Language'
    );
  });

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  selectLanguage(lang: Language) {
    this.languageFacade.setLanguage(lang);
    this.isOpen.set(false);
  }

  onBlur(event: FocusEvent) {
    // Close dropdown when clicking outside
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (
      !relatedTarget ||
      !relatedTarget.closest('.language-switcher-container')
    ) {
      setTimeout(() => this.isOpen.set(false), 150);
    }
  }
}
