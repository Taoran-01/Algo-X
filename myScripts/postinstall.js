const fs=require('fs-extra');
const path=require('path');

const sourcePath=path.join('node_modules', 'hexo-theme-fluid', 'source');
const configPath=path.join('node_modules', 'hexo-theme-fluid', '_config.yml');
const newSourcePath=path.join('node_modules', 'hexo-theme-fluid', 'sourceNew');
const newConfigPath=path.join('node_modules', 'hexo-theme-fluid',
	'_configNew.yml');
const tempSourcePath=path.join('Temp', 'sourceTemp');
const tempConfigPath=path.join('Temp', '_configTemp.yml');

function ensureDirExists(dirPath) {
	if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function copyFiles() {
	ensureDirExists(path.dirname(newSourcePath));
	ensureDirExists(path.dirname(newConfigPath));
	fs.copySync(sourcePath, newSourcePath);
	fs.copySync(configPath, newConfigPath);
	if (fs.existsSync(sourcePath)) fs.removeSync(sourcePath);
	if (fs.existsSync(configPath)) fs.removeSync(configPath);
	ensureDirExists(path.dirname(sourcePath));
	ensureDirExists(path.dirname(configPath));
	fs.copySync(tempSourcePath, sourcePath);
	fs.copySync(tempConfigPath, configPath);
	if (fs.existsSync(path.join('Temp'))) fs.removeSync(path.join('Temp'));
}

copyFiles();
