/* eslint-disable no-console */
// tslint:disable:rule: no-console
/**
 * This is almost an auto generated file where we perform a bunch of magic to get testcafe to work with cucumber
 * principals. As a result we disable a few rules as adhering to them creates more confusion.
 */
import {
  BeforeAll, After, AfterAll, Status, Before,
} from 'cucumber';
import * as p from 'process';
import * as fs from 'fs';
import { testControllerHolder } from './test-controller-holder';
import TestControllerConfig from './test-controller-config';
import { TEST_FILE } from '../../gulpfile';

const createTestCafe = require('testcafe');

let testcafe: { createRunner: () => any; close: () => void; };
const DELAY = 5 * 1000;
/**
 * Sets the browser. Default value is 'Chrome:headless'. You can find all supported browsers here:
https://devexpress.github.io/testcafe/documentation/guides/concepts/browsers.html
*/

const DEFAULT_BROWSER = 'chrome';

/**
 * The purpose of this temporary test-file is to capture TestCafes' TestController.
 * We basically create and run a dummy test and capture the TestController for future tests.
 */

function createTestFile() {
  fs.writeFileSync(
    TEST_FILE,
    `import { testControllerHolder } from "./src/support/test-controller-holder";
     fixture("fixture")
     test
     ("test", testControllerHolder.capture)`,
  );
}

/* Creates a server instance of TestCafe and starts a test-runner. */
function createServerAndRunTests() {
  let runner;
  createTestCafe('localhost')
    .then((tc: any) => {
      testcafe = tc;
    })
    .then(() => {
      runner = testcafe.createRunner();
      runner = runner
        .src(`./${TEST_FILE}`)
        .screenshots('reports/screenshots/', false) // we create screenshots manually!
        .browsers(`${DEFAULT_BROWSER}`.trim());

      return Promise.all([runner.run({
        assertionTimeout: 5000,
        pageLoadTimeout: 8000,
        skipJsErrors: true,
        skipUncaughtErrors: true,
        speed: 0.7,
        stopOnFirstFail: false,
        quarantineMode: true,
      })]);
    })
    .then(() => {
      testcafe.close();
      // cancelling all pending tasks at once with the runner.stop method.
      runner.stop();
    });
}

/**
 * Runs before all tests start executing.
 * Creates the dummy test file and captures the TestController.
 */
BeforeAll((callback: any) => {
  testControllerHolder.register(new TestControllerConfig());
  createTestFile();
  createServerAndRunTests();
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  setTimeout(callback, DELAY);
});

Before(async function BeforeFunction() {
  const world = this;
  const t: TestController = await world.waitForTestController();
});

// Take screenshot if the test case (scenario) has failed
After(async function AfterFunction(testCase) {
  const world = this;
  const t: TestController = await world.waitForTestController();
  if (testCase.result.status === Status.FAILED) {
    await t
      .takeScreenshot()
      .then((path) => {
        console.log('screenshot taken, see: ', path);
        return world.attachScreenshotToReport(path);
      }).catch(async () => {
        console.log(
          'encountered an error during taking screenshot',
        );
      });
  }
});

/**
 * Runs after all tests finished executing, that is:
 * 0. BeforeAll
 *     - execute dummy test ('fixture') and capture TestController
 * 1. Execute feature 1 -> feature n (After)
 * 2. After All
 *     - cleanup (destroy TestController, delete dummy test file)
 *     - generate html report
 *     - exit process
 */
AfterAll((callback: any) => {
  testControllerHolder.destroy();
  fs.unlinkSync(TEST_FILE);
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  setTimeout(callback, DELAY);
  setTimeout(() => p.exit(), DELAY * 4);
});
