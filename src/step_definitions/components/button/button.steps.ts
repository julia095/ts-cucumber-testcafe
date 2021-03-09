import {
  binding, when, then,
} from 'cucumber-tsflow/dist';
import { testControllerHolder } from '../../../support/test-controller-holder';
import HelperService from '../../../support/helper/helper.service';

@binding()
export default class ButtonSteps {
  @when(/^I click the element with id (.*)$/)
  public async ClickElementWithId(id: string) {
    const t: TestController = await testControllerHolder.get();
    await HelperService.ClickElement(t, await HelperService.GetElementById(t, id));
  }

  @then(/^I observe (?:tab|button) with id (.*)$/)
  public async IsTabOrButtonVisible(id: string) {
    const t: TestController = await testControllerHolder.get();
    await t.expect(await HelperService.DoesElementExist(t, id)).ok();
  }
}
