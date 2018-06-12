import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  private authSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar,
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.signInWithTwitter().then(() => {
      this.router.navigate(['/tweeter']);
    }).catch((error) => {
      this.snack.open(error.message, 'Dismiss', {
        duration: 4000,
      });
    });
  }

}
