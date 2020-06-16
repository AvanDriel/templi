const inquirer = require('./inquirer');
const copytemplate = require('./copytemplate');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
const updateModules = require('./updateModules');
const chalk = require('chalk');

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
    const editPackageSpinner = ora({
      text: `Adding ${testName['test-name']} script to package.json`,
      spinner: cliSpinners.dots
    }).start()

    const editPackageResponse = await copytemplate.editPackageJson(testName['test-name'], 'cypress open')

    if(editPackageResponse) {
      editPackageSpinner.succeed();
    } else {
      editPackageSpinner.fail();
    }
  }

  const installPackages = await updateModules.updateModules('cypress');

  if(testName['test-name']) {
    console.log(
      chalk.green(`You can now use 'npm run ${testName['test-name']}' to run your end to end tests!`)
    )
  } else {
    console.log(
      chalk.green(`To run your end to end tests, you need to add a script to your package.json which executes '${scriptcommand}'`)
    )
  }

  return installPackages
}