/**
 * Config file setup and reader
 */

module.exports = function() {
    var fs = require('fs');

    var dataTemplate = {
        oauth: {
            consumer_key: "5636ef88-f85b-46dd-9a6e-bddb054fd000",
            consumer_secret: "130307801609148994923494669143250681582",
            token: null,
            token_secret: null
        }
    };

    var data = null;
    var configPath = process.env.HOME + '/.cloudifyrc';
    var fileExists = fs.existsSync(configPath, 'utf-8');

    if (fileExists) {
        data = readConfig();
    } else {
        data = dataTemplate;
        saveConfig(data);
    }

    function readConfig() {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    function saveConfig(obj) {
        fs.writeFileSync(configPath, JSON.stringify(obj));
    }

    return {
        data: data,
        save: saveConfig
    }
};
