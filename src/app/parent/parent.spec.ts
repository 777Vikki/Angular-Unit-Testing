import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parent } from './parent';
import { By } from '@angular/platform-browser';
import { Child } from '../child/child';

describe('Parent', () => {
  let component: Parent;
  let fixture: ComponentFixture<Parent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass name to child component via @Input', () => {
    // find child component
    const childDebugElement = fixture.debugElement.query(By.directive(Child));
    const childComponent = childDebugElement.componentInstance as Child;

    // assert input value
    expect(childComponent.userName).toBe('Vivek');
  });

  it('should update child when name changes dynamically', () => {
    const childDebugElement = fixture.debugElement.query(By.directive(Child));
    const childComponent = childDebugElement.componentInstance;

    // change parent property
    component.name = 'Mohit';
    fixture.detectChanges();

    expect(childComponent.userName).toBe('Mohit');
  });
});
