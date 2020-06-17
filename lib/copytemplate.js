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
}