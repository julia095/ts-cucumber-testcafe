import { Selector, ClientFunction } from 'testcafe';

const defaultTimeout = 5000;

export default class HelperService {
  public static async GetElementById(tc: TestController, id: string, timeoutms: number = defaultTimeout) {
    const element = Selector(`[id="${id}"]`).with({ boundTestRun: tc });
    await tc.expect(element.exists).ok({ timeout: timeoutms });
    return element;
  }

  public static async DoesElementExist(tc: TestController, id: string) {
    const element = Selector(`[id="${id}"]`).with({ boundTestRun: tc });
    return element.exists;
  }

  public static async GetElementByClass(tc: TestController, id: string, timeoutms: number = defaultTimeout) {
    const element = Selector(`[class="${id}"]`).with({ boundTestRun: tc });
    await tc.expect(element.exists).ok({ timeout: timeoutms });
    return element;
  }

  public static async GetDocumentUri(tc: TestController) {
    const documentURI = ClientFunction(() => document.location.href.toString(), { boundTestRun: tc });
    return documentURI();
  }

  public static async ClickElement(tc: TestController, element: Selector,
    additionalCheck: boolean = true, timeoutms: number = defaultTimeout) {
    if (additionalCheck) {
      await tc.expect(element.exists && element.visible).ok({ timeout: timeoutms });
    }
    await tc.click(element);
  }

  public static async TypeText(tc: TestController, inputElem: Selector, text: string) {
    // await tc.click(inputElem);
    await tc.typeText(inputElem, text, { replace: true, speed: 0.4 });
    await tc.pressKey('tab');
  }
}
