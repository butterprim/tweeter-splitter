import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { MaterialModule } from '../../shared/material/material.module';
import { TweeterComponent } from './tweeter.component';

describe('TweeterComponent', () => {
  let component: TweeterComponent;
  let fixture: ComponentFixture<TweeterComponent>;
  let snackBarStub: Partial<MatSnackBar>;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    snackBarStub = {
      open: (message, action, config) => {
        return null;
      },
    };

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [ TweeterComponent ],
      providers: [{
        provide: MatSnackBar, useValue: snackBarStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweeterComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stub object and injected MatSnackBar should not be the same', () => {
    expect(snackBarStub === snackBar).toBe(false);
  });

  it('should return the tweet with less than max char as is', () => {
    const text = 'This is a tweet.';
    const tweets: string[] = component.processTweetSplitting(text);
    expect(tweets.length).toEqual(1);
    expect(tweets[0]).toEqual(text);
  });

  it('should throw an error when tweeting whitespace only', () => {
    const text = '                           ';
    expect(() => {
      component.processTweetSplitting(text);
    }).toThrowError('Invalid input! Can\'t tweet an empty string.');
  });

  it('should get rid of white space when tweeting', () => {
    const text = '          Hello         there        ';
    const tweets: string[] = component.processTweetSplitting(text);
    expect(tweets.length).toEqual(1);
    expect(tweets[0]).toEqual('Hello there');
  });

  it('should throw an error when tweeting a very long word', () => {
    const text = 'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc';
    expect(() => {
      component.processTweetSplitting(text);
    }).toThrowError('Invalid input! Your tweet can\'t be split into smaller tweets.');
  });

  it('should throw an error when tweeting something with a long word', () => {
    const text = 'abc abc abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcab';
    expect(() => {
      component.processTweetSplitting(text);
    }).toThrowError('Invalid input! Your tweet can\'t be split into smaller tweets.');
  });

  it('should split the tweet into two', () => {
    const text = 'I can\'t believe Tweeter now supports chunking my messages, so I don\'t have to do it myself.';
    const tweets: string[] = component.processTweetSplitting(text);
    expect(tweets.length).toEqual(2);
    expect(tweets[0]).toEqual('1/2 I can\'t believe Tweeter now supports chunking');
    expect(tweets[1]).toEqual('2/2 my messages, so I don\'t have to do it myself.');
  });

});
