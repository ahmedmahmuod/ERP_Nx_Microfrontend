import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilState } from './util-state';

describe('UtilState', () => {
  let component: UtilState;
  let fixture: ComponentFixture<UtilState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilState]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
