const ora = require('ora');
const cliSpinners = require('cli-spinners');
const exec = require('await-exec');

module.exports.updateModules = async function(packageName) {
  const spinner = ora({
    text: `Installing ${packageName}`,
    spinner: cliSpinners.dots
  }).start()

  update = await exec(`npm install ${packageName} --save-dev`);

  if(update.stderr) {
    spinner.fail();
    
    return update.stderr
  } else {
    spinner.succeed();
    return update.stdout
  }
}