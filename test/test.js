var expect = require('chai').expect,
    exec = require('child_process').exec;

describe('Cloudify bin', function() {

    it('should output help info when passed -h', function(done) {
        exec('./bin/cloudify -h --test', function(error, stdout, stderr) {
            expect(error).to.be.null;
            expect(stdout).to.match(/^Usage\: cloudify \[options\] \<file\_to\_share\>/);
            expect(stderr).to.be.empty;
            done();
        });
    });

    it('should output help info when passed --help', function(done) {
        exec('./bin/cloudify --help --test', function(error, stdout, stderr) {
            expect(error).to.be.null;
            expect(stdout).to.match(/^Usage\: cloudify \[options\] \<file\_to\_share\>/);
            expect(stderr).to.be.empty;
            done();
        });
    });

    it('should output version number when passed -v', function(done) {
        exec('./bin/cloudify -v --test', function(error, stdout, stderr) {
            expect(error).to.be.null;
            expect(stdout).to.match(/^cloudify version/);
            expect(stderr).to.be.empty;
            done();
        });
    });

    it('should output version number when passed --version', function(done) {
        exec('./bin/cloudify --version --test', function(error, stdout, stderr) {
            expect(error).to.be.null;
            expect(stdout).to.match(/^cloudify version/);
            expect(stderr).to.be.empty;
            done();
        });
    });

    it('should output help and exit with error when no files are passed', function(done) {
        exec('./bin/cloudify --test', function(error, stdout, stderr) {
            expect(error).to.be.ok;
            expect(stdout).to.match(/^Usage\: cloudify \[options\] \<file\_to\_share\>/);
            expect(stderr).to.be.empty;
            done();
        });
    });
});
