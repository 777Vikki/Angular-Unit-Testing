  import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { UserComponent } from './user-component';
  import { UserService } from '../user';
  import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

  describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserComponent],
        providers: [provideHttpClient(), provideHttpClientTesting()]
      })
        .compileComponents();

      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      userService = TestBed.inject(UserService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call getUserDetail(1) and set userDetail', () => {
      const mockResponse = {
        "id": 1,
        "firstName": "Emily",
        "lastName": "Johnson",
        "maidenName": "Smith",
        "age": 28,
        "gender": "female",
        "email": "emily.johnson@x.dummyjson.com",
        "phone": "+81 965-431-3024",
        "username": "emilys",
        "password": "emilyspass",
        "birthDate": "1996-5-30",
        "image": "https://dummyjson.com/icon/emilys/128",
        "bloodGroup": "O-",
        "height": 193.24,
        "weight": 63.16,
        "eyeColor": "Green",
        "hair": {
          "color": "Brown",
          "type": "Curly"
        },
        "ip": "42.48.100.32",
        "address": {
          "address": "626 Main Street",
          "city": "Phoenix",
          "state": "Mississippi",
          "stateCode": "MS",
          "postalCode": "29112",
          "coordinates": {
            "lat": -77.16213,
            "lng": -92.084824
          },
          "country": "United States"
        },
        "macAddress": "47:fa:41:18:ec:eb",
        "university": "University of Wisconsin--Madison",
        "bank": {
          "cardExpire": "03/26",
          "cardNumber": "9289760655481815",
          "cardType": "Elo",
          "currency": "CNY",
          "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        "company": {
          "department": "Engineering",
          "name": "Dooley, Kozey and Cronin",
          "title": "Sales Manager",
          "address": {
            "address": "263 Tenth Street",
            "city": "San Francisco",
            "state": "Wisconsin",
            "stateCode": "WI",
            "postalCode": "37657",
            "coordinates": {
              "lat": 71.814525,
              "lng": -161.150263
            },
            "country": "United States"
          }
        },
        "ein": "977-175",
        "ssn": "900-590-289",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
        "crypto": {
          "coin": "Bitcoin",
          "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
          "network": "Ethereum (ERC20)"
        },
        "role": "admin"
      }

      const spy = spyOn(userService, 'getUserDetail').and.returnValue(of(mockResponse));
      component.ngOnInit();

      expect(spy).toHaveBeenCalledWith(1); // OR expect(userService.getUserDetail).toHaveBeenCalledWith(1);
      expect(component.userDetail).toEqual(mockResponse);
    });

    it('should call getUserName from service', () => {
      const spy = spyOn(userService, 'getUserName').and.callThrough();

      component.getUserName();

      expect(spy).toHaveBeenCalled();
    });

    it('should call multiplyTwoNumber(5, 13) from service', () => {
      const spy = spyOn(userService, 'multiplyTwoNumber').and.callThrough();

      component.multiplyTwoNumber();

      expect(spy).toHaveBeenCalledWith(5, 13);
    });
  });
