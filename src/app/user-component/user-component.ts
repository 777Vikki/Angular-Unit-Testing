import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user';

@Component({
  selector: 'app-user-component',
  imports: [],
  templateUrl: './user-component.html',
  styleUrl: './user-component.scss',
})
export class UserComponent implements OnInit{
  private userService = inject(UserService);
  userDetail: any;

  ngOnInit(): void {
    this.userService.getUserDetail(1)
      .subscribe(d => {
        this.userDetail = d;
      });
  }

  getUserName() {
    this.userService.getUserName();
  }

  multiplyTwoNumber() {
    this.userService.multiplyTwoNumber(5, 13);
  }
}
