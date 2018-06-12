import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Tweet } from '../../core/models/tweet';
import { TwitterUser } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.scss']
})
export class TweetsListComponent implements OnInit {

  isLoggedIn = true;
  isLoadingTweets = false;
  tweetsLoaded = false;
  @Input() tweets: Tweet[];
  @Output() tweetsChange = new EventEmitter<Tweet[]>();

  constructor(
    private tweetService: TweetService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  loadPreviousTweets() {
    this.isLoadingTweets = true;
    this.tweetService.verifyCredentials()
    .subscribe((user: TwitterUser) => {
      this.tweetService.getTweets()
      .subscribe((tweets: Tweet[]) => {
        this.tweets = tweets;
        this.tweetsChange.emit(this.tweets);
        this.isLoadingTweets = false;
        this.tweetsLoaded = true;
      });
    });
  }

}
