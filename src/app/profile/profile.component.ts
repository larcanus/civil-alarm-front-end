import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../core/services/user.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Errors, User } from "../core/models";

@Component( {
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
} )
export class ProfileComponent implements OnInit {
  isSubmitting = false;
  profileForm: FormGroup;
  user: User = {} as User;
  errors: Errors = { errors: {} };
  isPswEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.profileForm = this.fb.group( {
      'name': '',
      'email': '',
      'password_1': '',
      'password_2': '',
    } );
  }

  ngOnInit(): void {
    Object.assign( this.user, this.userService.getCurrentUser() );

    this.profileForm.setValue( {
      'name': this.user.name,
      'email': this.user.email,
      'password_1': '',
      'password_2': '',
    } )
    this.cd.markForCheck();
  }

  submitForm() {
    this.errors = { errors: {} };
    const credentials = this.profileForm.value;
    if ( credentials.email !== '' && credentials.name !== '' ) {
      if ( this.isPswEdit ) {
        if ( credentials.password_1 !== '' && credentials.password_1 === credentials.password_2 ) {
          this.updateUser( this.profileForm.value );
          this.user.password = credentials.password_1;


          this.userService.update( this.user ).subscribe(
            updatedUser => {
              this.isSubmitting = true;
              this.router.navigateByUrl( '/profile' )
            },
            err => {
              this.errors = err;
              this.isSubmitting = false;
              this.cd.markForCheck();
            }
          );
        } else {
          this.errors = { errors: { '': 'пароли не совпадают' } };
        }

      } else {
        this.updateUser( this.profileForm.value );
        this.userService.update( this.user ).subscribe(
          updatedUser => {
            this.isSubmitting = true;
            this.router.navigateByUrl( '/profile' )
          },
          err => {
            this.errors = err;
            this.isSubmitting = false;
            this.cd.markForCheck();
          }
        );
      }
    } else {
      this.errors = { errors: { '': 'пустые поля не лучший вариант' } };
    }
  }

  updateUser( values: Object ) {
    Object.assign( this.user, values );
  }

}
