import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCompanyComponent } from './select-company.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { CompanyFacade } from '@erp/shared/util-state';
import { signal } from '@angular/core';

describe('SelectCompanyComponent', () => {
  let component: SelectCompanyComponent;
  let fixture: ComponentFixture<SelectCompanyComponent>;
  let mockCompanyFacade: jasmine.SpyObj<CompanyFacade>;

  beforeEach(async () => {
    // Create mock facade
    mockCompanyFacade = jasmine.createSpyObj('CompanyFacade', [
      'loadCompanies',
      'setCompany',
    ]);
    mockCompanyFacade.companies = signal([
      { id: '1', name: 'Company A', logo: 'pi-building' },
      { id: '2', name: 'Company B', logo: 'pi-building' },
    ]);
    mockCompanyFacade.isLoading = signal(false);

    await TestBed.configureTestingModule({
      imports: [SelectCompanyComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideTranslocoConfig(),
        { provide: CompanyFacade, useValue: mockCompanyFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load companies on init', () => {
    expect(mockCompanyFacade.loadCompanies).toHaveBeenCalled();
  });

  it('should display companies from facade', () => {
    expect(component.companies().length).toBe(2);
    expect(component.companies()[0].name).toBe('Company A');
  });

  it('should set company and navigate on confirm', () => {
    component.selectedCompanyId.set('1');
    const locationSpy = spyOn(window.location, 'href', 'set');

    component.confirmSelection();

    expect(mockCompanyFacade.setCompany).toHaveBeenCalledWith('1');
  });

  it('should not confirm selection if no company selected', () => {
    component.selectedCompanyId.set(null);

    component.confirmSelection();

    expect(mockCompanyFacade.setCompany).not.toHaveBeenCalled();
  });
});
