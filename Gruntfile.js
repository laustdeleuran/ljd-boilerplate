'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function (connect, dir) {
	
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'build'
	};

	// Fix require js config - https://vickev.com/#!/article/grunt-the-perfect-tool-for-require-js
	var _ = grunt.util._, // we load lodash (underscore variable)
	config = require('./app/scripts/config.js'); // we load the r.js config

	grunt.initConfig({
		yeoman: yeomanConfig,
		modernizr: {
			// [REQUIRED] Path to the build you're using for development.
			'devFile' : '<%= yeoman.app %>/components/modernizr/modernizr.js',

			// [REQUIRED] Path to save out the built file.
			'outputFile' : '<%= yeoman.app %>/scripts/libs/modernizr-built.js',

			// Based on default settings on http://modernizr.com/download/
			'extra' : {
				'shiv' : true,
				'printshiv' : false,
				'load' : true,
				'mq' : false,
				'cssclasses' : true
			},

			// Based on default settings on http://modernizr.com/download/
			'extensibility' : {
				'addtest' : false,
				'prefixed' : false,
				'teststyles' : false,
				'testprops' : false,
				'testallprops' : false,
				'hasevents' : false,
				'prefixes' : false,
				'domprefixes' : false
			},

			// By default, source is uglified before saving
			'uglify' : true,

			// Define any tests you want to implicitly include.
			'tests' : [],

			// By default, this task will crawl your project for references to Modernizr tests.
			// Set to false to disable.
			'parseFiles' : true,

			// When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
			// You can override this by defining a 'files' array below.
			'files' : ['<%= yeoman.app %>/scripts/{,*/}*.js','<%= yeoman.app %>/styles/{,*/}*.css'],
			'excludeFiles': ['<%= yeoman.app %>/scripts/libs/modernizr-built.js','<%= yeoman.app %>/components/modernizr/modernizr.js'],

			// When parseFiles = true, matchCommunityTests = true will attempt to
			// match user-contributed tests.
			'matchCommunityTests' : false,

			// Have custom Modernizr tests? Add paths to their location here.
			'customTests' : [],
		},
		watch: {
			compass: {
				files: [
					'<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
					'<%= yeoman.app %>/styles/modules/{,*/}*.{scss,sass}'
				],
				tasks: ['compass']
			},
			livereload: {
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
				],
				tasks: ['livereload']
			}
		},
		connect: {
			options: {
				port: 1337,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, 'app')
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, 'test')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, 'dist')
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
			}
		},
		clean: {
			dist: ['.tmp', '<%= yeoman.app %>/styles/*.css', '<%= yeoman.app %>/images/sprites-*.png', '<%= yeoman.dist %>/*'],
			server: ['<%= yeoman.app %>/styles/*.css']
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/libs/*',
				'!<%= yeoman.app %>/scripts/plugins/*',
				'!<%= yeoman.app %>/scripts/framework/*',
				'test/spec/{,*/}*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.html']
				}
			}
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '<%= yeoman.app %>/styles',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/styles/modules',
				relativeAssets: true,
				outputStyle: 'expanded'
			},
			dist: {
				options: {
					debugInfo: false,
					noLineComments: true,
					environment: 'production'
				}
			},
			server: {
				options: {
					debugInfo: true,
					environment: 'development'
				}
			}
		},
		requirejs: {
			compile: {
				options: _.merge(config, {
					name: 'main',
					findNestedDependencies: true,
					baseUrl: '<%= yeoman.app %>/scripts',
					out: '<%= yeoman.app %>/scripts/main-built.js',
					preserveLicenseComments: false,
					useStrict: true,
					optimize: 'uglify2',
					generateSourceMaps: true
				})
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.app %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.app %>/{,*/}*.html'],
			css: ['<%= yeoman.app %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.app %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.app %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.app %>/styles/style.min.css': [
						'.tmp/styles/style.css',
						'<%= yeoman.app %>/styles/style.css'
					],
					'<%= yeoman.app %>/styles/print.min.css': [
						'.tmp/styles/print.css',
						'<%= yeoman.app %>/styles/print.css'
					]
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.app %>',
					src: [
						'*.{ico,txt}',
						'.htaccess'
					]
				}]
			}
		},
		bower: {
			all: {
				rjsConfig: '<%= yeoman.app %>/scripts/main.js'
			}
		}
	});

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('server', function (target) {

		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'compass:server',
			'livereload-start',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'compass',
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'compass:dist',
		'modernizr',
		'useminPrepare',
		'requirejs',
		'imagemin',
		'cssmin',
		'copy',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};
