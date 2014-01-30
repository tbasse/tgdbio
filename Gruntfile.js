/*global module:false*/

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      timestamp: Math.floor(new Date().getTime() / 1000),
      banner: '/*! */',
    },

    exec: {
      clear: {
        command: 'clear',
        stdout: true
      }
    },

    jshint: {
      options: {
        curly: true,
        strict: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      app: {
        options: {
          browser: true,
          devel: true,
          jquery: true
        },
        files: {
          src: ['src/js/src/main.js']
        }
      },
    },

    less: {
      styles: {
        files: {
          'src/css/<%= grunt.config.data.pkg.name %>.css': 'src/less/app.less'
        }
      }
    },

    concat: {
      scripts: {
        src: [
          'src/js/src/jquery-1.10.2.min.js',
          'src/js/src/main.js'
        ],
        dest: 'src/js/<%= grunt.config.data.pkg.name %>.js'
      }
    },

    uglify: {
      scripts: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'dist/js/<%= grunt.config.data.pkg.name %>.js': '<%= concat.scripts.dest %>'
        }
      }
    },

    cssmin: {
      compress: {
        files: {
          'dist/css/<%= grunt.config.data.pkg.name %>.css': 'src/css/<%= grunt.config.data.pkg.name %>.css'
        }
      }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 2
        },
        files: [
          {
            expand: true,
            cwd: './src/img/',
            src: ['**/*.png'],
            dest: './dist/img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: './src/img/',
            src: ['**/*.jpg'],
            dest: './dist/img/',
            ext: '.jpg'
          }
        ]
      }
    },

    jade: {
      dev: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'src/index.html': ['src/index.jade']
        }
      },
      prod: {
        options: {
          pretty: false,
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': ['src/index.jade']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeCommentsFromCDATA: true,
          removeRedundantAttributes: true,
          collapseBooleanAttributes: true
        },
        files: [
          {
            expand: true,
            cwd: './src/',
            src: ['**/*.html'],
            dest: './dist/',
            ext: '.html'
          }
        ]
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: 'src/fonts',
        src: '**',
        dest: 'dist/fonts',
        flatten: false,
        filter: 'isFile'
      },
    },

    clean: {
      dist: ['./dist']
    },

    watch: {
      jade: {
        files: [
          'src/**/*.jade'
        ],
        tasks: [
          'jade:dev'
        ],
        options: {
          livereload: true
        }
      },
      less: {
        files: [
          'src/less/*.less'
        ],
        tasks: [
          'less',
          'notify:dev'
        ],
        options: {
          livereload: true
        }
      },
      javascript: {
        files: [
          'src/js/src/*.js'
        ],
        tasks: [
          'jshint',
          'concat',
          'notify:dev'
        ],
        options: {
          livereload: true
        }
      }
    },

    notify: {
      dev: {
        options: {
          title : 'Development',
          message : 'Tasks all done'
        }
      },
      dist: {
        options: {
          title : 'Production',
          message : 'Distribution built'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [
    'clean:dist',
    'jshint',
    'less',
    'concat',
    'uglify',
    'cssmin',
    'jade:prod',
    'imagemin',
    'copy:fonts',
    'notify:dist'
  ]);
};
