const fs = require('fs');
const files = require('../lib/files')
const chalk = require('chalk');

module.exports = {
  createTemplateFolder: (templatename, createLocation, folderName) => {
    const templatePath = `${__dirname}/../templates/${templatename}`;

    fs.mkdirSync(`${process.cwd()}/${createLocation}/${folderName}`);

    files.createDirectoryContents(templatePath, `${process.cwd()}/${createLocation}/${folderName}`);

    return true;
  },
  createCustomConfig: () => {
    // create custom config
  },
  editPackageJson: (scriptname, scriptcommand) => {
    var packageParse = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString());

    if(!packageParse.scripts) {
      packageParse.scripts = {}
    }

    if(!packageParse.scripts[scriptname]) {
      packageParse.scripts[scriptname] = scriptcommand
    }

    fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageParse, null, 2));

    return true;
  }
}