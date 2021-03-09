/* eslint-disable class-methods-use-this */
// Eslint disabled as this class is required but can't become static without breaking functionality
import { ITestControllerListener } from './test-controller-listener';

// Configures the TestController
export default class TestControllerConfig implements ITestControllerListener {
  public async onTestControllerSet() {
    // Do nothing for now
  }
}
