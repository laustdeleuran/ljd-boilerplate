module.exports = function(grunt) {
	'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Config
	var config = {
		dev: 'app',
		dist: 'build',
		host: 'localhost'
	};

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,
		modernizr: {
			dist: {
				// [REQUIRED] Path to the build you're using for development.
				devFile : '<%= config.dev %>/components/modernizr/modernizr.js',

				// [REQUIRED] Path to save out the built file.
				'outputFile' : '<%= config.dev %>/scripts/<%= pkg.name %>.<%= pkg.version %>.modernizr.min.js',

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
				'files' : {
					'src': [
						'<%= config.dev %>/scripts/{,*/}*.js',
						'<%= config.dev %>/styles/{,*/}*.css'
					]
				},
				'excludeFiles': [
					'<%= config.dev %>/scripts/<%= pkg.name %>.<%= pkg.version %>.modernizr.js',
					'<%= config.dev %>/components/modernizr/modernizr.js'
				],

				// When parseFiles = true, matchCommunityTests = true will attempt to
				// match user-contributed tests.
				'matchCommunityTests' : false,

				// Have custom Modernizr tests? Add paths to their location here.
				'customTests' : []
			}
		},
		connect: {
			server: {
				options: {
					port: 1337,
					base: './<%= config.dev %>/',
					open: true,
					hostname: '<%= config.host %>'
					//keepalive: true
				}
			},
			dist: {
				options: {
					port: 1338,
					base: './<%= config.dist %>/',
					open: true,
					hostname: '<%= config.host %>',
					keepalive: true
				}
			},
		},
		open: {
			all: {
				path: 'http://<%= config.host %>:<%= connect.server.options.port %>'
			}
		},
		clean: {
			dist: ['<%= config.dist %>/**', '<%= config.dev %>/styles/{,*/}*.css', '<%= config.dev %>/scripts/<%= pkg.name %>.*.min.js']
		},
		requirejs: {
			compile: {
				options: {
					name: '../components/almond/almond',
					wrap: true,
					preserveLicenseComments: false,
					insertRequire: ['main'],
					baseUrl: '<%= config.dev %>/scripts/',
					mainConfigFile: '<%= config.dev %>/scripts/config.js',
					out: '<%= config.dev %>/scripts/<%= pkg.name %>.<%= pkg.version %>.scripts.min.js'
				}
			}
		},
		compass: {
			options: {
				basePath: '',
				imagesDir: 'images',
				cssDir: '<%= config.dev %>/styles',
				sassDir: '<%= config.dev %>/styles',
				noLineComments: false,
				outputStyle: 'expanded',
				environment: 'development'
			},
			dev: {
			},
			dist: {
				options: {
					cssDir: '<%= config.dist %>/styles',
					noLineComments: true,
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.dev %>/',
					src: ['images/**', 'fonts/**', 'templates/**', 'scripts/<%= pkg.name %>.<%= pkg.version %>.*.min.js'],
					dest: '<%= config.dist %>/',
					filter: 'isFile'
				}, ]
			},
			'show-built':  {
				files: [{
					expand: true,
					cwd: '<%= config.dev %>/',
					src: ['index.html'],
					dest: '<%= config.dist %>/',
					filter: 'isFile'
				}, ]
			}
		},
		imagemin: {
			dynamic: {
				expand: true, // Enable dynamic expansion
				cwd: '<%= config.dist %>/images/', // Src matches are relative to this path
				src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
				dest: '<%= config.dist %>/images/' // Destination path prefix
			}
		},
		replace: {
			scripts: {
				src: ['<%= config.dist %>/templates/{,*/}*.html', '<%= config.dist %>/templates/{,*/}*.hbs'],
				overwrite: true,
				replacements: [{
					from: '<script src="/components/modernizr/modernizr.js"></script>',
					to: '<script src="/scripts/<%= pkg.name %>.<%= pkg.version %>.modernizr.min.js"></script>'
				}, {
					from: '<script data-main="/scripts/config" src="/components/requirejs/require.js"></script>',
					to: ''
				}, {
					from: '<!-- <script src="scripts.min.js"></script> -->',
					to: '<script src="/scripts/<%= pkg.name %>.<%= pkg.version %>.scripts.min.js"></script>'
				}]
			}
		},
		watch: {
			sass: {
				files: ['<%= config.dev %>/styles/{,*/}{,*/}*.scss'],
				tasks: ['compass:dev'],
			},
			livereload: {
				files: [
					'<%= config.dev %>/styles/{,*/}*.css',
					'<%= config.dev %>/scripts/{,*/}*.js',
					'<%= config.dev %>/templates/{,*/}*.html',
					'<%= config.dev %>/templates/{,*/}*.hbs',
					'<%= config.dev %>/*.html',
					'<%= config.dev %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
				],
				options: {
					livereload: true,
				}
			},
		},
		bump: { // https://github.com/vojtajina/grunt-bump
			options: {
				pushTo: 'origin'
			}
		}
	});

	// Build for distribution to 3rd party vendor
	grunt.registerTask('build', [
		'clean:dist',
		'requirejs',
		'modernizr',
		'compass:dist',
		'copy:dist',
		'imagemin',
		'replace:scripts'
	]);

	// Show build results
	grunt.registerTask('show-built', [
		'copy:show-built',
		'connect:dist'
	]);

	// Run simple server for development
	grunt.registerTask('server', [
		'compass:dev',
		'connect:server',
		'watch'
	]);
};