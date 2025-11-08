import { Component, inject, OnInit } from '@angular/core';
import { UserService, IUser, IUserCart } from './user-service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private userService = inject(UserService);
  userDetail: IUser | undefined;
  userCardList: IUserCart[] = [];
  userId: number | undefined;

  ngOnInit(): void {
    this.userId = 6;
    this.getUserDetail();
  }

  getUserDetail() {
    if(!this.userId) return undefined;
    this.userService.getUserDetail(this.userId).subscribe({
      next: res => {
        this.userDetail = res
      },
    });
  }

  getUserCartList() {
    if(!this.userId) return undefined;
    this.userService.getUserCartList(this.userId).subscribe({
      next: res => {
        this.userCardList = res;
      },
    });
  }
}
