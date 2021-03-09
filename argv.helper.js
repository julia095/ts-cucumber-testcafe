/* eslint-disable no-console */
const { argv } = require('yargs');

// util functions to get environment arguments
class ArgvHelperService {
  static getTag() {
    if (argv.tags === undefined) {
      return '';
    }
    return argv.tags;
  }

  static getStartTime() {
    if (argv.starttime === undefined) {
      return 'No start time defined';
    }
    return argv.starttime;
  }

  static getEndTime() {
    if (argv.endtime === undefined) {
      return 'No end time defined';
    }
    return argv.endtime;
  }

  static getDiff() {
    if (argv.diff === undefined) {
      return 'No time diff defined';
    }
    return argv.diff;
  }

  static getParallelFlag() {
    if (argv.parallel === undefined) {
      return 1;
    }
    return argv.parallel;
  }
}

module.exports = { ArgvHelperService };
