module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'lib/*.js', 'bin/*']
        },
        shell: {
            man: {
                command: 'marked-man README.md > doc/cloudify.1'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('man', ['shell']);
};
