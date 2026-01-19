import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilI18n } from './util-i18n';

describe('UtilI18n', () => {
  let component: UtilI18n;
  let fixture: ComponentFixture<UtilI18n>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilI18n]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilI18n);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
