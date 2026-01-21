import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NavigationFacadeService } from '../../../core/services/navigation-facade.service';
import { RouteContextService } from '../../../core/services/route-context.service';
import { CompanyFacade } from '@erp/shared/util-state';

describe('HeaderComponent i18n', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const layoutServiceMock = {
      toggleSidebar: vi.fn(),
      toggleTheme: vi.fn(),
      isDark: signal(false),
    };

    const navigationFacadeMock = {
      sidebarTitle: signal('Assemble ERP'),
      activeAppId: signal('shell'),
      activeManifest: signal(null),
    };

    const routeContextMock = {
      isInRemoteArea: signal(false),
      navigateToHome: vi.fn(),
    };

    const companyFacadeMock = {
      activeCompany: signal({ name: 'Test Company' }),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        provideTranslocoConfig(),
        { provide: LayoutService, useValue: layoutServiceMock },
        { provide: NavigationFacadeService, useValue: navigationFacadeMock },
        { provide: RouteContextService, useValue: routeContextMock },
        { provide: CompanyFacade, useValue: companyFacadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
