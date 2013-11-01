var assert = require('assert');

describe('Cloudify bin', function() {
    describe('test --help', function() {
        process.argv = [
            'node',
            'cloudify.js',
            '--help'
        ];
        var cloudify = require('./../bin/cloudify');
    });

    describe('test --version', function() {
        process.argv = [
            'node',
            'cloudify.js',
            '--version'
        ];
        var cloudify = require('./../bin/cloudify');
    });
});
