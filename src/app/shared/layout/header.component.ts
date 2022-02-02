import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models';

@Component( {
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class HeaderComponent implements OnInit {
  currentUser: User | {name:string};

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    this.currentUser = { name: 'Анононим' };
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      userData => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

  onLogOut() {
    this.userService.purgeAuth();
  }
}
