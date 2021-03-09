# Cucumber-Testcafe-TestSuite
TestCafe test suite that uses Cucumber/TestCafe to test application through the web browser UI, with test fixtures written using TypeScript.

These tests are written as Gherkin features, in the src/features directory.

## Pre-requisites

- Clone the project
- node.js is required, please install node_modules from the root directory

```sh
npm install
```

## How to run

To run all scenarios, run the following at the command line. 

```sh
 npm run test
```

### --Tags - how to specify tags

To run all features with a specific tag, run the following at the command line:

```sh
npm run test -- --tags=@tag
```

To specify multiple tags, use OR and surrond tags expression with "":

```sh
npm run test -- --tags="@tag1 or @tag2"
```

To exclude tags, use AND NOT:

```sh
npm test -- --tags="@tag1 and not @tag2"
```

### @disabled tag - how to exclude flaky tests from the suite

If some tests become flaky, you can disable them by adding @disabled tag.

```sh
 @disabled
        Scenario: Your flaky scenario
```

It will exclude the flaky test from the test suite automatically.

### --parallel - how to run tests in parallel

To run tests in parallel you need to specify --parallel value. 
If not specified will default to 3.

### Default options

You can skip --parallel and --tags. It will default to run all scenarios with @regression tag in 3 parallel instances.

## Reports

Reports are done via the Cucumber reporter. The results are placed in the /src/reports directory.
