import * as base64Img from 'base64-img';
import { setDefaultTimeout, setWorldConstructor } from 'cucumber';
import * as process from 'process';
import { testControllerHolder } from './test-controller-holder';

const DEFAULT_TIMEOUT = 300 * 1000;

// define this as any here to work around: 'this' implicitly has type 'any' because it does not have a type annotation.
function CustomWorld(this: any, { attach, parameters }) {
  this.worldName = 'Cucumber World';
  /**
 * this function is crucial for the Given-Part of each feature as it provides the TestController
 */
  this.waitForTestController = testControllerHolder.get;
  /**
* parameters: object of parameters passed in via the CLI (in our case we pass them from test gulp task)
*/
  this.parameters = parameters;
  /**
* function that attaches the attachment (e.g. screenshot) to the report
*/
  this.attach = attach;

  /**
   * Report generation only permitted if one of the following options is set
   */
  this.canGenerateReport = (): boolean => (
    process.argv.includes('--format')
    || process.argv.includes('-f')
    || process.argv.includes('--format-options')
  );

  this.addScreenshotToReport = async function AddScreenshotToReport() {
    if (this.canGenerateReport()) {
      const tc = await this.waitForTestController();
      tc.takeScreenshot()
        .then((path) => this.attachScreenshotToReport(path))
        .catch();
    } else {
      return new Promise((resolve) => resolve(null));
    }
  };

  /**
   * Adds the screenshot under the given path to the json report
   * @param pathToScreenshot The path under which the screenshot has been saved
   */
  this.attachScreenshotToReport = (pathToScreenshot: string) => {
    const imgInBase64 = base64Img.base64Sync(pathToScreenshot);
    const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
    return attach(imageConvertForCuc, 'image/png');
  };

  /**
   * Adds the screenshot to the json report
   * @param pngImage the image in png format
   */
  this.attachScreenshotInPngFormatToReport = (pngImage: any) => attach(pngImage, 'image/png');
}

setDefaultTimeout(DEFAULT_TIMEOUT);

setWorldConstructor(CustomWorld);
module.exports.World = CustomWorld;
