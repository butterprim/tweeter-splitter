import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment.prod';
import { User } from '../core/models';
import { Tweet } from '../core/models/tweet';
import { TwitterUser } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class TweetService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  postTweet(tweet: string): Observable<Tweet> {
    const user: User = this.auth.user;
    if (user && user.accessToken) {
      return this.http.post<any>('http://127.0.0.1:8080/api/tweet', {
        params: {
          status: tweet,
          access_token: user.accessToken,
          access_token_secret: user.tokenSecret,
        },
      }).map((response: {data: Tweet, resp: any}) => {
        return response.data;
      });
    }
    return Observable.of(null);
  }

  getTweets(): Observable<Tweet[]> {
    const user: User = this.auth.user;
    if (user && user.accessToken) {
      return this.http.get<any>('http://127.0.0.1:8080/api/user-timeline', {
        params: {
          user_id: user.twitterData.id_str,
          screen_name: user.twitterData.screen_name,
          access_token: user.accessToken,
          access_token_secret: user.tokenSecret,
        },
      }).map((response: {data: Tweet[], resp: any}) => {
        return response.data;
      });
    }
    return Observable.of([]);
  }

  verifyCredentials(force: boolean = false): Observable<TwitterUser> {
    const user: User = this.auth.user;
    if (user && user.accessToken) {
      if (user.twitterData && !force) {
        return Observable.of(user.twitterData);
      }
      return this.http.get<any>('http://127.0.0.1:8080/api/user', {
        params: {
          access_token: user.accessToken,
          access_token_secret: user.tokenSecret,
        },
      }).map((response: {data: TwitterUser, resp: any}) => {
        this.auth.user.twitterData = response.data;
        return response.data;
      });
    }
    return Observable.of(null);
  }

}
