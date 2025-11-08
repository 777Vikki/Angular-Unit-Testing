import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface IUserCart {
  id: number;
  products: IProduct[];
}

export interface ICard {
  carts: IUserCart[];
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  company: {
    department: string;
    name: string;
    address: {
      city: string;
      state: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private mapUserDetail(user: IUser): IUser {
    const userDetail: IUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      company: {
        department: user.company.department,
        name: user.company.name,
        address: {
          city: user.company.address.city,
          state: user.company.address.state,
        }
      }
    }
    return userDetail;
  }

  private mapCardDetail(cardDetail: ICard): IUserCart[] {
    const carts: IUserCart[] = cardDetail.carts.map(d => {
      const cardData: IUserCart = {
        id: d.id,
        products: d.products.map(p => {
          const product: IProduct = {
            id: p.id,
            title: p.title,
            price: p.price,
            quantity: p.quantity,
          }
          return product
        }),
      }
      return cardData;
    });

    return carts;
  }

  getUserDetail(id: number): Observable<IUser> {
    return this.http.get<IUser>('https://dummyjson.com/users/' + id).pipe(map(this.mapUserDetail));
  }

  getUserCartList(id: number): Observable<IUserCart[]> {
    return this.http.get<ICard>('https://dummyjson.com/users/' + id + '/carts').pipe(map(this.mapCardDetail))
  }

  updateUserCard(products: IProduct[]) {
    console.log(products);
  }
}
