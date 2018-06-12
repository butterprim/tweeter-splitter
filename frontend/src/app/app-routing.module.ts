import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services';
import { SessionGuard } from './core/services/session-guard.service';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { DemoPageComponent } from './tweet/demo-page/demo-page.component';
import { TweetPageComponent } from './tweet/tweet-page/tweet-page.component';

const routes: Routes =  [
  {
    path: 'tweeter',
    component: TweetPageComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'demo',
    component: DemoPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ SessionGuard ],
  },
  {
    path: '',
    redirectTo: '/login' ,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
