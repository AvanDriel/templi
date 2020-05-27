#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const copytemplate = require('./lib/copytemplate');
const execSync = require('child_process').execSync;

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

  console.log(
    chalk.green('Updating node modules...')
  )

  update = execSync('npm i');
  console.log(
    chalk.yellow(update.toString())
  )
  console.log(
    chalk.green('Happy Testing!')
  )
};

run();