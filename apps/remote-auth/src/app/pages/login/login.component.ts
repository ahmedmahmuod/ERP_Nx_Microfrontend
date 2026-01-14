/**
 * Login Component
 * 
 * Professional enterprise login page.
 * Smart component - uses AuthFacadeService.
 */

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, ButtonComponent, CardComponent } from '@erp/shared/ui';
import { ToastService } from '@erp/shared/utils';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { BRAND, DEMO_CREDENTIALS, LENGTH_CONSTRAINTS, AUTH_ROUTES, DEFAULT_REDIRECTS } from '@erp/shared/config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    ButtonComponent,
    CardComponent
  ],
  template: `
    
    <div class="login-container">
      <div class="login-card-wrapper">
        <erp-card elevation="lg">
          <div card-body>
            
            <!-- Header -->
            <div class="login-header">
              <div class="brand">
                <i class="pi pi-building brand-icon"></i>
                <h1 class="brand-title">{{ brandName }}</h1>
              </div>
              <h2 class="login-title">Sign In</h2>
              <p class="login-subtitle">Enter your credentials to access your account</p>
            </div>
            
            <!-- Login Form -->
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <erp-input
                type="email"
                label="Email Address"
                [placeholder]="demoEmail"
                formControlName="email"
                [required]="true"
                [invalid]="isFieldInvalid('email')"
                [errorText]="getFieldError('email')">
              </erp-input>
              
              <erp-input
                type="password"
                label="Password"
                placeholder="Enter your password"
                formControlName="password"
                [required]="true"
                [invalid]="isFieldInvalid('password')"
                [errorText]="getFieldError('password')">
              </erp-input>
              
              <div class="form-options">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    formControlName="rememberMe"
                    class="checkbox">
                  <span>Remember me</span>
                </label>
                
                <a href="#" class="forgot-link">Forgot password?</a>
              </div>
              
              <erp-button
                type="submit"
                variant="primary"
                size="lg"
                [fullWidth]="true"
                [loading]="authFacade.isLoading()"
                [disabled]="loginForm.invalid || authFacade.isLoading()">
                Sign In
              </erp-button>
            </form>
            
            <!-- Footer -->
            <div class="login-footer">
              <p class="signup-text">
                Don't have an account?
                <a routerLink="/auth/register" class="signup-link">Sign up</a>
              </p>
            </div>
          </div>
        </erp-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, rgb(59 130 246) 0%, rgb(147 51 234) 100%);
    }

    :host-context(.dark) .login-container {
      background: linear-gradient(135deg, rgb(30 58 138) 0%, rgb(88 28 135) 100%);
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

    .test-account-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
      border-radius: 0.5rem;
      color: #1e40af;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .test-account-info i {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    :host-context(.dark) .test-account-info {
      background-color: #1e3a8a;
      border-color: #1e40af;
      color: #bfdbfe;
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

    .demo-credentials {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: rgb(239 246 255);
      border-radius: 0.5rem;
      text-align: center;
    }

    :host-context(.dark) .demo-credentials {
      background-color: rgb(30 58 138);
    }

    .demo-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: rgb(30 64 175);
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    :host-context(.dark) .demo-title {
      color: rgb(147 197 253);
    }

    .demo-text {
      font-size: 0.75rem;
      color: rgb(30 64 175);
      margin: 0.25rem 0;
      font-family: monospace;
    }

    :host-context(.dark) .demo-text {
      color: rgb(191 219 254);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly authFacade = inject(AuthFacadeService);
  
  // Centralized branding constants
  readonly brandName = BRAND.NAME;
  readonly demoEmail = DEMO_CREDENTIALS.EMAIL;
  
  // Default test account credentials for easy testing
  readonly loginForm: FormGroup = this.fb.group({
    email: [DEMO_CREDENTIALS.EMAIL, [Validators.required, Validators.email]],
    password: [DEMO_CREDENTIALS.PASSWORD, [Validators.required, Validators.minLength(LENGTH_CONSTRAINTS.PASSWORD.MIN)]],
    rememberMe: [false]
  });
  
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.toast.warning('Please fill in all required fields');
      return;
    }
    
    try {
      await this.authFacade.login(this.loginForm.value);
      
      // Show success toast
      this.toast.success(`Login successful! Welcome to ${BRAND.NAME}`);
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        // Use window.location for cross-microfrontend navigation
        window.location.href = DEFAULT_REDIRECTS.AFTER_LOGIN;
      }, 800);
    } catch (error) {
      this.toast.error('Login failed. Invalid email or password.');
    }
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';
    
    if (field.errors['required']) return 'This field is required';
    if (field.errors['email']) return 'Please enter a valid email';
    if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    
    return '';
  }
}
