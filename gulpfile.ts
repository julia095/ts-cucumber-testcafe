/* eslint-disable no-console */

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const exec = require('child_process');
const { argv } = require('yargs');
const { v4: uuidv4 } = require('uuid');

const { ArgvHelperService } = require('./argv.helper');

// generating a unique test file name to avoid conflicts while running tests in parallel
export const TEST_FILE = `${uuidv4()}.js`;
export const JSON_FILE = `${uuidv4()}.json`;

gulp.task('createReportsFolder', async () => {
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }
});

gulp.task('test', (callback) => {
  const fileName = `json:reports/${JSON_FILE}`;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const launcher = 'cucumber-js.cmd';
  const options = [
    'src/features',
    '--require-module', 'ts-node/register',
    '--require', 'src/**/*.ts',
    '--retry', '2',
    '-f', fileName,
    '--format', 'summary',
    '--tags', ArgvHelperService.getTag(),
    '--parallel', ArgvHelperService.getParallelFlag(),
  ];
  const cucumber = exec.spawn(launcher, options).on('exit', () => {
    console.log('Cucumber test', 'finished');
    callback();
  });
  cucumber.stdout.on('data', (d) => {
    console.log(d.toString());
  });
  cucumber.stderr.on('data', (d) => {
    console.log(d.toString());
  });
});

// a task to run tests with @wip tag while developing tests
gulp.task('wip', (callback) => {
  const fileName = `json:reports/${JSON_FILE}`;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const launcher = 'cucumber-js.cmd';
  const options = [
    'src/features',
    '--require-module', 'ts-node/register',
    '--require', 'src/**/*.ts',
    '-f', fileName,
    '--format', 'summary',
    '--tags', '@wip',
    '--parallel', '1',
  ];
  const cucumber = exec.spawn(launcher, options).on('exit', () => {
    console.log('Cucumber test', 'finished');
    callback();
  });
  cucumber.stdout.on('data', (d) => {
    console.log(d.toString());
  });
  cucumber.stderr.on('data', (d) => {
    console.log(d.toString());
  });
});

gulp.task('report', async (callback) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // we pass environment and appconfig values to world so that it will be visible for each parallel instance we run
  const launcher = 'node';
  const options = [
    'multiple-reporter.config.js',
    `--tags=${ArgvHelperService.getTag()}`,
    `--starttime=${ArgvHelperService.getStartTime()}`,
    `--endtime=${ArgvHelperService.getEndTime()}`,
    `--diff=${ArgvHelperService.getDiff()}`];
  exec.spawn(launcher, options,
    { stdio: 'inherit' }).on('exit', () => {
    console.log('Cucumber test', 'finished');
    callback();
  });
});

// a task to generate a report with @wip tag on stage environment while developing tests
gulp.task('wipreport', async (callback) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // we pass environment and appconfig values to world so that it will be visible for each parallel instance we run
  const launcher = 'node';
  const options = [
    'multiple-reporter.config.js',
    '--tags=@wip'];
  exec.spawn(launcher, options,
    { stdio: 'inherit' }).on('exit', () => {
    console.log('Cucumber test', 'finished');
    callback();
  });
});
