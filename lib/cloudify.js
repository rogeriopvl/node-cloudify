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
        meocloud = require('meocloud')(config);

    var CLOUDIFY_FOLDER = '/cloudify';

    var run = function() {
        var options = { list: false };
        meocloud.metadata(CLOUDIFY_FOLDER, options, function(err, data) {
            if (data && data.is_dir === true && !data.is_deleted) {
                upload(true);
            } else {
                console.log('Cloudify folder does not exist. Creating...');
                meocloud.createFolder({ path: CLOUDIFY_FOLDER }, function(err, data) {
                    if (err) { throw err; }
                    var success = data && data.is_dir === true;
                    return upload(success);
                });
            }
            return;
        });
    };

    var upload = function(data) {
        if (!data) {
            console.log('Error: /cloudify folder could not be created remotely');
            process.exit(-1);
        }

        var destinationPath = CLOUDIFY_FOLDER + '/';
        destinationPath += path.basename(cliOptions.name || filename);

        var fileStats = fs.statSync(filename);
        var fileSize = getPrettyFileSize(fileStats.size);

        console.log('Uploading (' + fileSize +') ...');

        meocloud.upload(filename, destinationPath, {}, function(err, data, status) {
            if (err) { throw err; }
            if (status !== 200) {
                console.log('Warning: File with same name already exists. Aborting.');
                console.log('You can use --name to upload the file with a different name.');
                process.exit(1);
            }
            if (data) { getPublicLink(); }
            return;
        });
    };

    var getPublicLink = function() {
        var cpath = CLOUDIFY_FOLDER + '/' + path.basename(cliOptions.name || filename);
        meocloud.shares(cpath, function(err, data, status) {
            if (err) { throw err; }
            if (status !== 200) {
                console.log('Error: service returned status ' + status);
                process.exit(0);
            }
            if (data && data.url) {
                var outURL = data.url;
                if (cliOptions.download) {
                    outURL = getDownloadLink(data.url, data.link_shareid);
                }
                console.log(outURL);
                saveToPasteboard(outURL);
            } else {
                console.log('Error: unable to get public URL');
            }
            return;
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
        var cldURL = 'https://cld.pt/dl/download/';
        var urlParts = publicURL.split('/');
        var filePart = urlParts.pop() || urlParts.pop();
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
