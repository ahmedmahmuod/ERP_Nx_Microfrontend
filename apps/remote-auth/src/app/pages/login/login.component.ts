import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  InputComponent,
  ButtonComponent,
  CardComponent,
  StandaloneLanguageSwitchComponent,
} from '@erp/shared/ui';
import { ToastNotificationService } from '@erp/shared/ui/primeng-components';
import { AuthFacadeService } from '../../services/auth-facade.service';
import {
  TranslocoDirective,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';
import { ValidationMessageResolver } from '@erp/shared/util-i18n';
import {
  BRAND,
  DEMO_CREDENTIALS,
  LENGTH_CONSTRAINTS,
  DEFAULT_REDIRECTS,
} from '@erp/shared/config';

@Component({
  selector: 'app-login',
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
      <div class="login-container relative">
        <!-- Language Switcher -->
        <div class="lang-switch-container">
          <lib-standalone-language-switch
            [isNested]="false"
          ></lib-standalone-language-switch>
        </div>

        <div class="login-card-wrapper">
          <erp-card elevation="lg">
            <div card-body>
              <!-- Header -->
              <div class="login-header">
                <div class="brand">
                  <i class="pi pi-building brand-icon"></i>
                  <h1 class="brand-title">{{ brandName }}</h1>
                </div>
                <h2 class="login-title">{{ t('login.title') }}</h2>
                <p class="login-subtitle">
                  {{ t('login.subtitle') }}
                </p>
              </div>

              <!-- Login Form -->
              <form
                [formGroup]="loginForm"
                (ngSubmit)="onSubmit()"
                class="login-form"
              >
                <erp-input
                  type="email"
                  [label]="t('login.emailLabel')"
                  [placeholder]="t('login.emailPlaceholder')"
                  formControlName="email"
                  [required]="true"
                  [invalid]="isFieldInvalid('email')"
                  [errorText]="getFieldError('email')"
                >
                </erp-input>

                <erp-input
                  type="password"
                  [label]="t('login.passwordLabel')"
                  [placeholder]="t('login.passwordPlaceholder')"
                  formControlName="password"
                  [required]="true"
                  [invalid]="isFieldInvalid('password')"
                  [errorText]="getFieldError('password')"
                >
                </erp-input>

                <div class="form-options">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      formControlName="rememberMe"
                      class="checkbox"
                    />
                    <span>{{ t('login.rememberMe') }}</span>
                  </label>

                  <a href="#" class="forgot-link">{{
                    t('login.forgotPassword')
                  }}</a>
                </div>

                <erp-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  [fullWidth]="true"
                  [loading]="authFacade.isLoading()"
                  [disabled]="loginForm.invalid || authFacade.isLoading()"
                >
                  {{
                    authFacade.isLoading()
                      ? t('login.signingIn')
                      : t('login.signIn')
                  }}
                </erp-button>
              </form>

              <!-- Footer -->
              <div class="login-footer">
                <p class="signup-text">
                  {{ t('login.noAccount') }}
                  <a routerLink="/auth/register" class="signup-link">{{
                    t('login.signup')
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
      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        background: linear-gradient(
          135deg,
          rgb(59 130 246) 0%,
          rgb(147 51 234) 100%
        );
        gap: 1rem;
      }

      .lang-switch-container {
        position: absolute;
        top: 1rem;
        inset-inline-end: 1rem;
        z-index: 10;
      }

      @media (max-height: 600px) or (max-width: 640px) {
        .login-container {
          padding-top: 5rem;
          justify-content: flex-start;
        }
        .lang-switch-container {
          top: 1.5rem;
        }
      }

      :host-context(.dark) .login-container {
        background: linear-gradient(
          135deg,
          rgb(30 58 138) 0%,
          rgb(88 28 135) 100%
        );
      }

      .login-card-wrapper {
        width: 100%;
        max-width: 450px;
      }

      .login-header {
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
        color: #2563eb;
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

      .login-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: rgb(17 24 39);
      }

      :host-context(.dark) .login-title {
        color: rgb(243 244 246);
      }

      .login-subtitle {
        font-size: 0.875rem;
        color: rgb(107 114 128);
        margin: 0;
      }

      :host-context(.dark) .login-subtitle {
        color: rgb(156 163 175);
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: -0.5rem;
      }

      .checkbox-label {
        display: flex;
        align-items: center;
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
        cursor: pointer;
      }

      .forgot-link {
        font-size: 0.875rem;
        color: rgb(59 130 246);
        text-decoration: none;
      }

      .forgot-link:hover {
        text-decoration: underline;
      }

      :host-context(.dark) .forgot-link {
        color: rgb(96 165 250);
      }

      .login-footer {
        margin-top: 2rem;
        text-align: center;
      }

      .signup-text {
        font-size: 0.875rem;
        color: rgb(107 114 128);
        margin: 0;
      }

      :host-context(.dark) .signup-text {
        color: rgb(156 163 175);
      }

      .signup-link {
        color: rgb(59 130 246);
        text-decoration: none;
        font-weight: 500;
        margin-left: 0.25rem;
      }

      .signup-link:hover {
        text-decoration: underline;
      }

      :host-context(.dark) .signup-link {
        color: rgb(96 165 250);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastNotificationService);
  private readonly transloco = inject(TranslocoService);
  private readonly validationResolver = inject(ValidationMessageResolver);
  readonly authFacade = inject(AuthFacadeService);

  // Centralized branding constants
  readonly brandName = BRAND.NAME;

  // Default test account credentials for easy testing
  readonly loginForm: FormGroup = this.fb.group({
    email: [DEMO_CREDENTIALS.EMAIL, [Validators.required, Validators.email]],
    password: [
      DEMO_CREDENTIALS.PASSWORD,
      [
        Validators.required,
        Validators.minLength(LENGTH_CONSTRAINTS.PASSWORD.MIN),
      ],
    ],
    rememberMe: [false],
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.toastService.warning(
        'Validation Error',
        this.transloco.translate('auth.validation.fillRequired'),
      );
      return;
    }

    try {
      await this.authFacade.login(this.loginForm.value);

      // Show success toast
      this.toastService.success(
        'Login Successful!',
        this.transloco.translate('auth.validation.loginSuccess', {
          brand: BRAND.NAME,
        }) || `Welcome to ${BRAND.NAME}`,
      );

      // Redirect to dashboard after short delay
      setTimeout(() => {
        // Use window.location for cross-microfrontend navigation
        window.location.href = DEFAULT_REDIRECTS.AFTER_LOGIN;
      }, 1000);
    } catch (error) {
      this.toastService.error(
        'Login Failed',
        this.transloco.translate('auth.validation.invalidEmailPassword') ||
          'Invalid email or password. Please try again.',
      );
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    return this.validationResolver.resolve(field.errors);
  }
}
