# TweeterSplitter
Splits your tweets, and posts them on your behalf (given your permission).

## Frontend
Built with Angular 5. Twitter authentication is handled in Firebase, so don't worry about it (I guess?). Run the app as follows:
```
cd frontend
ng serve
```


**Want to run tests on the splitting logic?**
```
cd frontend
ng test
```

## Backend
Built with nodejs using expressjs. It handles Twitter requests like posting tweets, getting your recent tweets, and retrieving some details from your profile. Start the backend with:
```
cd backend
npm start
```
