import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LanguageFacade } from '@erp/shared/util-state';
import { TranslocoService } from '@jsverse/transloco';

describe('LoginComponent i18n', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let languageFacade: LanguageFacade;
  let transloco: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideTranslocoConfig(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    languageFacade = TestBed.inject(LanguageFacade);
    transloco = TestBed.inject(TranslocoService);
    fixture.detectChanges();
  });

  it('should switch direction to RTL when language is ar', () => {
    languageFacade.setLanguage('ar');
    fixture.detectChanges();

    expect(document.documentElement.dir).toBe('rtl');
  });

  it('should switch direction to LTR when language is en', () => {
    languageFacade.setLanguage('en');
    fixture.detectChanges();

    expect(document.documentElement.dir).toBe('ltr');
  });

  it('should update active language in Transloco when switched', () => {
    languageFacade.setLanguage('ar');
    expect(transloco.getActiveLang()).toBe('ar');

    languageFacade.setLanguage('en');
    expect(transloco.getActiveLang()).toBe('en');
  });
});
