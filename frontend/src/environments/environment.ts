// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  maxTweetLength: 50,
  twitter: {
    consumer_key: '2StixSTR4vpKxW3WpuMb3sFjG',
    consumer_secret: 'nD0xYXplagxC4EVuKZa9x4kQEwtogOAX4S375o0OotXrMHyrLo',
    owner_id: '933570056646037504',
    owner_name: 'botterprim',
  },
  firebase: {
    apiKey: 'AIzaSyDks_lLzejEhQp9idF05tANqbcwrrPKbPw',
    authDomain: 'tweetersplitter.firebaseapp.com',
    databaseURL: 'https://tweetersplitter.firebaseio.com',
    projectId: 'tweetersplitter',
    storageBucket: 'tweetersplitter.appspot.com',
    messagingSenderId: '674453946280',
  },
};
