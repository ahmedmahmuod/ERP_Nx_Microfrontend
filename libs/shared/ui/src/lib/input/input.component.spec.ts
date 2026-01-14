import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render input element', () => {
      const input = compiled.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should render label when provided', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      
      const label = compiled.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toContain('Email');
    });

    it('should show required indicator when required', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      
      const requiredSpan = compiled.querySelector('.text-danger-500');
      expect(requiredSpan).toBeTruthy();
      expect(requiredSpan?.textContent).toBe('*');
    });

    it('should render helper text when provided', () => {
      fixture.componentRef.setInput('helperText', 'Enter your email address');
      fixture.detectChanges();
      
      const helperText = compiled.querySelector('.input-helper-text');
      expect(helperText).toBeTruthy();
      expect(helperText?.textContent).toBe('Enter your email address');
    });

    it('should render error text when invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorText', 'Email is required');
      fixture.detectChanges();
      
      const errorText = compiled.querySelector('.input-error-text');
      expect(errorText).toBeTruthy();
      expect(errorText?.textContent).toBe('Email is required');
    });

    it('should not show helper text when invalid', () => {
      fixture.componentRef.setInput('helperText', 'Helper text');
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      
      const helperText = compiled.querySelector('.input-helper-text');
      expect(helperText).toBeFalsy();
    });
  });

  describe('Input Types', () => {
    it('should render text input by default', () => {
      const input = compiled.querySelector('input');
      expect(input?.type).toBe('text');
    });

    it('should render email input when type is email', () => {
      fixture.componentRef.setInput('type', 'email');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.type).toBe('email');
    });

    it('should render password input when type is password', () => {
      fixture.componentRef.setInput('type', 'password');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.type).toBe('password');
    });

    it('should render number input when type is number', () => {
      fixture.componentRef.setInput('type', 'number');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.type).toBe('number');
    });
  });

  describe('Sizes', () => {
    it('should apply md size by default', () => {
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-md')).toBe(true);
    });

    it('should apply xs size', () => {
      fixture.componentRef.setInput('size', 'xs');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-xs')).toBe(true);
    });

    it('should apply sm size', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-sm')).toBe(true);
    });

    it('should apply lg size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-lg')).toBe(true);
    });

    it('should apply xl size', () => {
      fixture.componentRef.setInput('size', 'xl');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-xl')).toBe(true);
    });
  });

  describe('States', () => {
    it('should be enabled by default', () => {
      const input = compiled.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(false);
    });

    it('should be disabled when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      
      const input = compiled.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should be readonly when readonly is true', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      
      const input = compiled.querySelector('input') as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });

    it('should apply invalid class when invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-invalid')).toBe(true);
    });
  });

  describe('Icons', () => {
    it('should render prefix icon when provided', () => {
      fixture.componentRef.setInput('prefixIcon', '🔍');
      fixture.detectChanges();
      
      const prefixIcon = compiled.querySelector('.input-icon-prefix');
      expect(prefixIcon).toBeTruthy();
      expect(prefixIcon?.textContent).toBe('🔍');
    });

    it('should render suffix icon when provided', () => {
      fixture.componentRef.setInput('suffixIcon', '✓');
      fixture.detectChanges();
      
      const suffixIcon = compiled.querySelector('.input-icon-suffix');
      expect(suffixIcon).toBeTruthy();
      expect(suffixIcon?.textContent).toBe('✓');
    });

    it('should apply prefix padding class when prefix icon exists', () => {
      fixture.componentRef.setInput('prefixIcon', '🔍');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-with-prefix')).toBe(true);
    });

    it('should apply suffix padding class when suffix icon exists', () => {
      fixture.componentRef.setInput('suffixIcon', '✓');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.classList.contains('input-with-suffix')).toBe(true);
    });
  });

  describe('Clear Button', () => {
    it('should not show clear button by default', () => {
      const clearBtn = compiled.querySelector('.input-clear-btn');
      expect(clearBtn).toBeFalsy();
    });

    it('should show clear button when enabled and has value', () => {
      fixture.componentRef.setInput('showClearButton', true);
      component.value.set('test');
      fixture.detectChanges();
      
      const clearBtn = compiled.querySelector('.input-clear-btn');
      expect(clearBtn).toBeTruthy();
    });

    it('should not show clear button when disabled', () => {
      fixture.componentRef.setInput('showClearButton', true);
      fixture.componentRef.setInput('disabled', true);
      component.value.set('test');
      fixture.detectChanges();
      
      const clearBtn = compiled.querySelector('.input-clear-btn');
      expect(clearBtn).toBeFalsy();
    });

    it('should clear value when clear button is clicked', () => {
      fixture.componentRef.setInput('showClearButton', true);
      component.value.set('test');
      fixture.detectChanges();
      
      const clearBtn = compiled.querySelector('.input-clear-btn') as HTMLButtonElement;
      clearBtn.click();
      fixture.detectChanges();
      
      expect(component.value()).toBe('');
    });
  });

  describe('Character Count', () => {
    it('should not show character count by default', () => {
      const charCount = compiled.querySelector('.input-char-count');
      expect(charCount).toBeFalsy();
    });

    it('should show character count when enabled and maxLength is set', () => {
      fixture.componentRef.setInput('showCharCount', true);
      fixture.componentRef.setInput('maxLength', 100);
      component.value.set('test');
      fixture.detectChanges();
      
      const charCount = compiled.querySelector('.input-char-count');
      expect(charCount).toBeTruthy();
      expect(charCount?.textContent?.trim()).toBe('4 / 100');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label', () => {
      fixture.componentRef.setInput('ariaLabel', 'Email input');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Email input');
    });

    it('should use label as aria-label if ariaLabel not provided', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Email');
    });

    it('should set aria-invalid when invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should set aria-required when required', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      expect(input?.getAttribute('aria-required')).toBe('true');
    });

    it('should link to helper text with aria-describedby', () => {
      fixture.componentRef.setInput('helperText', 'Helper text');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      const helperText = compiled.querySelector('.input-helper-text');
      const describedBy = input?.getAttribute('aria-describedby');
      
      expect(describedBy).toBeTruthy();
      expect(helperText?.id).toBe(describedBy);
    });

    it('should link to error text with aria-describedby when invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorText', 'Error text');
      fixture.detectChanges();
      
      const input = compiled.querySelector('input');
      const errorText = compiled.querySelector('.input-error-text');
      const describedBy = input?.getAttribute('aria-describedby');
      
      expect(describedBy).toBeTruthy();
      expect(errorText?.id).toBe(describedBy);
    });

    it('should have role="alert" on error text', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorText', 'Error text');
      fixture.detectChanges();
      
      const errorText = compiled.querySelector('.input-error-text');
      expect(errorText?.getAttribute('role')).toBe('alert');
    });
  });

  describe('Value Changes', () => {
    it('should emit valueChange when input changes', () => {
      const valueChangeSpy = jasmine.createSpy('valueChange');
      component.valueChange.subscribe(valueChangeSpy);
      
      const input = compiled.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      
      expect(valueChangeSpy).toHaveBeenCalledWith('test');
    });

    it('should update internal value signal when input changes', () => {
      const input = compiled.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      
      expect(component.value()).toBe('test');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('test value');
      expect(component.value()).toBe('test value');
    });

    it('should register onChange callback', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const input = compiled.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      
      expect(onChangeSpy).toHaveBeenCalledWith('test');
    });

    it('should register onTouched callback', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      const input = compiled.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });
});
