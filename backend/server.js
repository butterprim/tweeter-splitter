const express = require('express');
const Twit = require('twit');
const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let client = null;
const CONSUMER_KEY = '2StixSTR4vpKxW3WpuMb3sFjG';
const CONSUMER_SECRET = 'nD0xYXplagxC4EVuKZa9x4kQEwtogOAX4S375o0OotXrMHyrLo';

function getTwitterClient(token, secret) {
  if (!client) {
    client = new Twit({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      access_token: token,
      access_token_secret: secret
    });
  }
  return client;
}

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(8080, () => {
  console.log('Server started!');
});

app.get('/api/user', (req, res) => {
  client = getTwitterClient(req.query['access_token'], req.query['access_token_secret']);
  client.get('account/verify_credentials').then((user) => {
    res.send(user);
  }).catch((error) => {
    res.send(error);
  });
});

app.get('/api/user-timeline', (req, res) => {
  client = getTwitterClient(req.query['access_token'], req.query['access_token_secret']);
  client.get('statuses/user_timeline', {
    count: 10,
    user_id: req.query['user_id'],
    screen_name: req.query['screen_name']
  }).then((tweets) => {
    res.send(tweets);
  }).catch((error) => {
    res.send(error);
  });
});

app.post('/api/tweet', (req, res) => {
  const params = req.body.params;
  client = getTwitterClient(params['access_token'], params['access_token_secret']);
  client.post('statuses/update', {
    status: params['status'],
  }).then((tweet) => {
    res.send(tweet);
  }).catch((error) => {
    res.send(error);
  });
});
