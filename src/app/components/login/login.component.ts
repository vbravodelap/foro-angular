import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../sevices/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public identity: string;
  public token: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pageTitle = 'Registrate';
    this.user = new User('','','','','','','ROLE-USER');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.userService.signup(this.user).subscribe( response => {
      if (response.user && response.user._id) {
        this.identity = response.user;
        localStorage.setItem('identity', JSON.stringify(this.identity));

        this.userService.signup(this.user, true).subscribe( res => {
          if (res.token) {
            this.token = res.token;
            localStorage.setItem('session_token', this.token);
            this.status = 'success';
            this.router.navigate(['/home']);
          } else {
            this.status = 'error';
          }

        }, error => {
          this.status = 'error';
        });

      } else {
        this.status = 'error';
      }

      form.reset();
    }, error => {
      this.status = 'error';
    });
  }

}
