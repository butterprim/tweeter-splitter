import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { MaterialModule } from '../shared/material/material.module';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { TweetPageComponent } from './tweet-page/tweet-page.component';
import { TweetService } from './tweet.service';
import { TweeterComponent } from './tweeter/tweeter.component';
import { TweetsListComponent } from './tweets-list/tweets-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    MomentModule,
  ],
  exports: [
    TweeterComponent,
    TweetsListComponent,
  ],
  declarations: [
    TweeterComponent,
    TweetsListComponent,
    TweetPageComponent,
    DemoPageComponent,
  ],
  entryComponents: [
    TweetPageComponent,
    DemoPageComponent,
  ],
  providers: [
    TweetService,
  ],
})
export class TweetModule { }
