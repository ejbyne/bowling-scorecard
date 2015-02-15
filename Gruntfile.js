module.exports = function(grunt){

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    mocha_casperjs: {
      options: {
      },
      files: {
        src: ['test/*.js']
      }
    },

    jshint: {
      src: ['public/js/player.js', 'public/js/frame.js', 'public/js/scoreCard.js', 'public/js/message.js', 'public/js/app.js'],
      options: {
        globals: {
        jQuery: true
        }
      }
    },

    jasmine: {
      pivotal: {
        src: ['public/js/player.js', 'public/js/frame.js', 'public/js/scoreCard.js', 'public/js/message.js', 'public/js/app.js'],
        tasks: 'jasmine:pivotal:build',
        options: {
          specs: 'spec/*Spec.js',
          vendor: ['public/js/jquery-2.1.1.min.js', 'public/js/jquery-ui.min.js']
        }
      }
    },
    
    watch: {
      scripts: {
        files: ['public/js/*.js', 'spec/*Spec.js', 'test/*.js'],
        tasks: ['express:test', 'jshint', 'jasmine', 'mocha_casperjs']
      }
    },

    express: {
      test: {
        options: {
          script: 'server.js',
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-casperjs');
 grunt.loadNpmTasks('grunt-contrib-jasmine');
 grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:test', 'jshint', 'jasmine', 'mocha_casperjs']);

};
