var config = require('./config.js');
var OAuth = require('oauth').OAuth;

var REQUEST_TOKEN_URL = 'https://cloudpt.pt/oauth/request_token';
var ACCESS_TOKEN_URL = 'https://cloudpt.pt/oauth/access_token';
var OAUTH_VERSION = '1.0';
var HASH_VERSION = 'HMAC-SHA1';

function getAccessToken(oa, oauth_token, oauth_token_secret, pin) {
  oa.getOAuthAccessToken(oauth_token, oauth_token_secret, pin,
    function(err, oauth_access_token, oauth_access_token_secret, results2) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      // save values in .cloudifyrc
      console.log('Your OAuth Access Token: ' + (oauth_access_token));
      console.log('Your OAuth Token Secret: ' + (oauth_access_token_secret));
    });
}

function getRequestToken(oa) {
    oa.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {
        if(err) {
            throw new Error(([err.statusCode, err.data].join(': ')));
        } else {
            console.log('In your browser, log in to your CloudPT account. Then visit:')
            console.log(('https://cloudpt.pt/oauth/authorize?oauth_token=' + oauth_token))
            console.log('After logged in, you will be prompted with a pin number')
            console.log('Enter the pin number here:');
            var stdin = process.openStdin();
            stdin.on('data', function(chunk) {
                pin = chunk.toString().trim();
                getAccessToken(oa, oauth_token, oauth_token_secret, pin);
            });
        }
    });
}

var oa = new OAuth(
    REQUEST_TOKEN_URL,
    ACCESS_TOKEN_URL,
    config.oauth.consumer_key,
    config.oauth.consumer_secret,
    OAUTH_VERSION ,
    "oob",
    HASH_VERSION
);
getRequestToken(oa);
