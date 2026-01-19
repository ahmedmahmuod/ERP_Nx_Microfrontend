import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageFacade } from '@erp/shared/util-state';

@Component({
  selector: 'lib-language-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150 rounded-none w-full focus:outline-none"
      (click)="toggleLanguage()"
      (keyup.enter)="toggleLanguage()"
      role="button"
      tabindex="0"
    >
      <span class="mr-3 text-lg">{{ displayFlag() }}</span>
      <span class="font-medium text-gray-700">{{ displayLabel() }}</span>
      <i class="pi pi-sync ml-auto text-xs text-gray-500 opacity-50"></i>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LanguageSwitchComponent {
  private languageFacade = inject(LanguageFacade);

  displayFlag = () =>
    this.languageFacade.activeLanguage() === 'ar' ? '🇺🇸' : '🇪🇬';
  displayLabel = () =>
    this.languageFacade.activeLanguage() === 'ar' ? 'English' : 'العربية';

  toggleLanguage() {
    const nextLang =
      this.languageFacade.activeLanguage() === 'ar' ? 'en' : 'ar';
    this.languageFacade.setLanguage(nextLang);
  }
}
