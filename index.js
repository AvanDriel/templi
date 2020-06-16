#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
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
  let initUnittests = ''
  let initE2ETests = ''

  for(let i = 0; i < testChoices['test-choice'].length; i++) {
    let choice = testChoices['test-choice'][i]
    if(choice === 'unit-test') {
      initUnittests = await unittests.createUnitTests();
    }
    if(choice === 'integration-test') {
      //ask integration test questions
    }
    if(choice === 'end-to-end-test') {
      initE2ETests = await endToEndTests.createEndToEndTests();
    }
  }

  if(initUnittests !== '') {
    console.log(
      chalk.green(initUnittests)
    )
  }
  if(initE2ETests !== '') {
    console.log(
      chalk.green(initE2ETests)
    )
  }

  console.log(
    chalk.green('Happy Testing!')
  )
};

run();