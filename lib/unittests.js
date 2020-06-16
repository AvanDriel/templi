const inquirer = require('./inquirer');
const copytemplate = require('./copytemplate');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
const updateModules = require('./updateModules');
const chalk = require('chalk');

module.exports.createUnitTests = async function() {
  let testName = '';
  let scriptcommand = 'jest';

  // Test template folder
  const shouldMakeTemplate = await inquirer.templateValidation();
  
  if(shouldMakeTemplate['template-install']) {
    const templateCreation = await inquirer.createTemplateFolder();

    const spinner = ora({
      text: `Creating unit-test template folder`,
      spinner: cliSpinners.dots
    }).start()

    const createTemplateFolder = copytemplate.createTemplateFolder('unit-test', templateCreation['folder-location'], templateCreation['folder-name'])

    if(createTemplateFolder) {
      spinner.succeed();

    } else {
      spinner.fail();
    }

  }

  // Custom config and adding script to package
  const createConfigScript =  await inquirer.createConfigScript();

  if(createConfigScript['standalone-config']) {
    // TODO: create config
  }
  if(createConfigScript['package-permission']) {
    // Script name
    testName =  await inquirer.testName('unit');

    // Add script  to package.json
    const editPackageSpinner = ora({
      text: `Adding ${testName['test-name']} script to package.json`,
      spinner: cliSpinners.dots
    }).start()

    const editPackageResponse = await copytemplate.editPackageJson(testName['test-name'], 'jest')

    if(editPackageResponse) {
      editPackageSpinner.succeed();
    } else {
      editPackageSpinner.fail();
    }
  }

  const installPackages = await updateModules.updateModules('jest');

  if(testName['test-name']) {
    return `You can now use 'npm run ${testName['test-name']}' to run your unit tests!`
  } else {
    return `To run your unit tests, you need to add a script to your package.json which executes '${scriptcommand}'`
  }
}