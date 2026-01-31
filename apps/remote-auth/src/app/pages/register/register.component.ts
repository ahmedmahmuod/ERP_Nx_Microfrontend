import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  InputComponent,
  ButtonComponent,
  CardComponent,
  StandaloneLanguageSwitchComponent,
} from '@erp/shared/ui';
import { AuthFacadeService } from '../../services/auth-facade.service';
import {
  TranslocoDirective,
  TranslocoService,
} from '@jsverse/transloco';
import { ValidationMessageResolver } from '@erp/shared/util-i18n';
import { BRAND } from '@erp/shared/config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    ButtonComponent,
    CardComponent,
    StandaloneLanguageSwitchComponent,
    TranslocoDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly validationResolver = inject(ValidationMessageResolver);
  readonly authFacade = inject(AuthFacadeService);

  readonly brandName = BRAND.NAME;

  readonly registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: [this.passwordMatchValidator],
    },
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        ...confirmPassword.errors,
        passwordMismatch: true,
      });
      return { passwordMismatch: true };
    }

    if (confirmPassword.errors) {
      const { passwordMismatch, ...otherErrors } = confirmPassword.errors;
      if (Object.keys(otherErrors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) return;

    try {
      await this.authFacade.register(this.registerForm.value);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      // Error handled by facade
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    return this.validationResolver.resolve(field.errors);
  }
}
