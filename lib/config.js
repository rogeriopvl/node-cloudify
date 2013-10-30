/**
 * Config file setup and reader
 *
 * @author Rogério Vicente <http://rogeriopvl.com>
 * @license MIT (check LICENSE file for details)
 */

module.exports = function() {
    var fs = require('fs');

    // template for config file, containing app key and secret
    var dataTemplate = {
        oauth: {
            consumer_key: "5636ef88-f85b-46dd-9a6e-bddb054fd000",
            consumer_secret: "130307801609148994923494669143250681582",
            token: null,
            token_secret: null
        }
    };

    var data = null; // will hold config items
    var configPath = process.env.HOME + '/.cloudifyrc';
    var fileExists = fs.existsSync(configPath, 'utf-8');

    if (fileExists) {
        data = readConfig();
    } else {
        data = dataTemplate;
        saveConfig(data);
    }

    // reads config json file into object
    function readConfig() {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    // turns config object into json and stores it in a file
    function saveConfig(obj) {
        fs.writeFileSync(configPath, JSON.stringify(obj));
    }

    return {
        data: data,
        save: saveConfig
    };
};
