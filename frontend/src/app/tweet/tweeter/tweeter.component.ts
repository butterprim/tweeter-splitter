import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tweeter',
  templateUrl: './tweeter.component.html',
  styleUrls: ['./tweeter.component.scss']
})
export class TweeterComponent implements OnInit {

  totalPageCharLength = 0;
  errorMessage = '';
  @Input() max = environment.maxTweetLength;
  @Input() isDisabled = false;
  @Output() newTweets = new EventEmitter<string[]>();
  @ViewChild('tweetarea') tweetarea: ElementRef;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  /**
   * Calls the splitting function and emits an array of tweets resulting from the split.
   *
   * @param tweetToPost - string to be posted
   */
  addTweet(tweetToPost: string) {
    try {
      const splittedTweets = this.processTweetSplitting(tweetToPost);
      this.newTweets.emit(splittedTweets);
      this.tweetarea.nativeElement.value = '';
      this.errorMessage = '';
    } catch (e) {
      this.errorMessage = e.message;
    }
  }

  /**
   * Handles errors from the splitting and returns the arrays of tweets.
   *
   * @param tweetToSplit - string to be splitted
   */
  processTweetSplitting(tweetToSplit: string): string[] {
    if (tweetToSplit == null) {
      throw Error('There\'s no input!');
    }

    tweetToSplit = tweetToSplit.trim().replace(/\s+/g, ' ');
    if (tweetToSplit.length === 0) {
      throw Error('Invalid input! Can\'t tweet an empty string.');
    }

    let splittedTweets = [];
    this.totalPageCharLength = 1;

    if (tweetToSplit.length <= this.max) {
      splittedTweets.push(tweetToSplit);
    } else {
      splittedTweets = this.splitTweet(tweetToSplit.split(' '), [], tweetToSplit.split(' '));
    }

    return splittedTweets;
  }

  /**
   * Performs backtracking to fit words and pages within the maximum character length.
   * Backtracking is triggered when the total page's character length increases,
   *  ex. from 9 to 10, from 99 to 100, from 999 to 1000
   *
   * @param wordsRemaining - words that have not been included in the splitted tweets;
   *                         also referred to in the function as the bank of words
   * @param splittedTweets - list of word arrays that are 'marked' as splitted
   * @param allWords - all the words from the original unsplitted tweet
   */
  private splitTweet(wordsRemaining: string[], splittedTweets: string[][], allWords: string[]): string[] {
    const wordsInTweet: string[] = [];
    let wordCount = 0;
    // while the formed tweet has not exceeded the maximum, add another word in
    while (this.getLengthOfTweet(wordsInTweet, splittedTweets.length + 1) <= this.max && wordCount < wordsRemaining.length) {
      wordsInTweet.push(wordsRemaining[wordCount]);
      wordCount++;
    }
    // check the final form of the tweet, if it overflowed, pop the last word out
    if (this.getLengthOfTweet(wordsInTweet, splittedTweets.length + 1) > this.max) {
      wordsInTweet.pop();
    }
    // remove the words used in the newly formed tweet from the word bank
    wordsRemaining.splice(0, wordsInTweet.length);
    // add the newly formed tweet into our list of splitted tweets
    splittedTweets.push(wordsInTweet);
    // if the tweet is empty even though our bank still has words,
    // then there must be a really long word there that can't fit with the pages
    if (wordsInTweet.length === 0 && wordsRemaining.length > 0) {
      throw new Error('Invalid input! Your tweet can\'t be split into smaller tweets.');
    }
    // if the thread length's string length has gone up, we have to fit in the words from the start
    if (('' + splittedTweets.length).length > this.totalPageCharLength) {
      this.totalPageCharLength++;
      return this.splitTweet(allWords, [], allWords);
    }
    // if there are no more words remaining, then it's done
    if (wordsRemaining.length === 0) {
      const formedTweets = [];
      const totalPages = splittedTweets.length;
      splittedTweets.forEach((_words: string[], index: number) => {
        // let's form our splitted words into actual tweets
        formedTweets.push(this.formTweetFromSplit(_words, index + 1, totalPages));
      });
      return formedTweets;
    }
    return this.splitTweet(wordsRemaining, splittedTweets, allWords);
  }

  /**
   * Gets the character length of the tweet based on the number of words,
   *  the page number and the total pages' character length.
   *
   * Example: ['I', 'like', 'apples'] on page number 8, with total pages of 12
   *  Expected tweet should look like: '8/12 I like apples' (18)
   *  Computed length should be:
   *    = length of each word + number of words
   *      + 1 + page number length + total page number length
   *    = 1 + 4 + 6 + 3 + 1 + 1 + 2
   *    = 18
   *
   * @param wordsInTweet - list of words included in the tweet
   * @param pageNumber - the nth tweet from the splitted tweets
   */
  private getLengthOfTweet(wordsInTweet: string[], pageNumber: number): number {
    let wordsLength = 0;
    wordsInTweet.forEach((element: string) => {
      wordsLength += element.length;
    });
    wordsLength = wordsLength + wordsInTweet.length; // including extra space after the page
    return wordsLength + ('' + pageNumber).length + 1 + this.totalPageCharLength;
  }

  /**
   * Forms the actual tweet in string format based on the words,
   * page number and total pages.
   *
   * @param wordsInTweet - words included in the tweet
   * @param pageNumber - indicates that this is the nth tweet from the splitted tweets
   * @param totalPages - total number of splitted tweets
   */
  private formTweetFromSplit(wordsInTweet: string[], pageNumber: number, totalPages: number): string {
    return '' + pageNumber + '/' + totalPages + ' ' + wordsInTweet.join(' ');
  }

}
