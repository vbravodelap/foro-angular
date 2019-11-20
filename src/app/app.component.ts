import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './sevices/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'foro-angular';
  public identity: any;
  public token: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngDoCheck() {
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    console.log(this.identity);
    console.log(this.token);
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.router.navigate(['/home']);
  }
}
