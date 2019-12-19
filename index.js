const core = require("@actions/core");
const exec = require("child_process").exec;

const download = `wget https://gs0.salesforce.com/dwnld/SfdcAnt/salesforce_ant_47.0.zip`;
const unzip = `unzip -j "salesforce_ant_47.0.zip" ant-salesforce.jar -d libs`;

const execAsync = command => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) return reject(err);
      core.debug(stdout);
      return resolve(stdout);
    });
  });
};

const command = core.getInput("command");

execAsync(download)
  .then(execAsync("mkdir libs"))
  .then(execAsync(unzip))
  .then(execAsync(command))
  .catch(err => core.setFailed(err.message));
