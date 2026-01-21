import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationMessageResolver {
  private readonly transloco = inject(TranslocoService);

  resolve(errors: ValidationErrors | null, scope = 'auth.validation'): string {
    if (!errors) return '';

    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 0) return '';

    // Pick first error
    const firstKey = errorKeys[0];
    const errorData = errors[firstKey];

    const translationKey = `${scope}.${firstKey}`;

    // Check if key exists in translations, otherwise return a default or the key itself
    return this.transloco.translate(translationKey, errorData);
  }
}
