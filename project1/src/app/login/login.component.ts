import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MESSAGES } from '../../const/notify-messages';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email = '';
  public password = '';

  constructor(private authService: AuthService,
              private router: Router,
              private notify: NotificationService) {
  }

  ngOnInit(): void {
    const loggedIn = this.authService.isLoggedIn();
    if (!loggedIn) {
      this.router.navigate(['/']);
    }
  }

  login(): any {
    console.log('Email & password:  ', this.email + ' : ' + this.password);
    this.authService.emailLogin(this.email, this.password)
      .then((res) => {
        console.log(res);
        localStorage.setItem('jwt-token', res.token);
        this.notify.update(MESSAGES.LOGIN_SUCCESS, 'success');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
        this.notify.update(MESSAGES.LOGIN_FAILED, 'error');
      });
  }

  isFormValid(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }

  register(): any {
    this.router.navigate(['/register']);
  }
}
