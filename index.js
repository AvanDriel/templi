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
  let updateResponse;

  if(templateOptions['template-choice'] === 'unit-test') {
    let creationResponse = await copytemplate.initUnittest(templateOptions);
    updateResponse = await updateModules('jest')
  } else {
    copytemplate.initTest();
  }

  console.log(
    chalk.yellow(updateResponse)
  )

  console.log(
    chalk.green('Happy Testing!')
  )
};

run();

const updateModules = async (packageName) => {
  const spinner = ora({
    text: `Installing ${packageName}`,
    spinner: cliSpinners.dots
  }).start()

  // TODO: Change to install specific packages
  update = await exec(`npm install --save-dev ${packageName}`);

  if(update.stderr) {
    spinner.fail();
    return update.stderr
  } else if (update.stdout) {
    spinner.succeed();
    return update.stdout
  }
}