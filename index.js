#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const copytemplate = require('./lib/copytemplate');

clear();

console.log(
    chalk.yellow(
      figlet.textSync('TestTemplate', { horizontalLayout: 'full'})
    )
)

const run = async () => {
  const templateOptions = await inquirer.askTestChoice();

  if(templateOptions['template-choice'] === 'unit-test') {
    let creationResponse = await copytemplate.initUnittest(templateOptions);
  } else {
    copytemplate.initTest();
  }
};

run();