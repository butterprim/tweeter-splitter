import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment.prod';
import { Tweet } from '../../core/models/tweet';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent implements OnInit {

  postedTweets: Tweet[] = [];
  disableTweeting = false;
  maxLength = environment.maxTweetLength;
  maxLengthOptions = [10, 30, 50, 70];

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  postTweets(tweets: string[]) {
    if (tweets != null && tweets.length > 0) {
      this.disableTweeting = true;
      tweets.forEach((tweet) => {
        this.postedTweets.unshift({
          id: null,
          id_str: null,
          created_at: new Date().toISOString(),
          text: tweet,
          truncated: false,
          user: this.getUserName(),
          is_quote_status: false,
          retweeted: false,
        });
      });
      this.disableTweeting = false;
    }
  }

  private getUserName() {
    if (this.auth.user && this.auth.user.twitterData) {
      return this.auth.user.twitterData;
    }
    return null;
  }
}
