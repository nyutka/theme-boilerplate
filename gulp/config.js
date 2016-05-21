var dest = './build';
var src = './app';
var node_modules = './node_modules';

module.exports = {
    app: './app',
    build: './build',
    browserSync: {
        server: {
            // We're serving the src folder as well for sass sourcemap linking
            baseDir: [dest, src]
        },
        notify: false, //hide the annoying notification
        files: [
            dest + '/**',
            // Exclude Map files
            '!' + dest + '/**.map'
        ]
    },
    sass: {
        src: [
            src + '/css/styles.scss',
            src + '/includes/**/*.scss'
        ],
        dest: dest + '/css',
        mainBundle: 'main.scss',
        includePaths: [
            src + '/css',
            './node_modules'
        ],
        vendorBundle: 'vendor.css',
        vendorsSrc: [
            src + '/css/vendor.scss',
            './node_modules/mapbox.js/theme/style.css',
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/css-modal/modal.scss',
            './node_modules/slick-carousel/slick/slick.css',
            './node_modules/slick-carousel/slick/slick-theme.css'
        ]
    },
    fonts: {
        src: [src + '/fonts/**', node_modules + '/font-awesome/fonts/*'],
        dest: dest + '/fonts'
    },
    images: {
        src: [
            src + '/images/**', 
            src + '/**/*.*{png,jpg,gif}'
        ],
        dest: dest + '/images'
    },
    html: {
        src: src + '/**/*.html',
        dest: dest + '/'
    },
    js: {
        all: src + '/**/*.js',
        src: src + '/js/script.js',
        dest: dest + '/js',
    },
    json: {
        fixtures: src + '/fixtures/*.json'
    }
};
