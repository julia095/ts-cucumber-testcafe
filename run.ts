import * as moment from 'moment';

const { execSync } = require('child_process');

// get values from the command line
const argValues = process.argv.slice(2);

// Set the default values for each parameter
let parallel = '--parallel=3';
let tags = '--tags=\'@regression and not @disabled\'';

function formatTime(timeMoment) {
  return timeMoment.format('DD-MM-YYYY HH:mm:ss');
}

function getTimeDifference(startMoment, endMoment) {
  const diffTime = endMoment.diff(startMoment);
  const duration = moment.duration(diffTime);
  const hrs = duration.hours();
  const mins = duration.minutes();
  const secs = duration.seconds();
  return `${hrs} hour(s) ${mins} minute(s) ${secs} second(s)`;
}

function getArgumetsValue() {
  argValues.forEach((a) => {
    if (a.indexOf('--tags=') !== -1) {
      tags = a.substring(a.indexOf('--tags='));
      // This forces all tests to ignore @disabled tests
      if (!tags.includes('@disabled')) {
        tags = `${tags} and not @disabled`;
      }
    } else if (a.indexOf('--parallel=') !== -1) {
      if (Number(a.substring(a.indexOf('=') + 1)) > 5) {
        // eslint-disable-next-line no-console
        console.log('Only 5 parallel instances are supported at the moment.');
        process.exit();
      }
      parallel = a.substring(a.indexOf('--parallel='));
    }
  });
}

getArgumetsValue();
const startTime = moment();
execSync(`npm run testscript -- ${parallel} "${tags}"`, { stdio: [0, 1, 2] });
const endTime = moment();
const diff = getTimeDifference(startTime, endTime);
execSync(`npm run report -- "${tags}" --starttime="${formatTime(startTime)}" \
 --endtime="${formatTime(endTime)}" --diff="${diff}"`, { stdio: [0, 1, 2] });
