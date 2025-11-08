import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService, IUser, IUserCart } from './user-service';
import { of } from 'rxjs';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let userService: UserService;

  const mockUserDetail: IUser = {
    "id": 6,
    "firstName": "Olivia",
    "lastName": "Wilson",
    "age": 22,
    "company": {
      "department": "Product Management",
      "name": "Pfannerstill Inc",
      "address": {
        "city": "Indianapolis",
        "state": "Oklahoma"
      }
    }
  };
  const mockUserCartList: IUserCart[] = [
    {
      "id": 24,
      "products": [
        {
          "id": 108,
          "title": "iPhone 12 Silicone Case with MagSafe Plum",
          "price": 29.99,
          "quantity": 5
        },
        {
          "id": 134,
          "title": "Vivo S1",
          "price": 249.99,
          "quantity": 4
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getUserDetail from UserService', () => {
    const spy = spyOn(userService, 'getUserDetail').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(mockUserDetail.id);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call getUserCartList from UserService', () => {
    const spy = spyOn(userService, 'getUserCartList').and.returnValue(of(mockUserCartList));
    component.getUserCartList();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(mockUserDetail.id);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return user detail when getUserDetail is called', () => {
    const spy = spyOn(userService, 'getUserDetail').and.returnValue(of(mockUserDetail));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(mockUserDetail.id);
    expect(component.userDetail).toEqual(mockUserDetail);
  });

  it('should return user cart list when getUserCartList is called', () => {
    const spy = spyOn(userService, 'getUserCartList').and.returnValue(of(mockUserCartList));
    component.getUserCartList();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(mockUserDetail.id);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.userCardList).toEqual(mockUserCartList);
  });
});
