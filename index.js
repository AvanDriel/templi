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
      figlet.textSync('Templi', { horizontalLayout: 'full'})
    )
)

const run = async () => {
  const templateOptions = await inquirer.askTestChoice();
  let updateResponse;

  if(templateOptions['template-choice'] === 'unit-test') {
    let creationResponse = await copytemplate.initUnittest(templateOptions);
    updateResponse = await updateModules('jest')
  } else if (templateOptions['template-choice'] === 'integration-test') {
    // TODO: Add enzyme and react version adapter
    updateResponse = await updateModules('jest')
  } else if (templateOptions['template-choice'] === 'end-to-end-test') {
    updateResponse = await updateModules('cypress')
  }

  console.log(
    chalk.yellow(updateResponse)
  )

  if(templateOptions['template-choice'] === 'unit-test') {
    console.log(
      chalk.green("You can now use 'npm run jest' to run your unit tests!")
    )
  } else if (templateOptions['template-choice'] === 'integration-test') {
    console.log(
      chalk.green("You can now use 'npm run cypress' to run your unit tests!")
    )
  } else if (templateOptions['template-choice'] === 'end-to-end-test') {
    console.log(
      chalk.green("You can now use 'npm run integration' to run your unit tests!")
    )
  }

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

  update = await exec(`npm install --save-dev ${packageName}`);

  if(update.stderr) {
    spinner.fail();
    return update.stderr
  } else if (update.stdout) {
    spinner.succeed();
    return update.stdout
  }
}