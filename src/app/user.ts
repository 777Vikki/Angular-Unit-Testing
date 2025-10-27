import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private user = 'Vivek';

  getUserDetail(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/users/1').pipe(
      tap(d => {
        if(d?.id) {
          this.user = `${d.firstName} ${d.lastName}`;
        }
      })
    );
  }

  getUserName() {
    return this.user;
  }

  multiplyTwoNumber(a: number, b: number): number {
    return a * b;
  }
}
