# TweeterSplitter
Splits your tweets, and posts them on your behalf (given your permission). The app is built with Angular 5 and ExpressJS. Twitter authentication is handled by Firebase.

## Installation
```
$ git clone https://github.com/butterprim/tweeter-splitter.git
$ cd tweeter-splitter/frontend
$ npm install
$ cd ../backend
$ npm install
```

## Running the app
Build with Angular 5 and ExpressJS.
```
cd tweeter-splitter/frontend
ng serve
cd ../backend
npm start
```
Access the app in http://127.0.0.1:4200. Calls to the backend are made to http://127.0.0.1:8080.

## Run unit test for splitter
```
cd tweeter-splitter/frontend
ng test
```
