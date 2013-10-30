module.exports = function() {
    var config = require('./config.js')();
    var OAuth = require('oauth').OAuth;

    var REQUEST_TOKEN_URL = 'https://cloudpt.pt/oauth/request_token';
    var ACCESS_TOKEN_URL = 'https://cloudpt.pt/oauth/access_token';
    var OAUTH_VERSION = '1.0';
    var HASH_VERSION = 'HMAC-SHA1';

    function getAccessToken(oa, token, tokenSecret, pin) {
        oa.getOAuthAccessToken(token, tokenSecret, pin,
            function(err, accessToken, accessTokenSecret, res) {
               if (err) {
                   console.log(err);
                   process.exit(1);
               }
               // save values in ~/.cloudifyrc
               config.data.oauth.token = accessToken;
               config.data.oauth.token_secret = accessTokenSecret;
               config.save(config.data);

               console.log('Setup completed. You may now use cloudify.');

               process.exit(0);
       });
    }

    function getRequestToken(oa) {
        oa.getOAuthRequestToken(function(err, token, tokenSecret, results) {
            if(err) {
                console.log(err);
            } else {
                console.log('\n********** CLOUDIFY OAUTH SETUP **********\n');
                console.log('In your browser, log in to your CloudPT account. Then visit:');
                console.log(('https://cloudpt.pt/oauth/authorize?oauth_token=' + token));
                console.log('After logged in, you will be prompted with a pin number\n');
                console.log('Enter the pin number here:');
                var stdin = process.openStdin();
                stdin.on('data', function(chunk) {
                    pin = chunk.toString().trim();
                    getAccessToken(oa, token, tokenSecret, pin);
                });
            }
        });
    }

    var oa = new OAuth(
        REQUEST_TOKEN_URL,
        ACCESS_TOKEN_URL,
        config.data.oauth.consumer_key,
        config.data.oauth.consumer_secret,
        OAUTH_VERSION ,
        "oob",
        HASH_VERSION
    );
    getRequestToken(oa);
};
