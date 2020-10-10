import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public fullName = '';
  public email = '';
  public password = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register(): any {
    console.log('User details: ', this.fullName + ' ' + this.email + ' ' + this.password);
    this.authService.emailSignUp(this.email, this.password, this.fullName)
      .then((res) => {
        localStorage.setItem('jwt-token', res.token);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isFormValid(): boolean {
    return this.email.length > 0 && this.password.length > 0 && this.fullName.length > 0;
  }

  login(): any {
    this.router.navigate(['/login']);
  }

  resetPassword(): any {
    this.router.navigate(['/reset-password']);
  }

}
