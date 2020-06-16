const inquirer = require('inquirer');
const fs = require('fs');

const CHOICES = ['unit-test', 'end-to-end-test'];

module.exports = {
  testOptions: () => {
    const questions = [
      {
        name: 'test-choice',
        type: 'checkbox',
        message: 'What tests would you like to implement?',
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(questions);
  },
  templateValidation: () => {
    const questions = [
      {
        name: 'template-install',
        type: 'confirm',
        message: 'Do you want a folder with example tests?'
      },
    ];
    return inquirer.prompt(questions);
  },
  createTemplateFolder: () => {
    const questions = [
      {
        name: 'folder-location',
        type: 'input',
        message: 'Where would you like to install the expample folder? (Empty for root)',
        validate: function (input) {
          // var directory = `${process.cwd()}\\${input}`
          // if(fs.existsSync(directory)) return true;
          // else return 'Please enter a valid folder path'
          if(!input) {
            return true;
          } else return 'Sorry, but due to compatibility issues only installation in root is supported'
        }
      },
      {
        name: 'folder-name',
        type: 'input',
        message: 'What should the name of the template folder be?',
        validate: function (input) {
          if(input) {
            return true;
          } else return 'Folder name cannot be empty'
        }
      },
    ];
    return inquirer.prompt(questions);
  },
  createConfigScript: () => {
    const questions = [
      {
        name: 'standalone-config',
        type: 'confirm',
        message: 'Do you want a standalone config.js file?'
      },
      {
        name: 'package-permission',
        type: 'confirm',
        message: 'do you give permission to add the test script to your package.json?'
      },
    ];
    return inquirer.prompt(questions);
  },
  testName: (testname) => {
    const questions = [
      {
        name: 'test-name',
        type: 'input',
        message: `What should the command be for executing the ${testname} tests?`,
        validate: function (input) {
          if(input) {
            return true;
          } else return 'Command cannot be empty'
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};