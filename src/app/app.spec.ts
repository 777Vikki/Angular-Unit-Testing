import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { IProduct, IUser, IUserCart, UserService } from './user-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

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

    const spy = jasmine.createSpyObj(UserService, ['getUserDetail', 'getUserCartList', 'updateUserCard']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: UserService, useValue: spy }, provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return user detail when getUserDetail is called', () => {
    userServiceSpy.getUserDetail.and.returnValue(of(mockUserDetail));
    component.userId = mockUserDetail.id;
    fixture.detectChanges();
    expect(userServiceSpy.getUserDetail).toHaveBeenCalledWith(component.userId);
    expect(userServiceSpy.getUserDetail).toHaveBeenCalled();
    expect(userServiceSpy.getUserDetail).toHaveBeenCalledTimes(1);
    expect(component.userDetail).toEqual(mockUserDetail);
  });

  it('should return user cart list when getUserCartList is called', () => {
    component.userId = mockUserDetail.id;
    userServiceSpy.getUserCartList.and.returnValue(of(mockUserCartList)); // ✅ mock return
    component.getUserCartList();
    expect(userServiceSpy.getUserCartList).toHaveBeenCalledWith(component.userId);
    expect(userServiceSpy.getUserCartList).toHaveBeenCalled();
    expect(userServiceSpy.getUserCartList).toHaveBeenCalledTimes(1);
    expect(component.userCardList).toEqual(mockUserCartList);
  });

  it('should call updateUserCard from UserService', () => {
    userServiceSpy.updateUserCard.and.callThrough();
    const products = mockUserCartList[0].products;
    component.updateUserCard(products);
    expect(userServiceSpy.updateUserCard).toHaveBeenCalledWith(products);
    expect(userServiceSpy.updateUserCard).toHaveBeenCalled();
    expect(userServiceSpy.updateUserCard).toHaveBeenCalledTimes(1);
  });
});
