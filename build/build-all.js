var shell = require('shelljs'),
  path = require('path'),
  del = require('del');

shell.echo('building start...');
 
del.sync([path.resolve(__dirname, '../dist/**')]);

console.log('\x1B[33m%s\x1B[39m','Deleted files and folders...');
 
shell.exec('gulp --gulpfile build/gulpfile.js');

shell.echo('building finished!');
 