/**
 * Cloudify main file
 *
 * @author Rogério Vicente <http://rogeriopvl.com>
 * @license MIT (see LICENSE file for details)
 */
module.exports = function(config, filename, cliOptions) {

    // requires
    var os = require('os'),
        path = require('path'),
        fs = require('fs'),
        exec = require('child_process').exec,
        cloudpt = require('NodeCloudPT')(config);
    
    var run = function() {
        var options = { path: '/cloudify', list: false };
        cloudpt.metadata(options, function(data) {
            // we dont support directories, for now
            if (data && data.is_dir === false) {
                cloudpt.createFolder({ path: '/cloudify' }, upload);
            } else {
                upload();
            }
        });
    };

    var upload = function() {
        var options = {
            path: '/cloudify/' + path.basename(filename),
            file: filename
        };

        var fileStats = fs.statSync(filename);
        var fileSize = getPrettyFileSize(fileStats.size);
        console.log('Uploading (' + fileSize +') ...');

        cloudpt.upload(options, function(data) {
            if (data) { getPublicLink(); }
        });
    };

    var getPublicLink = function() {
        var options = { path: '/cloudify/' + path.basename(filename) };
        cloudpt.shares(options, function(data) {
            var data = JSON.parse(data);
            if (data && data.url) {
                var outURL = data.url;
                if (cliOptions.download) {
                    outURL = getDownloadLink(data.url, data.link_shareid);
                }
                console.log(outURL);
                saveToPasteboard(outURL);
            }
        });
    };

    var saveToPasteboard = function(str) {
        if (os.platform() === 'darwin') {
            exec('echo "' + str + '"|pbcopy', function(err) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log('Saved to clipboard!');
                process.exit(0); // hack to avoid http timeout
            });
        } else {
            process.exit(0);
        }
    };

    var getDownloadLink = function(publicURL, shareID) {
        var cldURL = 'https://cld.pt/dl/download/',
            filePart = publicURL.split('/').pop();
        return cldURL + shareID + '/' + filePart;
    };

    var getPrettyFileSize = function(size) {
        var sizeUnit = 'kB';
        var fileSize = (size / 1024);
        if (fileSize > 1024) {
            fileSize = fileSize / 1024;
            sizeUnit = 'MB';
        }
        // round to two decimals
        return (Math.round(fileSize * 100) / 100) + ' ' + sizeUnit;
    };

    return run;
};
