/**
 * Cloudify main file
 *
 * @author Rogério Vicente <http://rogeriopvl.com>
 * @license MIT (see LICENSE file for details)
 */
module.exports = function(config, filename) {

    // requires
    var os = require('os'),
        exec = require('child_process').exec,
        cloudpt = require('NodeCloudPT')(config);
    
    var run = function() {
        var options = {path: '/cloudify', list: false};
        cloudpt.metadata(options, function(data) {
            // we dont support directories, for now
            if (data && data.is_dir === false) {
                cloudpt.createFolder({path: '/cloudify'}, upload);
            } else {
                upload();
            }
        });
    };

    var upload = function() {
        var options = {path: '/cloudify/' + filename, file: filename};
        cloudpt.upload(options, function(data) {
            if (data) { getPublicLink(); }
        });
    };

    var getPublicLink = function() {
        var options = {path: '/cloudify/' + filename};
        cloudpt.shares(options, function(data) {
            var data = JSON.parse(data);
            if (data && data.url) {
                console.log(data.url);
                saveToPasteboard(data.url);
            }
        });
    };

    var saveToPasteboard = function(str) {
        if (os.platform() === 'darwin') {
            exec('echo "' + str + '"|pbcopy', function(err) {
                console.log('Saved to clipboard!');
                if (err) { console.log(err); }
                process.exit(0); // hack to avoid http timeout
            });
        } else {
            process.exit(0);
        }
    };

    return run;
};
