const fs = require('fs');
const files = require('../lib/files')
const chalk = require('chalk');

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
  
      if(!packageParse.scripts.jest) {
        // if(createConfig) {
        //   packageParse.scripts.jest = 'jest --config ./jest.config.js'
        // } else {
          packageParse.scripts.jest = 'jest'
        // }
      }

      fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageParse, null, 2));
    }

    if(createConfig) {
      // TODO: Create config file and put in root 
      console.log(
        chalk.yellow("Sorry, due to compatibility issues a custom config is not supported right now")
      )
    }

    fs.mkdirSync(`${process.cwd()}/${createPath}/${folderName}`);

    let createResponse = files.createDirectoryContents(templatePath, `${process.cwd()}/${createPath}/${folderName}`);

    return createResponse;
  },
  initEndToEndTest: (params) => {
    const folderName = params['folder-name'];
    const createPath = params['template-location'];
    const createConfig = params['standalone-config'];
    const templatePath = `${__dirname}/../templates/end-to-end-test`;
    const editPackage = params['package-permission'];

    if(editPackage) {
      var packageParse = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString());
      
      if(!packageParse.scripts) {
        packageParse.scripts = {}
      }
  
      if(!packageParse.scripts.cypress) {
        packageParse.scripts.cypress = 'cypress open'
      }

      fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageParse, null, 2));
    }

    fs.mkdirSync(`${process.cwd()}/${createPath}/${folderName}`);

    let createResponse = files.createDirectoryContents(templatePath, `${process.cwd()}/${createPath}/${folderName}`);

    return createResponse;
  },
  initIntegrationTest: (params) => {
    const folderName = params['folder-name'];
    const createPath = params['template-location'];
    const createConfig = params['standalone-config'];
    const templatePath = `${__dirname}/../templates/end-to-end-test`;
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