import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { SessionService } from '../../shared/services/session/session.service';
import { NotificationType } from '@custom-types/notification.enum';
import { GENERIC_ERROR_MESSAGE } from '@config/messages';
import * as _ from 'lodash';

type Step = 'login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  step: Step = 'login';
  loading = false;
  loginForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private session: SessionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      isRememberMeChecked: [''],
    });
  }

  login() {
    console.log(this.loginForm.getRawValue())
    if (!this.loginForm.valid) {
      return;
    }

    this.loading = true;

    let data = this.loginForm.getRawValue();
    data = _.omit(data, 'isRememberMeChecked');
    this.auth.login(data).subscribe({
      next: (res: any) => {
        res = res.data;
        if (res.status === 0) {
          this.loading = false;
          // alert('Invalid Credentials.');
          // this.snackBar.open('Invalid Credentials.', 'Close', {
          //   duration: 2000,
          //   panelClass: ['custom-style'],
          //   verticalPosition: 'top',
          //   horizontalPosition: 'center',
          // });
          return;
        }
        if (res) {
          console.log(res)
          this.session.init(res);
        }
      },
      error: (err: any) => {
        this.loading = false;
        try {
          err = err.error.errors[0].message;
        } catch (error) {
          err = GENERIC_ERROR_MESSAGE;
        }
        // this.notificationService.openSnackBar({
        //   type: NotificationType.ERROR,
        //   message: err,
        // });
      },
    });
  }

  forgot(event: MouseEvent) {
    event.stopPropagation();
  }

}
