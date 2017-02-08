'use strict'

let fs = require('fs')
let gulp = require('gulp')

/**
 *  Load all gulp tasks.
 */
fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)
})
