const fs=require('fs-extra');
const path=require('path');

var targetPaths=new Array();

targetPaths.push(path.join('node_modules','hexo-theme-fluid', '_config.yml'));

function ensureDirExists(dirPath) {
	if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function copyFiles() {
	targetPaths.forEach(function(targetPath) {
		var sourcePath=path.join('myScripts', 'attachments', targetPath);
		ensureDirExists(path.dirname(targetPath));
		fs.copyFileSync(sourcePath, targetPath);
	});
}

copyFiles();
