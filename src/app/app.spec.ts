import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 2 controls', () => {
    expect(component.userForm?.contains('name')).toBeTrue(); 
    expect(component.userForm?.contains('email')).toBeTrue(); 
  }); 

  it('should make name control required', () => {
    const nameControl = component.userForm?.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.errors?.['required']).toBeTrue();
    nameControl?.setValue('Vivek');
    expect(nameControl?.valid).toBeTrue();
    expect(nameControl?.errors?.['required']).toBe(undefined);
  });

  it('should validate email format', () => {
    const emailControl = component.userForm?.get('email');
    emailControl?.setValue('InvalidEmail');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('vivek@vk.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should make form valid when all fields are correct', () => {
    component.userForm?.setValue({
      name: 'Vivek',
      email: 'vivek@vk.com',
    });
    expect(component.userForm?.valid).toBeTrue();
  });
});
