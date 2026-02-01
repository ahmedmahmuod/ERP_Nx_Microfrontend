import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  // Services
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastNotificationService);
  private readonly transloco = inject(TranslocoService);
  private readonly validationResolver = inject(ValidationMessageResolver);
  readonly authFacade = inject(AuthFacadeService);

  // View data
  readonly BRAND = BRAND;
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

  /**
   * Handle login form submission
   */
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.showValidationError();
      return;
    }

    try {
      await this.authFacade.login(this.loginForm.value);
      this.handleLoginSuccess();
    } catch (error: unknown) {
      this.handleLoginError(error);
    }
  }

  /**
   * Show validation error toast
   */
  private showValidationError(): void {
    this.toastService.warning(
      this.transloco.translate('auth.login.validationTitle'),
      this.transloco.translate('auth.validation.fillRequired'),
    );
  }

  /**
   * Handle successful login
   */
  private handleLoginSuccess(): void {
    const successTitle = this.transloco.translate('auth.login.successTitle');
    const successMessage = this.transloco.translate(
      'auth.login.successMessage',
      {
        brand: BRAND.NAME,
      },
    );

    // Increase toast life to 5000ms to ensure visibility
    this.toastService.success(successTitle, successMessage, { life: 5000 });

    // Navigate using Angular Router to preserve toast messages
    // Companies are already set in AuthFacade before this method is called
    setTimeout(() => {
      this.router.navigate([DEFAULT_REDIRECTS.AFTER_LOGIN]);
    }, 500);
  }

  /**
   * Handle login error with translated messages
   */
  private handleLoginError(error: unknown): void {
    const errorTitle = this.transloco.translate('auth.login.errorTitle');
    const errorMessage = this.getErrorMessage(error);

    this.toastService.error(errorTitle, errorMessage);
  }

  /**
   * Extract error message from ApiError or use default
   */
  private getErrorMessage(error: unknown): string {
    const defaultMessage = this.transloco.translate('auth.login.errorDefault');

    if (typeof error === 'object' && error !== null && 'messageKey' in error) {
      const messageKey = (error as { messageKey: string }).messageKey;
      const translated = this.transloco.translate(`auth.${messageKey}`);

      // Return translated message if found, otherwise use default
      return translated !== `auth.${messageKey}` ? translated : defaultMessage;
    }

    return defaultMessage;
  }

  /**
   * Check if form field is invalid and should show error
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get translated error message for form field
   */
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    return this.validationResolver.resolve(field.errors);
  }
}
