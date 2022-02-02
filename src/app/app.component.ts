import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from "./core/services/user.service";

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent implements OnInit {
  constructor( private userService: UserService ) {
  }

  ngOnInit() {
    this.userService.populate();
  }
}
