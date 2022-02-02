import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../core/services/user.service';
import { Errors } from '../core/models';

@Component( {
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.authForm = this.fb.group( {
      'email': [ '', Validators.required ],
      'password': [ '', Validators.required ]
    } );
  }

  ngOnInit() {
    this.route.url.subscribe( data => {
      this.authType = data[ data.length - 1 ].path;
      this.title = ( this.authType === 'login' ) ? 'Вход' : 'Регистрация';
      if ( this.authType === 'register' ) {
        this.authForm.addControl( 'name', new FormControl() );
      }
      this.cd.markForCheck();
    } );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };
    const credentials = this.authForm.value;

    this.userService
      .attemptAuth( this.authType, credentials )
      .subscribe(
        data => this.router.navigateByUrl( '/filters' ),
        err => {
          if ( err.message[ 0 ] === 'name should not be empty' ) {
            err.message = 'стоит заполнить имя';
          }
          if ( err.message[ 0 ] === 'email must be an email' ) {
            err.message = 'email введен некорректно';
          }

          this.errors = { errors: { [ '' ]: `${ err.message }` } };

          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }
}
