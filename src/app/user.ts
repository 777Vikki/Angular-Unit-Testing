import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private user = 'Vivek';

  getUserDetail(id: number): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/users/' + id).pipe(
      tap(d => {
        if(d?.id) {
          console.log(d);
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
