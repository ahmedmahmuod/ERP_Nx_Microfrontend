/**
 * Register Component
 * 
 * Professional enterprise registration page.
 * Smart component - uses AuthFacadeService.
 */

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputComponent, ButtonComponent, CardComponent } from '@erp/shared/ui';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    ButtonComponent,
    CardComponent
  ],
  template: `
    <div class="register-container">
      <div class="register-card-wrapper">
        <erp-card elevation="lg">
          <div card-body>
            <!-- Header -->
            <div class="register-header">
              <div class="brand">
                <i class="pi pi-building brand-icon"></i>
                <h1 class="brand-title">Assemble ERP</h1>
              </div>
              <h2 class="register-title">Create Account</h2>
              <p class="register-subtitle">Sign up to get started with Assemble ERP</p>
            </div>
            
            <!-- Register Form -->
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
              <erp-input
                type="text"
                label="Full Name"
                placeholder="John Doe"
                formControlName="name"
                [required]="true"
                [invalid]="isFieldInvalid('name')"
                [errorText]="getFieldError('name')">
              </erp-input>
              
              <erp-input
                type="email"
                label="Email Address"
                placeholder="john.doe@company.com"
                formControlName="email"
                [required]="true"
                [invalid]="isFieldInvalid('email')"
                [errorText]="getFieldError('email')">
              </erp-input>
              
              <erp-input
                type="password"
                label="Password"
                placeholder="Create a strong password"
                formControlName="password"
                [required]="true"
                [invalid]="isFieldInvalid('password')"
                [errorText]="getFieldError('password')"
                helperText="Minimum 8 characters">
              </erp-input>
              
              <erp-input
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                formControlName="confirmPassword"
                [required]="true"
                [invalid]="isFieldInvalid('confirmPassword')"
                [errorText]="getFieldError('confirmPassword')">
              </erp-input>
              
              <div class="terms-checkbox">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    formControlName="acceptTerms"
                    class="checkbox">
                  <span>I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a></span>
                </label>
                @if (isFieldInvalid('acceptTerms')) {
                  <span class="field-error">{{ getFieldError('acceptTerms') }}</span>
                }
              </div>
              
              <erp-button
                type="submit"
                variant="primary"
                size="lg"
                [fullWidth]="true"
                [loading]="authFacade.isLoading()"
                [disabled]="registerForm.invalid || authFacade.isLoading()">
                Create Account
              </erp-button>
            </form>
            
            <!-- Footer -->
            <div class="register-footer">
              <p class="signin-text">
                Already have an account?
                <a routerLink="/auth/login" class="signin-link">Sign in</a>
              </p>
            </div>
          </div>
        </erp-card>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, rgb(16 185 129) 0%, rgb(59 130 246) 100%);
    }

    :host-context(.dark) .register-container {
      background: linear-gradient(135deg, rgb(6 78 59) 0%, rgb(30 58 138) 100%);
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

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background-color: rgb(254 242 242);
      border: 1px solid rgb(254 226 226);
      border-radius: 0.5rem;
      color: rgb(153 27 27);
      margin-bottom: 1.5rem;
    }

    :host-context(.dark) .error-message {
      background-color: rgb(127 29 29);
      border-color: rgb(153 27 27);
      color: rgb(254 202 202);
    }

    .error-icon {
      font-size: 1.25rem;
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly authFacade = inject(AuthFacadeService);
  
  readonly registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, {
    validators: [this.passwordMatchValidator]
  });
  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
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
    
    if (field.errors['required']) return 'This field is required';
    if (field.errors['requiredTrue']) return 'You must accept the terms';
    if (field.errors['email']) return 'Please enter a valid email';
    if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    if (field.errors['passwordMismatch']) return 'Passwords do not match';
    
    return '';
  }
}
