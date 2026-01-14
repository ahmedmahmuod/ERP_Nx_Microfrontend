import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <erp-card>
      <div card-header>Header Content</div>
      <div card-body>Body Content</div>
      <div card-footer>Footer Content</div>
    </erp-card>
  `
})
class TestHostComponent {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render card container', () => {
      const card = compiled.querySelector('.card');
      expect(card).toBeTruthy();
    });

    it('should render card body', () => {
      const cardBody = compiled.querySelector('.card-body');
      expect(cardBody).toBeTruthy();
    });

    it('should render header when hasHeader is true', () => {
      fixture.componentRef.setInput('hasHeader', true);
      fixture.detectChanges();
      
      const cardHeader = compiled.querySelector('.card-header');
      expect(cardHeader).toBeTruthy();
    });

    it('should not render header when hasHeader is false', () => {
      fixture.componentRef.setInput('hasHeader', false);
      fixture.detectChanges();
      
      const cardHeader = compiled.querySelector('.card-header');
      expect(cardHeader).toBeFalsy();
    });

    it('should render footer when hasFooter is true', () => {
      fixture.componentRef.setInput('hasFooter', true);
      fixture.detectChanges();
      
      const cardFooter = compiled.querySelector('.card-footer');
      expect(cardFooter).toBeTruthy();
    });

    it('should not render footer when hasFooter is false', () => {
      fixture.componentRef.setInput('hasFooter', false);
      fixture.detectChanges();
      
      const cardFooter = compiled.querySelector('.card-footer');
      expect(cardFooter).toBeFalsy();
    });
  });

  describe('Content Projection', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostCompiled: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent]
      }).compileComponents();

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostCompiled = hostFixture.nativeElement;
      
      // Set hasHeader and hasFooter to true
      const cardComponent = hostFixture.debugElement.children[0].componentInstance;
      cardComponent.hasHeader.set(true);
      cardComponent.hasFooter.set(true);
      hostFixture.detectChanges();
    });

    it('should project header content', () => {
      const cardHeader = hostCompiled.querySelector('.card-header');
      expect(cardHeader?.textContent).toContain('Header Content');
    });

    it('should project body content', () => {
      const cardBody = hostCompiled.querySelector('.card-body');
      expect(cardBody?.textContent).toContain('Body Content');
    });

    it('should project footer content', () => {
      const cardFooter = hostCompiled.querySelector('.card-footer');
      expect(cardFooter?.textContent).toContain('Footer Content');
    });
  });

  describe('Elevation', () => {
    it('should apply md elevation by default', () => {
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-md')).toBe(true);
    });

    it('should apply none elevation', () => {
      fixture.componentRef.setInput('elevation', 'none');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-none')).toBe(true);
    });

    it('should apply xs elevation', () => {
      fixture.componentRef.setInput('elevation', 'xs');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-xs')).toBe(true);
    });

    it('should apply sm elevation', () => {
      fixture.componentRef.setInput('elevation', 'sm');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-sm')).toBe(true);
    });

    it('should apply lg elevation', () => {
      fixture.componentRef.setInput('elevation', 'lg');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-lg')).toBe(true);
    });

    it('should apply xl elevation', () => {
      fixture.componentRef.setInput('elevation', 'xl');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-xl')).toBe(true);
    });

    it('should apply 2xl elevation', () => {
      fixture.componentRef.setInput('elevation', '2xl');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-elevation-2xl')).toBe(true);
    });
  });

  describe('Variants', () => {
    it('should apply default variant by default', () => {
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-default')).toBe(true);
    });

    it('should apply primary variant', () => {
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-primary')).toBe(true);
    });

    it('should apply secondary variant', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-secondary')).toBe(true);
    });

    it('should apply success variant', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-success')).toBe(true);
    });

    it('should apply warning variant', () => {
      fixture.componentRef.setInput('variant', 'warning');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-warning')).toBe(true);
    });

    it('should apply danger variant', () => {
      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-danger')).toBe(true);
    });

    it('should apply info variant', () => {
      fixture.componentRef.setInput('variant', 'info');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-info')).toBe(true);
    });

    it('should apply neutral variant', () => {
      fixture.componentRef.setInput('variant', 'neutral');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-variant-neutral')).toBe(true);
    });
  });

  describe('States', () => {
    it('should not be hoverable by default', () => {
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-hoverable')).toBe(false);
    });

    it('should apply hoverable class when hoverable is true', () => {
      fixture.componentRef.setInput('hoverable', true);
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-hoverable')).toBe(true);
    });

    it('should not be bordered by default', () => {
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-bordered')).toBe(false);
    });

    it('should apply bordered class when bordered is true', () => {
      fixture.componentRef.setInput('bordered', true);
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-bordered')).toBe(true);
    });

    it('should not be full height by default', () => {
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-full-height')).toBe(false);
    });

    it('should apply full height class when fullHeight is true', () => {
      fixture.componentRef.setInput('fullHeight', true);
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-full-height')).toBe(true);
    });
  });

  describe('Padding', () => {
    it('should apply md padding by default', () => {
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-padding-md')).toBe(true);
    });

    it('should apply none padding', () => {
      fixture.componentRef.setInput('padding', 'none');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-padding-none')).toBe(true);
    });

    it('should apply sm padding', () => {
      fixture.componentRef.setInput('padding', 'sm');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-padding-sm')).toBe(true);
    });

    it('should apply lg padding', () => {
      fixture.componentRef.setInput('padding', 'lg');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-padding-lg')).toBe(true);
    });

    it('should apply xl padding', () => {
      fixture.componentRef.setInput('padding', 'xl');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.classList.contains('card-padding-xl')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should set role attribute when provided', () => {
      fixture.componentRef.setInput('role', 'article');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.getAttribute('role')).toBe('article');
    });

    it('should set aria-label attribute when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'User profile card');
      fixture.detectChanges();
      
      const card = compiled.querySelector('.card');
      expect(card?.getAttribute('aria-label')).toBe('User profile card');
    });
  });
});
