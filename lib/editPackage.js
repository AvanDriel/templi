const fs = require('fs');
const inquirer = require('./inquirer');

module.exports.editPackage = async function(scriptname, scriptcommand, type) {
  var packageParse = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString());

  if(!packageParse.scripts) {
    packageParse.scripts = {}
  }

  if(!packageParse.scripts[scriptname]) {
    packageParse.scripts[scriptname] = scriptcommand
  } else {
    // already exists, combine or new name?
    const existingResponse = await inquirer.existingScriptname(scriptname);

    if(existingResponse['combine-tests'] === 'choose a new command name') {
      const newTestName = await inquirer.testName(type);
      const editPackage = await module.exports.editPackage(newTestName['test-name'], scriptcommand, type);

      if(editPackage) return true

    } else if (existingResponse['combine-tests'] === 'overwrite the existing script'){
      packageParse.scripts[scriptname] = scriptcommand
    } else { // Combine
      packageParse.scripts[scriptname] = `${packageParse.scripts[scriptname]} && ${scriptcommand}`
    }
  }

  fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageParse, null, 2));

  return true;
}