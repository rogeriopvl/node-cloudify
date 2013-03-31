/**
 * Config file setup and reader
 */
var fs = require('fs');
var config = {
    oauth: {
        consumer_key: "5636ef88-f85b-46dd-9a6e-bddb054fd000",
        consumer_secret: "130307801609148994923494669143250681582",
        token: null,
        token_secret: null
    }
};

var configPath = process.env.HOME + '/.cloudifyrc';
var fileExists = fs.existsSync(configPath, 'utf-8');

if (fileExists) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    console.log(config);
} else {
    console.log('writing');
    fs.writeFileSync(configPath, JSON.stringify(config));
}

module.exports = config;
