var shell = require('shelljs')

shell.echo('building start...');
shell.exec('gulp --gulpfile build/gulpfile.js');
shell.echo('building finished!');
