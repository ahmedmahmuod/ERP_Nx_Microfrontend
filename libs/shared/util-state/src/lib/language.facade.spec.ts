import { TestBed } from '@angular/core/testing';
import { LanguageFacade } from './language.facade';
import { TranslocoService } from '@jsverse/transloco';

describe('LanguageFacade', () => {
  let service: LanguageFacade;
  let translocoSpy: any;

  beforeEach(() => {
    translocoSpy = {
      setActiveLang: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        LanguageFacade,
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(LanguageFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language', () => {
    expect(service.activeLanguage()).toBe('en'); // Default logic
  });

  it('should set language', () => {
    service.setLanguage('ar');
    expect(service.activeLanguage()).toBe('ar');
    expect(translocoSpy.setActiveLang).toHaveBeenCalledWith('ar');
  });

  it('should persist language', () => {
    service.setLanguage('ar');
    expect(localStorage.getItem('erp_language')).toBe('ar');
  });
});
