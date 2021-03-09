const report = require('multiple-cucumber-html-reporter');

const { v4: uuidv4 } = require('uuid');
const { argv } = require('yargs');
const { ArgvHelperService } = require('./argv.helper');

function getCurrentTime() {
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const date = [year, month, day].join('-');
  const time = [hours, minutes].join('-');
  return [date, time].join('_');
}

function getUniqueFolderName() {
  return `${getCurrentTime()}_${uuidv4()}`;
}

let customMetaData = [];

if (argv.tags === '@wip') {
  customMetaData = [
    { label: 'Tags', value: `${ArgvHelperService.getTag()}` },
  ];
} else {
  customMetaData = [
    { label: 'Tags', value: `${ArgvHelperService.getTag()}` },
    { label: 'Start Time', value: `${ArgvHelperService.getStartTime()}` },
    { label: 'End Time', value: `${ArgvHelperService.getEndTime()}` },
    { label: 'Total Run Time', value: `${ArgvHelperService.getDiff()}` },
  ];
}

const json = {
  jsonDir: './reports/',
  reportPath: `./reports/${getUniqueFolderName()}/html/`,
  openReportInBrowser: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: ' 84.0.4147.89',
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
  customData: {
    title: 'Run info',
    data: customMetaData,
  },
};

report.generate(json);
