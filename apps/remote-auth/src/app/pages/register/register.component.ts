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
  TRANSLOCO_SCOPE,
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
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth',
    },
  ],
  template: `
    <ng-container *transloco="let t; read: 'auth'">
      <div class="register-container relative">
        <!-- Language Switcher -->
        <div class="absolute top-4 inset-inline-end-4 z-10">
          <lib-standalone-language-switch
            [isNested]="false"
          ></lib-standalone-language-switch>
        </div>

        <div class="register-card-wrapper">
          <erp-card elevation="lg">
            <div card-body>
              <!-- Header -->
              <div class="register-header">
                <div class="brand">
                  <i class="pi pi-building brand-icon"></i>
                  <h1 class="brand-title">{{ brandName }}</h1>
                </div>
                <h2 class="register-title">{{ t('register.title') }}</h2>
                <p class="register-subtitle">
                  {{ t('register.subtitle') }}
                </p>
              </div>

              <!-- Register Form -->
              <form
                [formGroup]="registerForm"
                (ngSubmit)="onSubmit()"
                class="register-form"
              >
                <erp-input
                  type="text"
                  [label]="t('register.nameLabel')"
                  [placeholder]="t('register.namePlaceholder')"
                  formControlName="name"
                  [required]="true"
                  [invalid]="isFieldInvalid('name')"
                  [errorText]="getFieldError('name')"
                >
                </erp-input>

                <erp-input
                  type="email"
                  [label]="t('register.emailLabel')"
                  [placeholder]="t('register.emailPlaceholder')"
                  formControlName="email"
                  [required]="true"
                  [invalid]="isFieldInvalid('email')"
                  [errorText]="getFieldError('email')"
                >
                </erp-input>

                <erp-input
                  type="password"
                  [label]="t('register.passwordLabel')"
                  [placeholder]="t('register.passwordPlaceholder')"
                  formControlName="password"
                  [required]="true"
                  [invalid]="isFieldInvalid('password')"
                  [errorText]="getFieldError('password')"
                >
                </erp-input>

                <erp-input
                  type="password"
                  [label]="t('register.confirmPasswordLabel')"
                  [placeholder]="t('register.confirmPasswordPlaceholder')"
                  formControlName="confirmPassword"
                  [required]="true"
                  [invalid]="isFieldInvalid('confirmPassword')"
                  [errorText]="getFieldError('confirmPassword')"
                >
                </erp-input>

                <div class="terms-checkbox">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      formControlName="acceptTerms"
                      class="checkbox"
                    />
                    <span>
                      {{ t('register.terms.agree') }}
                      <a href="#" class="terms-link">{{
                        t('register.terms.tos')
                      }}</a>
                      {{ t('register.terms.and') }}
                      <a href="#" class="terms-link">{{
                        t('register.terms.privacy')
                      }}</a>
                    </span>
                  </label>
                  @if (isFieldInvalid('acceptTerms')) {
                    <span class="field-error">{{
                      getFieldError('acceptTerms')
                    }}</span>
                  }
                </div>

                <erp-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  [fullWidth]="true"
                  [loading]="authFacade.isLoading()"
                  [disabled]="registerForm.invalid || authFacade.isLoading()"
                >
                  {{
                    authFacade.isLoading()
                      ? t('register.creatingAccount')
                      : t('register.createAccount')
                  }}
                </erp-button>
              </form>

              <!-- Footer -->
              <div class="register-footer">
                <p class="signin-text">
                  {{ t('register.alreadyHaveAccount') }}
                  <a routerLink="/auth/login" class="signin-link">{{
                    t('register.signIn')
                  }}</a>
                </p>
              </div>
            </div>
          </erp-card>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .register-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        background: linear-gradient(
          135deg,
          rgb(16 185 129) 0%,
          rgb(59 130 246) 100%
        );
      }

      :host-context(.dark) .register-container {
        background: linear-gradient(
          135deg,
          rgb(6 78 59) 0%,
          rgb(30 58 138) 100%
        );
      }

      .register-card-wrapper {
        width: 100%;
        max-width: 500px;
      }

      .register-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .brand-icon {
        font-size: 2.5rem;
      }

      .brand-title {
        font-size: 1.875rem;
        font-weight: 700;
        margin: 0;
        color: rgb(17 24 39);
      }

      :host-context(.dark) .brand-title {
        color: rgb(243 244 246);
      }

      .register-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: rgb(17 24 39);
      }

      :host-context(.dark) .register-title {
        color: rgb(243 244 246);
      }

      .register-subtitle {
        font-size: 0.875rem;
        color: rgb(107 114 128);
        margin: 0;
      }

      :host-context(.dark) .register-subtitle {
        color: rgb(156 163 175);
      }

      .register-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .terms-checkbox {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: rgb(55 65 81);
        cursor: pointer;
      }

      :host-context(.dark) .checkbox-label {
        color: rgb(209 213 219);
      }

      .checkbox {
        width: 1rem;
        height: 1rem;
        margin-top: 0.125rem;
        cursor: pointer;
        flex-shrink: 0;
      }

      .terms-link {
        color: rgb(59 130 246);
        text-decoration: none;
      }

      .terms-link:hover {
        text-decoration: underline;
      }

      :host-context(.dark) .terms-link {
        color: rgb(96 165 250);
      }

      .field-error {
        font-size: 0.875rem;
        color: rgb(239 68 68);
      }

      :host-context(.dark) .field-error {
        color: rgb(248 113 113);
      }

      .register-footer {
        margin-top: 2rem;
        text-align: center;
      }

      .signin-text {
        font-size: 0.875rem;
        color: rgb(107 114 128);
        margin: 0;
      }

      :host-context(.dark) .signin-text {
        color: rgb(156 163 175);
      }

      .signin-link {
        color: rgb(59 130 246);
        text-decoration: none;
        font-weight: 500;
        margin-left: 0.25rem;
      }

      .signin-link:hover {
        text-decoration: underline;
      }

      :host-context(.dark) .signin-link {
        color: rgb(96 165 250);
      }
    `,
  ],
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
