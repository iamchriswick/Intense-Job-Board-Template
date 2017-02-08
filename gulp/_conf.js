'use strict'

export const dirs = {
  src: 'src',
  html: 'html',
  dist: 'dist'
};

export const paths = {
  local: `./${dirs.dist}`,
  styles: {
    src: `${dirs.src}/scss/**/*.scss`,
    html: `${dirs.html}/**/*.html`,
    partials: `${dirs.html}/partials/**/*.html`,
    dist: `${dirs.dist}/css`
  },
  scripts: {
    src: `${dirs.src}/js/**/*.js`,
    file: `scripts`,
    dist: `${dirs.dist}/js`
  },
  images: {
    src: `${dirs.src}/img/**/*`,
    dist: `${dirs.dist}/img`
  },
  html: {
    src: `${dirs.html}/**/*.html`,
    partials: `partials/**/*.html`,
    dist: `${dirs.dist}`
  },
  favicons: {
    src: `${dirs.src}/img/fav/*.png`,
    html: `../../../partials/_favicons.html`,
    path: `img/fav/`,
    dist: `${dirs.dist}/img/fav`
  }
};

export const favicons = {
  name: "HTML Starter Kit",
  desc: "HTML Starter Kit with Gulp",
  dev_name: "Blockshot",
  dev_url: "http://blockshot.org/",
  domain: `http://YOURDOMAIN.com/`,
  bg: "#dddddd",
  display: "standalone",
  orientation: "portrait",
  start_url: "/?homescreen=1",
  vers: 1.0
};
