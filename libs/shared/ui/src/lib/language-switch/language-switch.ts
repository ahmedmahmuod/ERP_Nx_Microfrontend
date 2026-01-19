import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-language-switch',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-2 border rounded">Language Switch (Disabled)</div>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LanguageSwitchComponent {}
