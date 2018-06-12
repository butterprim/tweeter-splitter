import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StorageServiceModule } from 'angular-webstorage-service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { TweetModule } from './tweet/tweet.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StorageServiceModule,
    CoreModule.forRoot(),
    SharedModule,
    TweetModule,
    LoginModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
