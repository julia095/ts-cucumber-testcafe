import {
  given, binding, when, then,
} from 'cucumber-tsflow/dist';
import { Role } from 'testcafe';
import { testControllerHolder } from '../test-controller-holder';
import HelperService from './helper.service';

@binding()
export default class HelperSteps {
 
  @then(/^I expect the element with id (.*) exists$/)
  public async DoesElementExist(id: string) {
    const t: TestController = await testControllerHolder.get();
    const element = await HelperService.GetElementById(t, id);
    await t.expect(element.exists && element.visible).ok();
  }
}
