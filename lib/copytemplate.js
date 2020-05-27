const fs = require('fs');
const files = require('../lib/files')

module.exports = {
  initUnittest: (params) => {
    const folderName = params['folder-name'];
    const createPath = params['template-location'];
    const createConfig = params['standalone-config'];
    const templatePath = `${__dirname}/../templates/unit-test`;
    const editPackage = params['package-permission'];

    if(editPackage) {
      var packageParse = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString());
      
      if(!packageParse.scripts) {
        packageParse.scripts = {}
      }
  
      if(!packageParse.scripts.test) {
        if(createConfig) {
          packageParse.scripts.test = 'jest --config ./jest.config.js'
        } else {
          packageParse.scripts.test = 'jest'
        }
      }

      if(!packageParse.devDependencies) {
        packageParse.devDependencies = {}
      }

      if(!packageParse.devDependencies.jest) {
        packageParse.devDependencies.jest = '^26.0.1'
      }

      fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageParse, null, 2));
    }

    if(createConfig) {
      // TODO: Create config file and put in root 
    }

    fs.mkdirSync(`${process.cwd()}/${createPath}/${folderName}`);

    let createResponse = files.createDirectoryContents(templatePath, `${process.cwd()}/${createPath}/${folderName}`);

    return createResponse;
  }
}