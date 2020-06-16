#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const copytemplate = require('./lib/copytemplate');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
const unittests = require('./lib/unittests');
const endToEndTests = require('./lib/endToEndTests');

clear();

console.log(
    chalk.yellow(
      figlet.textSync('Templi', { horizontalLayout: 'full'})
    )
)

const run = async () => {
  const testChoices = await inquirer.testOptions();

  let updateResponse;

  for(let i = 0; i < testChoices['test-choice'].length; i++) {
    let choice = testChoices['test-choice'][i]
    if(choice === 'unit-test') {
      const initUnittests = await unittests.createUnitTests();
      
      console.log(
        chalk.yellow(initUnittests)
      )
    }
    if(choice === 'integration-test') {
      //ask integration test questions
    }
    if(choice === 'end-to-end-test') {
      //ask e2e test questions
      const initE2ETests = await endToEndTests.createEndToEndTests();
      
      console.log(
        chalk.yellow(initE2ETests)
      )
    }
  }

  console.log(
    chalk.green('Happy Testing!')
  )
};

run();