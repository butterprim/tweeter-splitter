import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { environment } from '../../../environments/environment';
import { TwitterUser, User } from '../models/user';

@Injectable()
export class AuthService {

  private _user: User;
  private userDetails: firebase.User = null;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private readonly STORAGE_KEY = 'tweeter.splitter.user';

  constructor(
    private firebaseAuth: AngularFireAuth,
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  ) {
  }

  get user() {
    if (this._user == null) {
      this._user = this.storage.get(this.STORAGE_KEY);
      if (this._user) {
        this.isAuthenticatedSubject.next(true);
      }
    }
    return this._user;
  }

  set user(_user: User) {
    this._user = _user;
  }

  addTwitterData(twitterData: TwitterUser) {
    this.user.twitterData = twitterData;
    this.storage.set(this.STORAGE_KEY, this.user);
  }

  signInWithTwitter(): Promise<User> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    ).then((result) => {
      this.user = new User();
      this.user.accessToken = result.credential.accessToken;
      this.user.tokenSecret = result.credential.secret;

      this.storage.set(this.STORAGE_KEY, this.user);
      this.isAuthenticatedSubject.next(true);
      return this.user;
    });
  }

  logout(): Promise<void> {
    return this.firebaseAuth.auth.signOut().then(() => {
      this.removeUser();
      this.isAuthenticatedSubject.next(false);
    });
  }

  private removeUser() {
    this.user = null;
    this.userDetails = null;
    this.storage.remove(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }
}
