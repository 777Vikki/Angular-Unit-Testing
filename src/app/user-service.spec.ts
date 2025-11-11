import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { IUser, IUserCart, UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures no pending requests are left open
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user detail successfully', () => {
    service.getUserDetail(1).subscribe((data) => {
      expect(data).toEqual(mockUserDetail);
    });

    const req = httpMock.expectOne('https://dummyjson.com/users/1');
    expect(req.request.method).toBe('GET');

    // Provide mock response
    req.flush(mockUserDetail);
  });

  it('should handle user detail error response', () => {
    const mockError = { message: 'Not Found' };

    service.getUserDetail(1).subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => {
        console.log(error);
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne('https://dummyjson.com/users/1');

    // Simulate backend 404 error
    req.flush(mockError, { status: 404, statusText: 'Not Found' });
  });
});
