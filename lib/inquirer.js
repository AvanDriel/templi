const inquirer = require('inquirer');
const fs = require('fs');

const CHOICES = fs.readdirSync(`${__dirname}/../templates`);

module.exports = {
  askTestChoice: () => {
    const questions = [
      {
        name: 'template-choice',
        type: 'list',
        message: 'What tests would you like to implement?',
        choices: CHOICES,
      },
      {
        name: 'template-location',
        type: 'input',
        message: 'Where would you like to install the template? (Empty for root)',
        // validate: function (input) {
        //   var directory = `${process.cwd()}\\${input}`
        //   if(fs.existsSync(directory)) return true;
        //   else return 'Please enter a valid folder path'
        // }
      },
      {
        name: 'folder-name',
        type: 'input',
        message: 'What should the name of the template folder be?',
      },
      {
        name: 'package-permission',
        type: 'confirm',
        message: 'Do you give permission to edit the package.json for needed scripts?'
      },
      {
        name: 'standalone-config',
        type: 'confirm',
        message: 'Do you want a standalone config.js file?'
      }
    ];
    return inquirer.prompt(questions);
  },
};