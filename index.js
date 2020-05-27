#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const copytemplate = require('./lib/copytemplate');
const exec = require('await-exec');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

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

  const spinner = ora({
    text: 'Installing required modules',
    spinner: cliSpinners.dots
  }).start()

  update = await exec('npm i');

  if(update.stderr) {
    // TODO: Handle error output
  } else if (update.stdout) {
    spinner.succeed();
    
    console.log(
      chalk.yellow(update.stdout)
    )
    console.log(
      chalk.green('Happy Testing!')
    )
  }
};

run();