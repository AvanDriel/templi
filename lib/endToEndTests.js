const inquirer = require('./inquirer');
const copytemplate = require('./copytemplate');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
const updateModules = require('./updateModules');
const chalk = require('chalk');
const editPackage = require('./editPackage');

module.exports.createEndToEndTests = async function() {
  let testName = '';
  let scriptcommand = 'cypress';

  // Custom config and adding script to package
  const createConfigScript =  await inquirer.createConfigScript();

  if(createConfigScript['standalone-config']) {
    // TODO: create config
  }
  if(createConfigScript['package-permission']) {
    // Script name
    testName =  await inquirer.testName('e2e');

    // Add script  to package.json
    const editPackageResponse = await editPackage.editPackage(testName['test-name'], 'cypress open', 'e2e')
  }

  const installPackages = await updateModules.updateModules('cypress');

  if(testName['test-name']) {
    return `You can now use 'npm run ${testName['test-name']}' to run your end to end tests!`
  } else {
    return `To run your end to end tests, you need to add a script to your package.json which executes '${scriptcommand}'`
  }
}