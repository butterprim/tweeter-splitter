import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import { TwitterUser } from '../../core/models';
import { Tweet } from '../../core/models/tweet';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.scss']
})
export class TweetPageComponent implements OnInit {

  postedTweets: Tweet[] = [];
  isLoadingTweets = false;
  disableTweeting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tweetService: TweetService,
  ) { }

  ngOnInit() {
  }

  loadPreviousTweets() {
    this.isLoadingTweets = true;
    this.tweetService.verifyCredentials()
    .subscribe((user: TwitterUser) => {
      this.tweetService.getTweets()
      .subscribe((tweets: Tweet[]) => {
        this.postedTweets = tweets;
        this.isLoadingTweets = false;
      });
    });
  }

  postTweets(tweets: string[]) {
    if (tweets != null && tweets.length > 0) {
      this.disableTweeting = true;
      // Chaining our requests so we're sure the tweets are posted sequentially
      let tweetRequest: Observable<Tweet> = Observable.of(null);
      tweets.forEach((tweet: string) => {
        tweetRequest = tweetRequest.flatMap((postedTweet) => {
          return this.postToTwitter(tweet);
        });
      });
      // Run the requests!
      tweetRequest.subscribe(() => {
        this.disableTweeting = false;
      }, (error) => {
        this.disableTweeting = false;
      });
    }
  }

  private postToTwitter(tweet: string): Observable<Tweet> {
    return this.tweetService.postTweet(tweet)
    .map((postedTweet: Tweet) => {
      if (postedTweet) {
        this.postedTweets.unshift(postedTweet);
      }
      return postedTweet;
    });
  }

}
