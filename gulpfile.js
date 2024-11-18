import { src, dest, watch, series, parallel } from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSyncModule from 'browser-sync';
import pug from 'gulp-pug';
import autoprefixer from 'gulp-autoprefixer';
// import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
// import imagemin from 'gulp-image';
// import cache from 'gulp-cache';
// import htmlmin from 'gulp-htmlmin';
import fs from 'fs';
import merge from 'merge-stream';

const browserSync = browserSyncModule.create();
const sass = gulpSass(dartSass);

// function clearCache() {
//     cache.clearAll()
// }
const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js'
    },
    templates: {
        src: 'src/templates/pages/*.pug',
        watch: 'src/templates/**/*.pug',
        dest: 'dist'
    },
    vendors: {
        src: 'src/vendors/*.*',
        dest: 'dist/vendors'
    },
    locales: 'src/locales/**/*.json',
    images: {
        src: 'src/images/**/*.{jpg,jpeg,png,svg,gif}',
        dest: 'dist/imgs'
    }
};

// function loadLocales() {
//     const locales = {};
//     const files = fs.readdirSync('src/locales');
//     files.forEach(file => {
//         const locale = file.split('.')[0];
//         locales[locale] = JSON.parse(fs.readFileSync(`src/locales/${file}`));
//     });
//     return locales;
// }
function loadLocales(language) {
    const data = fs.readFileSync(`src/locales/${language}.json`, 'utf-8')
    return JSON.parse(data)
}

export function styles() {
    return src(paths.styles.src)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(cleanCSS())
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

export function scripts() {
    return src(paths.scripts.src)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// export function templates() {
//     const locales = loadLocales();
//     return src(paths.templates.src)
//         .pipe(pug({ locals: { locales: locales }, pretty: true }))
//         // .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(dest(paths.templates.dest))
//         .pipe(browserSync.stream());
// }
export function templates() {
    const langs = ['en', 'ar']
    // return Promise.all(
    //     langs.map((lang) => {
    //         const locales = loadLocales(lang)
    //         return new Promise((resolve, reject) => { src(paths.templates.src).pipe(pug({ locals: { locales, lang }, pretty: true })).pipe(dest(`${paths.templates.dest}/${lang}`)).pipe(browserSync.stream()).on('end', resolve).on('error', reject) })
    //     })
    // )

    const tasks = langs.map(lang => {
        const locales = loadLocales(lang)
        return src(paths.templates.src).pipe(pug({ locals: { locales, lang }, pretty: true })).pipe(dest(`${paths.templates.dest}/${lang}`)).pipe(browserSync.stream())
    })
    return merge(...tasks)
}

export function images() {
    return src(paths.images.src, { encoding: false })
        // .pipe(cache(imagemin({
        //     pngquant: true,
        //     optipng: false,
        //     zopflipng: true,
        //     jpegRecompress: false,
        //     mozjpeg: true,
        //     gifsicle: true,
        //     svgo: true,
        //     // concurrent: 10,
        //     quiet: true // defaults to false
        // })))
        .pipe(dest(paths.images.dest));
}

export function vendors() {
    return src(paths.vendors.src).pipe(dest(paths.vendors.dest))
}

export function watchFiles() {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        routes: {
            '/en': 'en',  // Route /en to the English version
            '/ar': 'ar'   // Route /ar to the Arabic version
        },
        startPath: '/ar',  // Set the default starting path,
        // open: false
    });
    watch(paths.styles.src, styles);
    watch(paths.scripts.src, scripts);
    watch(paths.templates.watch, templates);
    watch(paths.locales, templates);
    watch(paths.images.src, images);
    watch(paths.vendors.src, vendors);
    watch('dist/**/*').on('change', browserSync.reload);
}

// const build = series(parallel(styles, scripts, templates, images, vendors), watchFiles);
const build = series(parallel(styles, scripts, templates, images, vendors));

export {
    build,
    build as default
};
