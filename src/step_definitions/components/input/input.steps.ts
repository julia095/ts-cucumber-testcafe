import {
  binding, when, then,
} from 'cucumber-tsflow';
import { testControllerHolder } from '../../../support/test-controller-holder';
import HelperService from '../../../support/helper/helper.service';

@binding()
export default class InputSteps {
  @when(/^I enter (.*) into the field with id (.*)$/)
  public async EnterTextWithId(text: string, id: string) {
    const t: TestController = await testControllerHolder.get();
    await HelperService.TypeText(t, await HelperService.GetElementById(t, id), text);
  }

  @then(/^I expect the element with id (.*) to contain the text (.*)$/)
  public async DoesElementContainText(id: string, text: string) {
    const t: TestController = await testControllerHolder.get();
    const element = await HelperService.GetElementById(t, id);
    await t.expect((element).innerText).contains(text);
  }

  @then(/^I should see a modal$/)
  public async DoesModalAppear() {
    const t: TestController = await testControllerHolder.get();
    await t.setNativeDialogHandler(() => true);
  }
}
