import {
  binding, given, then,
} from 'cucumber-tsflow/dist';
import { testControllerHolder } from '../../../support/test-controller-holder';
import HelperService from '../../../support/helper/helper.service';

@binding()
export default class UrlSteps {
  @given(/^I navigate to (.*)$/)
  public async NavigateToPage(pageName: string) {
    const t: TestController = await testControllerHolder.get();
    await t.navigateTo(pageName);
  }

  @then(/^I should see current page URL matches (.*)$/)
  public async UrlMatches(partialUrl: string) {
    const t: TestController = await testControllerHolder.get();
    const initialWindow = await t.getCurrentWindow();
    await t.switchToWindow(initialWindow);
    await t.expect(await HelperService.GetDocumentUri(t)).contains(partialUrl, { timeout: 45000 });
  }
}
