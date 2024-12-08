const fs=require('fs-extra');
const path=require('path');

const sourcePath=path.join('node_modules', 'hexo-theme-fluid', 'source');
const configPath=path.join('node_modules', 'hexo-theme-fluid', '_config.yml');
const tempSourcePath=path.join('Temp', 'sourceTemp');
const tempConfigPath=path.join('Temp', '_configTemp.yml');

function ensureDirExists(dirPath) {
	if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function copyFiles() {
	ensureDirExists(path.dirname(tempSourcePath));
	ensureDirExists(path.dirname(tempConfigPath));
	fs.copySync(sourcePath, tempSourcePath);
	fs.copySync(configPath, tempConfigPath);
}

copyFiles();
