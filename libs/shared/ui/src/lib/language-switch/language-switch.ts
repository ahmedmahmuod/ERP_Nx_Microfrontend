import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { LanguageFacade, Language } from '@erp/shared/util-state';

@Component({
  selector: 'lib-language-switch',
  standalone: true,
  imports: [CommonModule, ButtonModule, PopoverModule],
  template: `
    <!-- Trigger Button -->
    <div
      #langTrigger
      class="flex items-center px-4 py-3 cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors duration-150 rounded-none w-full focus:outline-none"
      [class.rounded-lg]="!isNested()"
      [class.border]="!isNested()"
      [class.border-[var(--color-border-primary)]]="!isNested()"
      [class.bg-[var(--color-bg-primary)]]="!isNested()"
      (click)="op.toggle($event)"
      (keyup.enter)="op.toggle($event)"
      role="button"
      tabindex="0"
    >
      <span class="me-3 text-lg">{{ activeLangFlag() }}</span>
      <span class="font-medium text-[var(--color-text-primary)]">{{
        activeLangLabel()
      }}</span>
      <i
        [class]="
          isNested()
            ? 'pi pi-chevron-right ms-auto text-[10px] text-[var(--color-text-tertiary)]'
            : 'pi pi-chevron-down ms-auto text-xs text-[var(--color-text-tertiary)]'
        "
      ></i>
    </div>

    <!-- Language Selection Popover -->
    <p-popover
      #op
      styleClass="language-overlay shadow-xl overflow-hidden rounded-xl border border-[var(--color-border-primary)]"
    >
      <div class="flex flex-col w-48 bg-[var(--color-bg-primary)] py-1">
        @for (lang of availableLanguages(); track lang.code) {
          <button
            pButton
            (click)="selectLanguage(lang.code); op.hide()"
            class="p-button-text p-button-plain justify-start w-full px-4 py-3 rounded-none hover:bg-[var(--color-bg-hover)] transition-colors"
            [class.active-lang]="lang.code === activeLanguage()"
          >
            <span class="me-3 text-lg">{{ lang.flag }}</span>
            <span
              class="font-medium text-[var(--color-text-primary)]"
              [class.text-[var(--accent-primary)]]="
                lang.code === activeLanguage()
              "
            >
              {{ lang.label }}
            </span>
            @if (lang.code === activeLanguage()) {
              <i
                class="pi pi-check ms-auto text-[var(--accent-primary)] text-xs"
              ></i>
            }
          </button>
        }
      </div>
    </p-popover>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .active-lang {
        background-color: rgb(from var(--accent-primary) r g b / 0.1);
        color: var(--accent-primary);
      }

      /* Brighten flag emojis in dark mode for better visibility */
      :host-context(.dark) .me-3.text-lg {
        color: var(--color-text-primary);
      }
    `,
  ],
})
export class LanguageSwitchComponent {
  private languageFacade = inject(LanguageFacade);

  /**
   * If true, it behaves as a menu item (no border, chevron-right).
   * If false, it behaves as a standalone dropdown (border, chevron-down).
   */
  isNested = input<boolean>(true);

  activeLanguage = this.languageFacade.activeLanguage;
  availableLanguages = this.languageFacade.availableLanguages;

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

  selectLanguage(lang: Language) {
    this.languageFacade.setLanguage(lang);
  }
}
