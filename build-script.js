const rimraf = require('rimraf');
const fse = require('fs-extra');
const uglify = require("uglify-es");

console.time('Finish');

console.info('Cleaning build folder');
rimraf.sync('./build/');

console.info('Copying static files');
fse.copySync('manifest.json', 'build/manifest.json');
fse.copySync('imgs/', 'build/imgs');

const jsFiles = [
	'background.js',
	'content-script.js',
	'inject.js'
];

console.info('Uglifying JS');
jsFiles.forEach(file => {
	const code = fse.readFileSync(file, 'utf-8');
	const result = uglify.minify(code);
	fse.writeFileSync(`./build/${file}`, result.code);
});

console.timeEnd('Finish');